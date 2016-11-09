var buildnode = (function () {
    function buildnode(x, y, walkable) {
        this.costMultiplier = 1.0;
        this.x = x;
        this.y = y;
        this.walkable = walkable;
    }
    var d = __define,c=buildnode,p=c.prototype;
    return buildnode;
}());
egret.registerClass(buildnode,'buildnode');
//# sourceMappingURL=buildnode.js.map