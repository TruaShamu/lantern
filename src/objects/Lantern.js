class Lantern {
    constructor(scene) {
        this.scene = scene;
        this.time = 0;
        this.create();
    }

    create() {
        const { centerX, centerY } = CONFIG.world;
        const { legHeight, baseHeight, fireboxSize, fireboxHeight, roofSize, roofHeight } = CONFIG.lantern;
        const stone = CONFIG.materials.stone;
        
        // Calculate heights
        const baseZ = legHeight;
        const fireboxZ = baseZ + baseHeight;
        const roofZ = fireboxZ + fireboxHeight;

        // Atmospheric Glow (Visual)
        const lightPos = IsoUtils.project(0, 0, fireboxZ + 30);
        this.glow = this.scene.add.pointlight(
            centerX + lightPos.x, 
            centerY + lightPos.y, 
            CONFIG.lighting.lanternColor, 
            CONFIG.lighting.baseRadius * 1.1, 
            0.1
        );

        // Main structure graphics
        const lanternG = this.scene.add.graphics();
        lanternG.setPipeline('Light2D');

        // Legs
        IsoUtils.drawShadedBox(lanternG, centerX, centerY, -40, -40, 0, 20, 20, legHeight, stone);
        IsoUtils.drawShadedBox(lanternG, centerX, centerY, 20, -40, 0, 20, 20, legHeight, stone);
        IsoUtils.drawShadedBox(lanternG, centerX, centerY, -40, 20, 0, 20, 20, legHeight, stone);
        IsoUtils.drawShadedBox(lanternG, centerX, centerY, 20, 20, 0, 20, 20, legHeight, stone);

        // Base and firebox
        IsoUtils.drawShadedBox(lanternG, centerX, centerY, -50, -50, baseZ, 100, 100, baseHeight, stone);
        IsoUtils.drawShadedBox(lanternG, centerX, centerY, -30, -30, fireboxZ, fireboxSize, fireboxSize, fireboxHeight, stone);

        // Glass containment
        this.glassG = this.scene.add.graphics();
        this.glassG.setPipeline('Light2D');
        this.glassG.fillStyle(CONFIG.materials.glass.color, CONFIG.materials.glass.alpha);
        IsoUtils.drawBox(this.glassG, centerX, centerY, -30, -30, fireboxZ, fireboxSize, fireboxSize, fireboxHeight);

        // Window glow (emissive)
        this.windowG = this.scene.add.graphics();
        this.windowG.fillStyle(CONFIG.materials.window.color);
        IsoUtils.drawBox(this.windowG, centerX, centerY, -5, 31, fireboxZ + 15, 30, 1, fireboxHeight - 30);
        IsoUtils.drawBox(this.windowG, centerX, centerY, 31, -5, fireboxZ + 15, 1, 30, fireboxHeight - 30);

        // Roof
        IsoUtils.drawPyramid(lanternG, centerX, centerY, 0, 0, roofZ, roofSize, roofHeight, stone);

        // Top ornament
        const p = IsoUtils.project(0, 0, roofZ + roofHeight + 5);
        lanternG.fillStyle(stone.top);
        lanternG.fillCircle(centerX + p.x, centerY + p.y, 6);
        lanternG.lineStyle(1, stone.outline);
        lanternG.strokeCircle(centerX + p.x, centerY + p.y, 6);

        // Create light source
        this.createLanternLight(fireboxZ);
    }

    createLanternLight(fireboxZ) {
        const { centerX, centerY } = CONFIG.world;
        const { baseRadius, baseIntensity, lanternColor } = CONFIG.lighting;
        
        const lightPos = IsoUtils.project(0, 0, fireboxZ + 30);
        this.lanternLight = this.scene.lights.addLight(
            centerX + lightPos.x,
            centerY + lightPos.y,
            baseRadius
        )
            .setColor(lanternColor)
            .setIntensity(baseIntensity);
    }

    update(dayFactor) {
        this.time += CONFIG.lighting.flickerSpeed;
        const { baseRadius, baseIntensity } = CONFIG.lighting;
        
        // Calculate multiplier based on day/night
        // Light turns on at night (low dayFactor)
        let dayMultiplier = 1 - Phaser.Math.Clamp((dayFactor - 0.3) * 2, 0, 1);

        // Update window glow visibility
        if (this.windowG) {
            this.windowG.alpha = dayMultiplier;
        }

        if (dayMultiplier <= 0) {
            this.lanternLight.setIntensity(0);
            this.glow.intensity = 0;
            return;
        }

        const flickerRadius = baseRadius + Math.sin(this.time * 2) * 25 + Math.random() * 8;
        const flickerIntensity = (baseIntensity + Math.sin(this.time * 1.5) * 0.2 + Math.random() * 0.08) * dayMultiplier;
        
        this.lanternLight.setRadius(flickerRadius);
        this.lanternLight.setIntensity(flickerIntensity);

        // Update glow
        this.glow.intensity = (0.1 + Math.sin(this.time * 1.5) * 0.02) * dayMultiplier;
        this.glow.radius = flickerRadius * 1.1;
    }
}
