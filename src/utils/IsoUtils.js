// ============================================
// ISOMETRIC UTILITIES
// ============================================
class IsoUtils {
    static project(x, y, z) {
        return { x: (x - y), y: (x + y) * 0.5 - z };
    }

    static drawLine(g, cx, cy, x1, y1, x2, y2) {
        const p1 = this.project(x1, y1, 0);
        const p2 = this.project(x2, y2, 0);
        g.lineBetween(cx + p1.x, cy + p1.y, cx + p2.x, cy + p2.y);
    }

    static drawFace(g, cx, cy, points, outline, offset = true) {
        const pts = offset ? points.map(p => ({ x: cx + p.x, y: cy + p.y })) : points;
        g.fillPoints(pts, true);
        g.lineStyle(1, outline, 0.2);
        g.strokePoints(pts, true);
    }

    static drawBox(g, cx, cy, x, y, z, w, d, h) {
        const f = [
            this.project(x, y, z + h),
            this.project(x + w, y, z + h),
            this.project(x + w, y + d, z + h),
            this.project(x, y + d, z + h)
        ];
        g.fillPoints(f.map(p => ({ x: cx + p.x, y: cy + p.y })), true);
    }

    static drawShadedBox(g, cx, cy, x, y, z, w, d, h, material) {
        g.fillStyle(material.top);
        this.drawFace(g, cx, cy, [
            this.project(x, y, z + h),
            this.project(x + w, y, z + h),
            this.project(x + w, y + d, z + h),
            this.project(x, y + d, z + h)
        ], material.outline);

        g.fillStyle(material.right);
        this.drawFace(g, cx, cy, [
            this.project(x + w, y, z),
            this.project(x + w, y + d, z),
            this.project(x + w, y + d, z + h),
            this.project(x + w, y, z + h)
        ], material.outline);

        g.fillStyle(material.left);
        this.drawFace(g, cx, cy, [
            this.project(x, y + d, z),
            this.project(x + w, y + d, z),
            this.project(x + w, y + d, z + h),
            this.project(x, y + d, z + h)
        ], material.outline);
    }

    static drawPyramid(g, cx, cy, x, y, z, size, height, material) {
        const h = size / 2;
        const tip = this.project(x, y, z + height);
        const base = [
            this.project(x - h, y - h, z),
            this.project(x + h, y - h, z),
            this.project(x + h, y + h, z),
            this.project(x - h, y + h, z)
        ];
        const colors = [material.top, material.right, material.right, material.left];
        
        base.forEach((point, i) => {
            const nextP = base[(i + 1) % 4];
            g.fillStyle(colors[i]);
            this.drawFace(g, cx, cy, [
                { x: cx + tip.x, y: cy + tip.y },
                { x: cx + point.x, y: cy + point.y },
                { x: cx + nextP.x, y: cy + nextP.y }
            ], material.outline, false);
        });
    }
}
