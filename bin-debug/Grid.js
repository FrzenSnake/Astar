// TypeScript file
var Grid = (function () {
    function Grid(stage) {
        this.var_numCols = 10;
        this.var_numRows = 10;
        this.mapsize = 100;
        this.config = [];
        this.stage = stage;
        this.config = [
            { node: new buildnode(0, 0, true), image: "ground_png" },
            { node: new buildnode(1, 0, false), image: "wall_png" },
            { node: new buildnode(2, 0, false), image: "wall_png" },
            { node: new buildnode(3, 0, false), image: "wall_png" },
            { node: new buildnode(4, 0, false), image: "wall_png" },
            { node: new buildnode(5, 0, false), image: "wall_png" },
            { node: new buildnode(6, 0, false), image: "wall_png" },
            { node: new buildnode(7, 0, false), image: "wall_png" },
            { node: new buildnode(8, 0, false), image: "wall_png" },
            { node: new buildnode(9, 0, false), image: "wall_png" },
            { node: new buildnode(0, 1, true), image: "ground_png" },
            { node: new buildnode(1, 1, true), image: "ground_png" },
            { node: new buildnode(2, 1, true), image: "ground_png" },
            { node: new buildnode(3, 1, true), image: "ground_png" },
            { node: new buildnode(4, 1, true), image: "ground_png" },
            { node: new buildnode(5, 1, true), image: "ground_png" },
            { node: new buildnode(6, 1, true), image: "ground_png" },
            { node: new buildnode(7, 1, true), image: "ground_png" },
            { node: new buildnode(8, 1, true), image: "ground_png" },
            { node: new buildnode(9, 1, false), image: "wall_png" },
            { node: new buildnode(0, 2, false), image: "wall_png" },
            { node: new buildnode(1, 2, false), image: "wall_png" },
            { node: new buildnode(2, 2, false), image: "wall_png" },
            { node: new buildnode(3, 2, false), image: "wall_png" },
            { node: new buildnode(4, 2, false), image: "wall_png" },
            { node: new buildnode(5, 2, false), image: "wall_png" },
            { node: new buildnode(6, 2, true), image: "ground_png" },
            { node: new buildnode(7, 2, false), image: "wall_png" },
            { node: new buildnode(8, 2, false), image: "wall_png" },
            { node: new buildnode(9, 2, false), image: "wall_png" },
            { node: new buildnode(0, 3, false), image: "wall_png" },
            { node: new buildnode(1, 3, false), image: "wall_png" },
            { node: new buildnode(2, 3, false), image: "wall_png" },
            { node: new buildnode(3, 3, false), image: "wall_png" },
            { node: new buildnode(4, 3, false), image: "wall_png" },
            { node: new buildnode(5, 3, false), image: "wall_png" },
            { node: new buildnode(6, 3, true), image: "ground_png" },
            { node: new buildnode(7, 3, false), image: "wall_png" },
            { node: new buildnode(8, 3, false), image: "wall_png" },
            { node: new buildnode(9, 3, false), image: "wall_png" },
            { node: new buildnode(0, 4, false), image: "wall_png" },
            { node: new buildnode(1, 4, false), image: "wall_png" },
            { node: new buildnode(2, 4, false), image: "wall_png" },
            { node: new buildnode(3, 4, false), image: "wall_png" },
            { node: new buildnode(4, 4, false), image: "wall_png" },
            { node: new buildnode(5, 4, false), image: "wall_png" },
            { node: new buildnode(6, 4, true), image: "ground_png" },
            { node: new buildnode(7, 4, false), image: "wall_png" },
            { node: new buildnode(8, 4, false), image: "wall_png" },
            { node: new buildnode(9, 4, false), image: "wall_png" },
            { node: new buildnode(0, 5, false), image: "wall_png" },
            { node: new buildnode(1, 5, false), image: "wall_png" },
            { node: new buildnode(2, 5, false), image: "wall_png" },
            { node: new buildnode(3, 5, false), image: "wall_png" },
            { node: new buildnode(4, 5, false), image: "wall_png" },
            { node: new buildnode(5, 5, false), image: "wall_png" },
            { node: new buildnode(6, 5, true), image: "ground_png" },
            { node: new buildnode(7, 5, false), image: "wall_png" },
            { node: new buildnode(8, 5, false), image: "wall_png" },
            { node: new buildnode(9, 5, false), image: "wall_png" },
            { node: new buildnode(0, 6, false), image: "wall_png" },
            { node: new buildnode(1, 6, false), image: "wall_png" },
            { node: new buildnode(2, 6, true), image: "ground_png" },
            { node: new buildnode(3, 6, true), image: "ground_png" },
            { node: new buildnode(4, 6, false), image: "wall_png" },
            { node: new buildnode(5, 6, false), image: "wall_png" },
            { node: new buildnode(6, 6, true), image: "ground_png" },
            { node: new buildnode(7, 6, false), image: "wall_png" },
            { node: new buildnode(8, 6, true), image: "ground_png" },
            { node: new buildnode(9, 6, false), image: "wall_png" },
            { node: new buildnode(0, 7, false), image: "wall_png" },
            { node: new buildnode(1, 7, true), image: "ground_png" },
            { node: new buildnode(2, 7, true), image: "ground_png" },
            { node: new buildnode(3, 7, true), image: "ground_png" },
            { node: new buildnode(4, 7, false), image: "wall_png" },
            { node: new buildnode(5, 7, false), image: "wall_png" },
            { node: new buildnode(6, 7, true), image: "ground_png" },
            { node: new buildnode(7, 7, false), image: "wall_png" },
            { node: new buildnode(8, 7, true), image: "ground_png" },
            { node: new buildnode(9, 7, false), image: "wall_png" },
            { node: new buildnode(0, 8, false), image: "wall_png" },
            { node: new buildnode(1, 8, true), image: "ground_png" },
            { node: new buildnode(2, 8, true), image: "ground_png" },
            { node: new buildnode(3, 8, true), image: "ground_png" },
            { node: new buildnode(4, 8, true), image: "ground_png" },
            { node: new buildnode(5, 8, true), image: "ground_png" },
            { node: new buildnode(6, 8, true), image: "ground_png" },
            { node: new buildnode(7, 8, true), image: "ground_png" },
            { node: new buildnode(8, 8, true), image: "ground_png" },
            { node: new buildnode(9, 8, false), image: "wall_png" },
            { node: new buildnode(0, 9, false), image: "wall_png" },
            { node: new buildnode(1, 9, false), image: "wall_png" },
            { node: new buildnode(2, 9, false), image: "wall_png" },
            { node: new buildnode(3, 9, false), image: "wall_png" },
            { node: new buildnode(4, 9, false), image: "wall_png" },
            { node: new buildnode(5, 9, false), image: "wall_png" },
            { node: new buildnode(6, 9, false), image: "wall_png" },
            { node: new buildnode(7, 9, false), image: "wall_png" },
            { node: new buildnode(8, 9, false), image: "wall_png" },
            { node: new buildnode(9, 9, false), image: "wall_png" },
        ];
        var container = new egret.DisplayObjectContainer();
        for (var i = 0; i < this.config.length; i++) {
            var tile = this.config[i];
            var usebitmap = new egret.Bitmap();
            usebitmap.texture = RES.getRes(tile.image);
            usebitmap.x = tile.node.x * this.mapsize;
            usebitmap.y = tile.node.y * this.mapsize;
            usebitmap.touchEnabled = tile.node.walkable;
            this.stage.addChild(usebitmap);
        }
    }
    var d = __define,c=Grid,p=c.prototype;
    p.getNode = function (x, y) {
        var result = this.config[y * this.var_numRows + x].node;
        return result;
    };
    return Grid;
}());
egret.registerClass(Grid,'Grid');
//# sourceMappingURL=Grid.js.map