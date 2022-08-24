//const Variable = require('../../engine/variable');
const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
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
            id: 'jsonfetch',
            name: 'js扩展',
            // blockIconURI: blockIconURI,
            // menuIconURI: menuIconURI,
            blocks: [
                {
                    opcode: 'sb',
                    blockType: BlockType.COMMAND,
                    text: '设置JS变量[a]的值是[b]',
                    arguments: {
                        a: {
                            type: ArgumentType.STRING,
                            defaultValue: 'index'
                        },
                        b: {
                            type: ArgumentType.STRING,
                            defaultValue: 'thing'
                        }
                    }
                },
                {
                    opcode: 'gv',
                    blockType: BlockType.REPORTER,
                    text: '获取JS变量[a]的值',
                    arguments: {
                        a: {
                            type: ArgumentType.STRING,
                            defaultValue: 'index'
                        }
                    }
                },
                {
                    opcode: 'getScratchList',
                    blockType: BlockType.REPORTER,
                    text: '获取scratch列表[name]',
                    arguments: {
                        name: {
                            type: ArgumentType.STRING,
                            defaultValue: 'scratch列表名'
                        },
                        value:{
                            type: ArgumentType.STRING,
                            defaultValue: '[114,5,1,4]'
                        }
                    }
                },
                {
                    opcode: 'setScratchList',
                    blockType: BlockType.COMMAND,
                    text: '设置scratch列表[name]，值为[value]',
                    arguments: {
                        name: {
                            type: ArgumentType.STRING,
                            defaultValue: 'scratch列表名'
                        },
                        value:{
                            type: ArgumentType.STRING,
                            defaultValue: '[114,5,1,4]'
                        }
                    }
                },
                {
                    opcode: 'dx2',
                    blockType: BlockType.REPORTER,
                    text: 'json[a]的第[b]项',
                    arguments: {
                        a: {
                            type: ArgumentType.STRING,
                            defaultValue: '{"Fruits":["apple","banana"],"app":"sccode"}'
                        },
                        b:{
                            type: ArgumentType.STRING,
                            defaultValue: 'app'
                        }
                    }
                },
                {
                    opcode: 'dx3',
                    blockType: BlockType.REPORTER,
                    text: '设置json[a]的第[b]项为[c]并返回',
                    arguments: {
                        a: {
                            type: ArgumentType.STRING,
                            defaultValue: '{"Fruits":["apple","banana"],"app":"scratch"}'
                        },
                        b:{
                            type: ArgumentType.STRING,
                            defaultValue: 'app'
                        },
                        c:{
                            type: ArgumentType.STRING,
                            defaultValue: 'sccode'
                        }
                    }
                },
                {
                    opcode: 'stos',
                    blockType: BlockType.REPORTER,
                    text: '按[a]拆分[b]',
                    arguments: {
                        a: {
                            type: ArgumentType.STRING,
                            defaultValue: '_'
                        },
                        b: {
                            type: ArgumentType.STRING,
                            defaultValue: 'I_want_an_apple'
                        },
                    }
                },
                {
                    opcode: 'setHeaders',
                    blockType: BlockType.COMMAND,
                    text: '设置请求头[headers]',
                    arguments: {
                        headers: {
                            type: ArgumentType.STRING,
                            defaultValue: '{"Content-Type": "application/json"}',
                        },
                    }
                },
                {
                    opcode: 'setBody',
                    blockType: BlockType.COMMAND,
                    text: '设置请求body[body]',
                    arguments: {
                        body: {
                            type: ArgumentType.STRING,
                            defaultValue: "{}",
                        },
                    }
                },
                {
                    opcode: 'fetch',
                    blockType: BlockType.COMMAND,
                    text: '[method]请求[url]',
                    arguments: {
                        method: {
                            type: ArgumentType.STRING,
                            defaultValue: 'get',
                            menu:'method'
                        },
                        url: {
                            type: ArgumentType.STRING,
                            defaultValue: 'https://saobby.pythonanywhere.com/api/get_current_time'
                        },
                    }
                },
                {
                    opcode: 'fetchAndWait',
                    blockType: BlockType.REPORTER,
                    text: '[method]请求[url]并等待',
                    arguments: {
                        method: {
                            type: ArgumentType.STRING,
                            defaultValue: 'GET',
                            menu:'method'
                        },
                        url: {
                            type: ArgumentType.STRING,
                            defaultValue: 'https://saobby.pythonanywhere.com/api/get_current_time'
                        },
                    }
                },
                {
                    opcode: 'res',
                    blockType: BlockType.REPORTER,
                    text: '[type]',
                    arguments: {
                        type: {
                            type: ArgumentType.STRING,
                            defaultValue: 'error',
                            menu:'m'
                        },
                      
                    }
                },
                {
                    opcode: 'setv',
                    blockType: BlockType.COMMAND,
                    text: '设置局部变量[a]的值为[b]',
                    arguments: {
                        a: {
                            type: ArgumentType.STRING,
                            defaultValue: 'i'
                        },
                        b: {
                            type: ArgumentType.STRING,
                            defaultValue: '0'
                        },
                    }
                },
                {
                    opcode: 'getv',
                    blockType: BlockType.REPORTER,
                    text: '获取局部变量[a]的值',
                    arguments: {
                        a: {
                            type: ArgumentType.STRING,
                            defaultValue: 'i'
                        },
                    }
                }
            ],
            menus: {
                method:['GET','POST', 'PUT', 'DELETE','OPTIONS','HEAD','TRACE','CONNECT'],
                m:['error','result','status']
                /*urlNames: {
                    acceptReporters: true,
                    items: [{
                        text: '云空间',
                        value: 'cloudSpace'
                    }]
                },*/
            }
        };
    }
    _ad(a){
        if(!temp2.bl){
            temp2.bl={};
        }
    }
    _f(a){
        if(!temp2.fetch){
            temp2.fetch={};
        }
    }
    setHeaders(a){
        try {
            this._f()
            temp2.fetch.Headers=JSON.parse(a.headers) 
        } catch (error) {
            console.log(error)
        }
    }
    setBody(a){
        this._f()
        try {
            temp2.fetch.body=JSON.parse(a.body) 
        } catch (error) {
            temp2.fetch.body=a.body
            console.log(error)
        }
    }
    fetch(a){
        this.fetchAndWait(a)
    }
    getScratchList({value,name},util){
        let list=util.target.lookupVariableByNameAndType(name,'list')
        return JSON.stringify(list && list.value);
    }
    setScratchList({value,name},util){
        let list=util.target.lookupVariableByNameAndType(name,'list')
        list && value && (list.value=JSON.parse(value));
    }
    fetchAndWait(a){
        this._f()
        var that=this;
        
        return new Promise(async resolve=>{
            function request(){
                temp2.fetch.status=""
                fetch(a.url,{
                    method: a.method,
                    headers: temp2.fetch.Headers,
                    referrerPolicy: 'no-referrer', 
                    body: a.method=='GET' || a.method=='HEAD' ? undefined : temp2.fetch.body
                })
                .then(d=>{
                    temp2.fetch.status=d.status
                    return d.text();
                })
                .then(res=>{
                    // temp2.fetch.status=""
                    temp2.fetch.error=''
                    resolve(temp2.fetch.res=res)
                })
                .catch(e=>{
                    console.log(e);
                    temp2.fetch.res=""
                    // temp2.fetch.status=""
                    temp2.fetch.error=e
                    resolve('')
                })
            }
            var getList=()=>{
                try {
                    console.log(this.writeList)
                    if(this.writeList){
                        if(this.writeList.indexOf((new URL(a.url)).host)==-1){
                            temp2.fetch.error='出于安全性考虑，此接口暂不可请求';
                            resolve('错误：详见error模块');
                            return;
                        }
                        request();
                    }else{
                        fetch(apihost+'work/urllist')
                        .then(d=>d.json())
                        .then(d=>{
                            that.writeList=d
                            getList()
                        })
                        .catch(e=>{
                            temp2.fetch.res=""
                            temp2.fetch.status=""
                            temp2.fetch.error=e
                            resolve('错误：详见error模块')
                        })
                    }
                } catch (error) {
                    console.log(error)
                    temp2.fetch.error='出于安全性考虑，此接口暂不可请求';
                    resolve('错误：详见error模块');
                }
            }
            getList();
        })
    }
    res(a){
        return temp2.fetch[a.type] || ''
    }
    sb(a){
        this._ad();
        let v=Cast.toString(a.a);
        let v2=a.b;
        temp2.bl[v]=v2;
    }
    
    gv(a){
        this._ad();
        let v=Cast.toString(a.a);
        let r=temp2.bl[v];
        if(typeof r=='object')
        r=JSON.stringify(r)
        return r;
    }

    dx2(a){
        let res;
        try{
            res=JSON.parse(a.a)[a.b];
        }catch(e){
            try{
                res=a.a[a.b];
            }catch(e){
                res='';
            }
        }
        if(typeof res=='object')
        res=JSON.stringify(res)
        return res;
    }
    dx3(a){
        let res;
        let c=a.c;
        try {
            c=JSON.parse(c)
        } catch (error) {
            
        }
        try{
            let v=JSON.parse(a.a);
            v[a.b]=c;
            res=v;
        }catch(e){
            try{
                let v=a.a;
                v[a.b]=c;
                res=v;
            }catch(e){
                res='';
            }
        }
        if(typeof res=='object')
        res=JSON.stringify(res)
        return res;
    }
    stos(a){
        try{
            return a.b.split(a.a);
        }catch(e){
            return '';
        }
    }
    setv({a,b},util){
        console.log(util.thread)
        util.thread.values || (util.thread.values={});
        util.thread.values.a=b
    }
    getv({a,b},util){
        console.log(util.thread)
        util.thread.values || (util.thread.values={});
        return util.thread.values.a
    }
}

module.exports = Scratch3JsonBlocks;
