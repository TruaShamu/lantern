// ============================================
// CONFIGURATION & CONSTANTS
// ============================================
const CONFIG = {
    world: {
        centerX: 400,
        centerY: 500,
        gridSize: 40,
        gridExtent: 12
    },
    lantern: {
        legHeight: 110,
        baseHeight: 20,
        fireboxSize: 60,
        fireboxHeight: 120,
        roofSize: 110,
        roofHeight: 30
    },
    lighting: {
        baseRadius: 280,
        baseIntensity: 2.5,
        flickerSpeed: 0.02,
        ambientColor: 0x444444,
        lanternColor: 0xff8822
    },
    materials: {
        stone: {
            top: 0xcccccc,
            right: 0x999999,
            left: 0x666666,
            outline: 0x333333
        },
        glass: {
            color: 0xffcc88,
            alpha: 0.3
        },
        window: {
            color: 0xffaa00
        }
    }
};
