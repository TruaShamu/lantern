class DayNightSystem {
    constructor(scene) {
        this.scene = scene;
        this.dayTime = 0;
        this.currentDayFactor = 0;
    }

    update() {
        this.dayTime += CONFIG.dayNight.speed;
        
        // Calculate day factor (0 to 1), where 1 is full day
        const cycle = Math.sin(this.dayTime);
        this.currentDayFactor = (cycle + 1) / 2;

        // Interpolate ambient color
        const r = Phaser.Math.Interpolation.Linear([CONFIG.dayNight.nightAmbient.r, CONFIG.dayNight.dayAmbient.r], this.currentDayFactor);
        const g = Phaser.Math.Interpolation.Linear([CONFIG.dayNight.nightAmbient.g, CONFIG.dayNight.dayAmbient.g], this.currentDayFactor);
        const b = Phaser.Math.Interpolation.Linear([CONFIG.dayNight.nightAmbient.b, CONFIG.dayNight.dayAmbient.b], this.currentDayFactor);
        
        this.scene.lights.setAmbientColor(Phaser.Display.Color.GetColor(r, g, b));

        // Interpolate background color
        const bgR = Phaser.Math.Interpolation.Linear([CONFIG.dayNight.nightBg.r, CONFIG.dayNight.dayBg.r], this.currentDayFactor);
        const bgG = Phaser.Math.Interpolation.Linear([CONFIG.dayNight.nightBg.g, CONFIG.dayNight.dayBg.g], this.currentDayFactor);
        const bgB = Phaser.Math.Interpolation.Linear([CONFIG.dayNight.nightBg.b, CONFIG.dayNight.dayBg.b], this.currentDayFactor);

        this.scene.cameras.main.setBackgroundColor(Phaser.Display.Color.GetColor(bgR, bgG, bgB));
    }

    getDayFactor() {
        return this.currentDayFactor;
    }
}
