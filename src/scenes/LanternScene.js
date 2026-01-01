// ============================================
// MAIN SCENE
// ============================================
class LanternScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LanternScene' });
    }

    create() {
        this.setupPostProcessing();
        this.setupLighting();
        this.createWorld();
        
        this.dayNightSystem = new DayNightSystem(this);
        this.lantern = new Lantern(this);
    }

    setupPostProcessing() {
        this.cameras.main.setPostPipeline(DitherPostFX);
    }

    setupLighting() {
        this.lights.enable();
        this.lights.setAmbientColor(CONFIG.lighting.ambientColor);
    }

    createWorld() {
        const { centerX, centerY, gridSize, gridExtent } = CONFIG.world;
        
        const gridG = this.add.graphics();
        gridG.setPipeline('Light2D');
        gridG.lineStyle(1, 0x222222, 1);
        
        for (let i = -gridExtent; i <= gridExtent; i++) {
            IsoUtils.drawLine(gridG, centerX, centerY, i * gridSize, -gridExtent * gridSize, i * gridSize, gridExtent * gridSize);
            IsoUtils.drawLine(gridG, centerX, centerY, -gridExtent * gridSize, i * gridSize, gridExtent * gridSize, i * gridSize);
        }
    }

    update() {
        this.dayNightSystem.update();
        this.lantern.update(this.dayNightSystem.getDayFactor());
    }
}
