// TypeScript file
var Astar = (function () {
    function Astar(grid) {
        // private var_heuristic:Function=manhattan;
        //private var_heuristic:Function=euclidian;
        this.var_heuristic = this.diagonal;
        this.var_straightCost = 1.0;
        this.var_diagCost = Math.sqrt(2);
        this.var_grid = grid;
    }
    var d = __define,c=Astar,p=c.prototype;
    p.findPath = function (startNode, endNode) {
        this.var_open = new Array();
        this.var_closed = new Array();
        this.var_startNode = startNode;
        this.var_endNode = endNode;
        this.var_startNode.g = 0;
        this.var_startNode.h = this.var_heuristic(this.var_startNode);
        this.var_startNode.f = this.var_startNode.g + this.var_startNode.h;
        return this.search();
    };
    p.search = function () {
        var node = this.var_startNode;
        while (node != this.var_endNode) {
            var startX = Math.max(0, node.x - 1);
            var endX = Math.min(this.var_grid.var_numRows - 1, node.x + 1);
            var startY = Math.max(0, node.y - 1);
            var endY = Math.min(this.var_grid.var_numRows - 1, node.y + 1);
            for (var i = startX; i <= endX; i++) {
                for (var j = startY; j <= endY; j++) {
                    var test = this.var_grid.getNode(i, j);
                    if (test == node || !test.walkable) {
                        continue;
                    }
                    var cost = this.var_straightCost;
                    if (!((node.x == test.x) || (node.y == test.y))) {
                        cost = this.var_diagCost;
                    }
                    var g = node.g + cost * test.costMultiplier;
                    var h = this.var_heuristic(test);
                    var f = g + h;
                    if (this.isOpen(test) || this.isClosed(test)) {
                        if (test.f > f) {
                            test.f = f;
                            test.g = g;
                            test.h = h;
                            test.parent = node;
                        }
                    }
                    else {
                        test.f = f;
                        test.g = g;
                        test.h = h;
                        test.parent = node;
                        this.var_open.push(test);
                    }
                }
            }
            for (var o = 0; o < this.var_open.length; o++) {
            }
            this.var_closed.push(node);
            if (this.var_open.length == 0) {
                return false;
            }
            this.var_open.sort(function (a, b) {
                return a.f - b.f;
            });
            this.var_open.map(function (a) {
                console.log(a, f);
            });
            node = this.var_open.shift();
        }
        this.buildPath();
        return true;
    };
    p.buildPath = function () {
        this.var_path = new Array();
        var node = this.var_endNode;
        this.var_path.push(node);
        while (node != this.var_startNode) {
            node = node.parent;
            this.var_path.unshift(node);
        }
    };
    p.diagonal = function (node) {
        var dx = Math.abs(node.x - this.var_endNode.x);
        var dy = Math.abs(node.y - this.var_endNode.y);
        var diag = Math.min(dx, dy);
        var straight = dx + dy;
        return this.var_diagCost * diag + this.var_straightCost * (straight - 2 * diag);
    };
    p.isOpen = function (node) {
        return this.var_open.indexOf(node) >= 0;
    };
    p.isClosed = function (node) {
        return this.var_closed.indexOf(node) >= 0;
    };
    return Astar;
}());
egret.registerClass(Astar,'Astar');
//# sourceMappingURL=Astar.js.map