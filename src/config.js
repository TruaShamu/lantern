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
        flickerSpeed: 0.04,
        ambientColor: 0x444444,
        lanternColor: 0xff8822
    },
    dayNight: {
        speed: 0.01,
        dayAmbient: { r: 200, g: 200, b: 220 },
        nightAmbient: { r: 20, g: 20, b: 40 },
        dayBg: { r: 100, g: 150, b: 200 },
        nightBg: { r: 10, g: 10, b: 12 }
    },
    materials: {
        stone: {
            top: 0xcccccc,
            right: 0x999999,
            left: 0x666666,
            outline: 0x333333
        },
        glass: {
            color: 0xaaddff,
            alpha: 0.2
        },
        window: {
            color: 0xffaa00
        }
    }
};
