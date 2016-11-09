// TypeScript file
class Astar {
    private var_open: Array<buildnode>;
    private var_closed: Array<buildnode>;
    private var_grid: Grid;
    private var_endNode: buildnode;
    private var_startNode: buildnode;
    public var_path: Array<buildnode>;
    // private var_heuristic:Function=manhattan;
    //private var_heuristic:Function=euclidian;
    private var_heuristic: Function = this.diagonal;
    private var_straightCost: number = 1.0;
    private var_diagCost: number = Math.sqrt(2);
    constructor(grid: Grid) {
        this.var_grid = grid;
    }

    public findPath(startNode: buildnode, endNode: buildnode): boolean {

        this.var_open = new Array();
        this.var_closed = new Array();
        this.var_startNode = startNode;
        this.var_endNode = endNode;
        this.var_startNode.g = 0;
        this.var_startNode.h = this.var_heuristic(this.var_startNode);
        this.var_startNode.f = this.var_startNode.g + this.var_startNode.h;
        return this.search();
    }
    public search(): boolean {
        var node: buildnode = this.var_startNode;
        while (node != this.var_endNode) {
            var startX: number = Math.max(0, node.x - 1);
            var endX: number = Math.min(this.var_grid.var_numRows - 1, node.x + 1);
            var startY: number = Math.max(0, node.y - 1);
            var endY: number = Math.min(this.var_grid.var_numRows - 1, node.y + 1);
            for (var i: number = startX; i <= endX; i++) {
                for (var j: number = startY; j <= endY; j++) {
                    var test: buildnode = this.var_grid.getNode(i, j);
                    if (test == node || !test.walkable) {
                        continue;
                    }
                    var cost: number = this.var_straightCost;
                    if (!((node.x == test.x) || (node.y == test.y))) {
                        cost = this.var_diagCost;
                    }
                    var g: number = node.g + cost * test.costMultiplier;
                    var h: number = this.var_heuristic(test);
                    var f: number = g + h;
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
            for (var o: number = 0; o < this.var_open.length; o++) {

            }
            this.var_closed.push(node);
            if (this.var_open.length == 0) {

                return false
            }
            this.var_open.sort(function (a, b) {
                return a.f - b.f;
            });
            this.var_open.map(function (a) {
                console.log(a, f);
            });
            node = this.var_open.shift() as buildnode;
        }
        this.buildPath();
        return true;
    }
    private buildPath(): void {
        this.var_path = new Array();
        var node: buildnode = this.var_endNode;
        this.var_path.push(node);
        while (node != this.var_startNode) {
            node = node.parent;
            this.var_path.unshift(node);
        }
    }
    private diagonal(node: buildnode): number {
        var dx: number = Math.abs(node.x - this.var_endNode.x);
        var dy: number = Math.abs(node.y - this.var_endNode.y);
        var diag: number = Math.min(dx, dy);
        var straight: number = dx + dy;
        return this.var_diagCost * diag + this.var_straightCost * (straight - 2 * diag);
    }
    private isOpen(node: buildnode): boolean {
        return this.var_open.indexOf(node) >= 0;
    }
    private isClosed(node: buildnode): boolean {
        return this.var_closed.indexOf(node) >= 0;
    }
}
