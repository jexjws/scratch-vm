//const Variable = require('../../engine/variable');
const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
var PF = require('pathfinding');
// const { resolves } = require('tap');
//const { template } = require('@babel/core');

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSLlm77lsYJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiCgkgdmlld0JveD0iLTQxNSAyMTcgMTI4IDEyOCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAtNDE1IDIxNyAxMjggMTI4OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0tMzA5LjIsMjc4LjVoLTYuOXYtMTguN2MwLTUtNC40LTkuNC05LjQtOS40aC0xOC43di03LjVjLTAuNi02LjktNi4yLTExLjktMTIuNS0xMS45Yy02LjksMC0xMS45LDUtMTEuOSwxMS45Cgl2Ni45aC0xOC43Yy01LjYsMC0xMCw0LjQtMTAsMTB2MTguMWg2LjljNi45LDAsMTMuMSw1LjYsMTMuMSwxMy4xYzAsNi45LTUuNiwxMy4xLTEzLjEsMTMuMWgtNi45djE4LjFjMCw0LjQsNC40LDguOCw5LjQsOC44aDE4LjEKCXYtNi45YzAtNi45LDUuNi0xMy4xLDEzLjEtMTMuMWM2LjksMCwxMy4xLDUuNiwxMy4xLDEzLjF2Ni45aDE4LjFjNSwwLDkuNC00LjQsOS40LTkuNHYtMTguN2g2LjljNi45LDAsMTEuOS01LDExLjktMTEuOQoJQy0yOTcuMywyODMuNS0zMDIuMywyNzguNS0zMDkuMiwyNzguNXogTS0zNDIuNywyOTEuNWMwLDguMS00LjMsMTQuOC0xMy42LDE0LjhjLTYuNSwwLTEwLjctMi41LTEzLjctNy42bDYuOC01LjEKCWMxLjQsMi44LDMuNiw0LjEsNS42LDQuMWMzLjIsMCw1LTEuNiw1LTdWMjY0aDEwVjI5MS41eiIvPgo8L3N2Zz4=';
const menuIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSLlm77lsYJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiCgkgdmlld0JveD0iLTQxNSAyMTcgMTI4IDEyOCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAtNDE1IDIxNyAxMjggMTI4OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxwYXRoIHN0eWxlPSJmaWxsOiMxMjk2REI7IiBkPSJNLTMwNC4yLDI3OC41aC02Ljl2LTE4LjdjMC01LTQuNC05LjQtOS40LTkuNGgtMTguN3YtNy41Yy0wLjYtNi45LTYuMi0xMS45LTEyLjUtMTEuOQoJYy02LjksMC0xMS45LDUtMTEuOSwxMS45djYuOWgtMTguN2MtNS42LDAtMTAsNC40LTEwLDEwdjE4LjFoNi45YzYuOSwwLDEzLjEsNS42LDEzLjEsMTMuMWMwLDYuOS01LjYsMTMuMS0xMy4xLDEzLjFoLTYuOXYxOC4xCgljMCw0LjQsNC40LDguOCw5LjQsOC44aDE4LjF2LTYuOWMwLTYuOSw1LjYtMTMuMSwxMy4xLTEzLjFjNi45LDAsMTMuMSw1LjYsMTMuMSwxMy4xdjYuOWgxOC4xYzUsMCw5LjQtNC40LDkuNC05LjR2LTE4LjdoNi45CgljNi45LDAsMTEuOS01LDExLjktMTEuOUMtMjkyLjMsMjgzLjUtMjk3LjMsMjc4LjUtMzA0LjIsMjc4LjV6IE0tMzM3LjcsMjkxLjVjMCw4LjEtNC4zLDE0LjgtMTMuNiwxNC44Yy02LjUsMC0xMC43LTIuNS0xMy43LTcuNgoJbDYuOC01LjFjMS40LDIuOCwzLjYsNC4xLDUuNiw0LjFjMy4yLDAsNS0xLjYsNS03VjI2NGgxMEwtMzM3LjcsMjkxLjVMLTMzNy43LDI5MS41eiIvPgo8L3N2Zz4=';

/**
 * Host for the Pen-related blocks in Scratch 3.0
 * @param {Runtime} runtime - the runtime instantiating this block package.
 * @constructor
 */
