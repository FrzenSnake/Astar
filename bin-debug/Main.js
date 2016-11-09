//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    p.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    p.createGameScene = function () {
        var _this = this;
        var grid = new Grid(this);
        var data = RES.getRes("stand_json");
        var txtr = RES.getRes("stand_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        var playerstand_mc = new egret.MovieClip(mcFactory.generateMovieClipData("stand"));
        var data = RES.getRes("run_json");
        var txtr = RES.getRes("run_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        var playermove_mc = new egret.MovieClip(mcFactory.generateMovieClipData("run"));
        var playercontainer = new egret.DisplayObjectContainer();
        playerstand_mc.scaleX = 0.5;
        playerstand_mc.scaleY = 0.5;
        this.addChild(playercontainer);
        var player = new StateMachine(this, playercontainer, playerstand_mc, playermove_mc);
        var interval;
        var startnode;
        var endnode;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            egret.stopTick(moveFunction, _this);
            clearInterval(interval);
            var endXpos = Math.floor(e.stageX / grid.mapsize);
            var endYpos = Math.floor(e.stageY / grid.mapsize);
            player.currentX = player._rongqi.x;
            player.currentY = player._rongqi.y;
            var startXpos = Math.floor(player.currentX / grid.mapsize);
            var startYpos = Math.floor(player.currentY / grid.mapsize);
            var astar = new Astar(grid);
            console.log("startXpos " + startXpos);
            console.log("startYpos " + startYpos);
            startnode = grid.getNode(startXpos, startYpos);
            endnode = grid.getNode(endXpos, endYpos);
            console.log(startnode);
            console.log(endnode);
            console.log(astar.findPath(startnode, endnode));
            if (astar.findPath(startnode, endnode)) {
                astar.var_path.map(function (tile) {
                    console.log("x:" + tile.x + ",y:" + tile.y);
                });
                var n = astar.var_path.length - 1;
                var i = 0;
                astar.var_path.shift();
                interval = setInterval(function () {
                    var pos = astar.var_path.shift();
                    var maxlength = 0;
                    player.endX = pos.x * grid.mapsize;
                    player.endY = pos.y * grid.mapsize;
                    var dx = player.endX - player._rongqi.x;
                    var dy = player.endY - player._rongqi.y;
                    maxlength = Math.pow(dx * dx + dy * dy, 1 / 2);
                    var Ratiox = dx / maxlength;
                    var Ratioy = dy / maxlength;
                    player.Ratiox = Ratiox;
                    player.Ratioy = Ratioy;
                    player.timeOnEnterFrame = egret.getTimer();
                    egret.startTick(moveFunction, _this);
                    i++;
                    if (i == n) {
                        clearInterval(interval);
                        i = 0;
                    }
                }, 500);
            }
        }, this);
        function moveFunction() {
            var now = Math.floor(egret.getTimer());
            var pass = now - player.timeOnEnterFrame;
            var speed = 0.3;
            player.setState("move");
            console.log("pass * speed * player.Ratiox " + pass * speed * player.Ratiox);
            console.log("pass * speed * player.Ratioy " + pass * speed * player.Ratioy);
            player._rongqi.x += pass * speed * player.Ratiox;
            player._rongqi.y += pass * speed * player.Ratioy;
            player.timeOnEnterFrame = egret.getTimer();
            if (player._rongqi.y - player.endY < 6 && player._rongqi.y - player.endY > -6 &&
                player._rongqi.x - player.endX < 6 && player._rongqi.x - player.endX > -6) {
                player._rongqi.x = player.endX;
                player._rongqi.y = player.endY;
                console.log("endX: " + player.endX + " endY: " + player.endY);
                egret.stopTick(moveFunction, this);
                player.setState("stand");
                console.log("run true");
                return true;
            }
            return false;
        }
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
//# sourceMappingURL=Main.js.map