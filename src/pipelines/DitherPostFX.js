// ============================================
// DITHER POST-FX PIPELINE
// ============================================
class DitherPostFX extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    constructor(game) {
        super({
            game,
            name: 'DitherPostFX',
            fragShader: `
            precision mediump float;
            uniform sampler2D uMainSampler;
            varying vec2 outTexCoord;

            float dither4x4(vec2 position, float brightness) {
                int x = int(mod(position.x, 4.0));
                int y = int(mod(position.y, 4.0));
                float limit = 0.0;
                int index = x + y * 4;

                if (index == 0) limit = 0.0625; else if (index == 1) limit = 0.5625;
                else if (index == 2) limit = 0.1875; else if (index == 3) limit = 0.6875;
                else if (index == 4) limit = 0.8125; else if (index == 5) limit = 0.3125;
                else if (index == 6) limit = 0.9375; else if (index == 7) limit = 0.4375;
                else if (index == 8) limit = 0.25; else if (index == 9) limit = 0.75;
                else if (index == 10) limit = 0.125; else if (index == 11) limit = 0.625;
                else if (index == 12) limit = 1.0; else if (index == 13) limit = 0.5;
                else if (index == 14) limit = 0.875; else if (index == 15) limit = 0.375;

                return brightness < limit ? 0.0 : 1.0;
            }

            void main() {
                float pixelSize = 2.0;
                float ditherStrength = 0.35;
                
                vec2 size = vec2(800.0, 600.0);
                vec2 p = floor(outTexCoord * size / pixelSize) * pixelSize / size;
                
                vec4 color = texture2D(uMainSampler, p);
                float brightness = dot(color.rgb, vec3(0.299, 0.587, 0.114));
                
                vec2 screenPos = outTexCoord * size / pixelSize;
                float d = dither4x4(screenPos, brightness);
                
                vec3 ditheredColor = color.rgb * (d * 0.5 + 0.5);
                gl_FragColor = vec4(mix(color.rgb, ditheredColor, ditherStrength), color.a);
            }
            `
        });
    }
}