class Scratch3JsonBlocks {
    constructor(runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
        //this.runtime.on('PROJECT_STOP_ALL', this._init.bind(this));
        //this.runtime.on('PROJECT_START', this._init.bind(this));
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo() {
        return {
            id: 'astar',
            name: '寻路算法',
            // blockIconURI: blockIconURI,
            // menuIconURI: menuIconURI,
            color1:'#8BC34A',
            blocks: [
                {
                    opcode: 'createNet',
                    blockType: BlockType.COMMAND,
                    text: '创建一个网络，宽[x]，高[y]',
                    arguments: {
                        x: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 12,
                        },
                        y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 7,
                        },
                    }
                },
                {
                    opcode: 'setStart',
                    blockType: BlockType.COMMAND,
                    text: '设置一个起点，x[x]，y[y]',
                    arguments: {
                        x: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                        y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'setEnd',
                    blockType: BlockType.COMMAND,
                    text: '设置一个终点，x[x]，y[y]',
                    arguments: {
                        x: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                        y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'addPoint',
                    blockType: BlockType.COMMAND,
                    text: '添加一个障碍点，x[x]，y[y]',
                    arguments: {
                        x: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                        y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'delPoint',
                    blockType: BlockType.COMMAND,
                    text: '移除一个障碍点，x[x]，y[y]',
                    arguments: {
                        x: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                        y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'set',
                    blockType: BlockType.COMMAND,
                    text: '设置[a]对角线移动，[b]跨过边缘',
                    arguments: {
                        a: {
                            type: ArgumentType.STRING,
                            defaultValue: '禁止',
                            menu:'a'
                        },
                        b: {
                            type: ArgumentType.STRING,
                            defaultValue: '禁止',
                            menu:'a'
                        },
                    }
                },
                {
                    opcode: 'find',
                    blockType: BlockType.COMMAND,
                    text: '执行寻找路径，采用[s]算法',
                    arguments: {
                        s: {
                            type: ArgumentType.STRING,
                            defaultValue: 'AStar',
                            menu:'s'
                        },
                    }
                },
                {
                    opcode: 'llength',
                    blockType: BlockType.REPORTER,
                    text: '路径长度',
                    arguments: {

                    }
                },
                {
                    opcode: 'found',
                    blockType: BlockType.REPORTER,
                    text: '找到的路径(字符串)',
                    arguments: {

                    }
                },
                {
                    opcode: 'x',
                    blockType: BlockType.REPORTER,
                    text: '[a]点的[t]',
                    arguments: {
                        a: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                        t: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 'x',
                            menu: 't'
                        },
                    }
                },
                // {
                //     opcode: 'type',
                //     blockType: BlockType.REPORTER,
                //     text: '坐标点的类型 x[x]，y[y]',
                //     arguments: {
                //         x: {
                //             type: ArgumentType.NUMBER,
                //             defaultValue: 0,
                //         },
                //         y: {
                //             type: ArgumentType.NUMBER,
                //             defaultValue: 0,
                //         },
                //     }
                // },
            ],
            menus: {
                t: ['x', 'y'],
                s:['AStar','BestFirst','BreadthFirst','Dijkstra','IDAStar','JumpPoint','OrthogonalJumpPoint','BiAStar','BiBestFirst','BiBreadthFirst','BiDijkstra'],
                a:['允许','禁止']
            }
        };
    }
    set(a){
        this._ad();
        if(a.a=="允许") temp2.astar.c=1
        else temp2.astar.c=0
        if(a.b=="允许") temp2.astar.c2=0
        else temp2.astar.c2=0
    }
    _ad(a) {
        if (!temp2.astar) {
            temp2.astar = {};
        }
    }
    // type
    x(a){
        this._ad();
        let p=temp2.astar.path
        if(!p) return ''
        if(a.t=='x') return p[a.a][0]
        if(a.t=='y') return p[a.a][1]
    }
    found(a){
        this._ad();
        let p=temp2.astar.path
        if(!p) return ''
        let s=""
        for(let i=0;i<p.length;i++){
            s+=p[i][0]+','+p[i][1]+';'
        }
        return s;
    }
    llength(a){
        this._ad();
        if(!temp2.astar.path) return '0';
        return temp2.astar.path.length;
    }
    find(a){
        this._ad();
        if(!temp2.astar.e || !temp2.astar.s){
            return '请设置起始点和终止点'
        }
        let config={};
        if(temp2.astar.c!==undefined) config.allowDiagonal=temp2.astar.c
        if(temp2.astar.c2!==undefined) config.dontCrossCorners=temp2.astar.c2
        var finder = new PF[a.s+'Finder'](config);
        temp2.astar.path = finder.findPath(temp2.astar.s[0],temp2.astar.s[1], temp2.astar.e[0], temp2.astar.e[1], temp2.astar.grid);
    }
    delPoint(a){
        this._ad();
        temp2.astar.grid.setWalkableAt(a.x, a.y, true);
    }
    addPoint(a){
        this._ad();
        temp2.astar.grid.setWalkableAt(a.x, a.y, false);
    }
    setEnd(a){
        this._ad();
        temp2.astar.e=[a.x,a.y]
    }
    setStart(a){
        this._ad();
        temp2.astar.s=[a.x,a.y]
    }
    createNet(a){
        this._ad();
        temp2.astar.grid=new PF.Grid(a.x, a.y); 
    }
}

module.exports = Scratch3JsonBlocks;
