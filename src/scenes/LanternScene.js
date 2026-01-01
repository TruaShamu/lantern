// ============================================
// MAIN SCENE
// ============================================
class LanternScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LanternScene' });
    }

    create() {
        this.time = 0;
        this.setupPostProcessing();
        this.setupLighting();
        this.createWorld();
        this.createLantern();
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

    createLantern() {
        const { centerX, centerY } = CONFIG.world;
        const { legHeight, baseHeight, fireboxSize, fireboxHeight, roofSize, roofHeight } = CONFIG.lantern;
        const stone = CONFIG.materials.stone;
        
        // Calculate heights
        const baseZ = legHeight;
        const fireboxZ = baseZ + baseHeight;
        const roofZ = fireboxZ + fireboxHeight;

        // Main structure graphics
        const lanternG = this.add.graphics();
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
        const glassG = this.add.graphics();
        glassG.setPipeline('Light2D');
        glassG.fillStyle(CONFIG.materials.glass.color, CONFIG.materials.glass.alpha);
        IsoUtils.drawBox(glassG, centerX, centerY, -30, -30, fireboxZ, fireboxSize, fireboxSize, fireboxHeight);

        // Window glow (emissive)
        const windowG = this.add.graphics();
        windowG.fillStyle(CONFIG.materials.window.color);
        IsoUtils.drawBox(windowG, centerX, centerY, -5, 31, fireboxZ + 15, 30, 1, fireboxHeight - 30);
        IsoUtils.drawBox(windowG, centerX, centerY, 31, -5, fireboxZ + 15, 1, 30, fireboxHeight - 30);

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
        this.lanternLight = this.lights.addLight(
            centerX + lightPos.x,
            centerY + lightPos.y,
            baseRadius
        )
            .setColor(lanternColor)
            .setIntensity(baseIntensity);
    }

    update() {
        this.time += CONFIG.lighting.flickerSpeed;
        this.updateLanternFlicker();
    }

    updateLanternFlicker() {
        const { baseRadius, baseIntensity } = CONFIG.lighting;
        
        const flickerRadius = baseRadius + Math.sin(this.time * 2) * 25 + Math.random() * 8;
        const flickerIntensity = baseIntensity + Math.sin(this.time * 1.5) * 0.2 + Math.random() * 0.08;
        
        this.lanternLight.setRadius(flickerRadius);
        this.lanternLight.setIntensity(flickerIntensity);
    }
}
