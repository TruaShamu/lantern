// ============================================
// GAME INITIALIZATION
// ============================================
const config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    backgroundColor: '#0a0a0c',
    parent: 'phaser-example',
    pipeline: { DitherPostFX },
    scene: [LanternScene]
};

const game = new Phaser.Game(config);
