const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const THREE = require('three')
/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACfElEQVRYR8WXO2sXURDFf6dTJCAYbSxUfOEDFHw3gtgZLUwhgqB+iCgoghFEC/0EVmqnohY+Kgux0ZCAEogBY/BRWPioxHpkwu6f63Xv7r3/KLnl7sycs3NnzsyKBT5aYHz6ImBmF4HRgPxH4KakS6Uf1C8BawKSVByv1cHMljiQpF8hoJllETCz1ZI8O8mTJGBmhzytleeIpNt1lBwCZnYOuAKMA6clvW3MWtNDM9sNPAEGg/dDwCLgLLAn8UmTwGVgMXArsJkCjjWRaMyAmb0GtpcWVIf9lKStsc1fBPzegA//GNzDfQPWxPWUykB9f108piuDTV2GwKmwjmr7tiI8Gd1j7TMLnAFeSPrhD81sGbAfuAasbSAzJOlpdhFWQQ8CzyKn0S6xaRApD3Fc0p1SAmOAd0N9xiTtzUi1Z+RV1CkTkna1EkgwD32OSHqcSeAw8KjFtpfJXg2kxCUIskKSV3LnMbPlwNcWw+eSDvj7XAIzkjZ0IgcGZvYOWJ/wKSYwLWlzIQGX3lR7FhNw7MG67bqIVG35vfQK4hkf+w9LetgFXrXwUeBBURHGxg2tNCtpXSaB95EgTUraVqoDw8D9yKlfIfJJeK+UgIvOywYnFygfuS5Mc21ZtZ2P6AuJUd04B/5owxCoWkZ8H+g6M5VBqt1C//OSrsYBm8bxAPAZWNqF3sf7jZJcH3onNY4ngB19ALS5jEsKZ8ucbYqAi85dYEsQcR+wChgBdiaQnPh14FNUP2UrWVVYNYmVwIlwnmcupb7Ueh29qfzzl9KoIAck/Yye/f+1vO0yczKQWz/FfzLV9cSy/QW40bUtFQlR7hfM166vDMwXNPT/DWeh+iFlY2ANAAAAAElFTkSuQmCC';

/**
 * @typedef {object} PenState - the pen state associated with a particular target.
 * @property {Boolean} penDown - tracks whether the pen should draw for this target.
 * @property {number} color - the current color (hue) of the pen.
 * @property {PenAttributes} penAttributes - cached pen attributes for the renderer. This is the authoritative value for
 *   diameter but not for pen color.
 */

/**
 * Host for the Pen-related blocks in Scratch 3.0
 * @param {Runtime} runtime - the runtime instantiating this block package.
 * @constructor
 */
class Scratch3threeBlocks {
    constructor(runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo() {
        return {
            id: 'three',
            name: '3D引擎',
            // blockIconURI: blockIconURI,
            color1:'#F4511E',
            blocks: [
                {
                    opcode: 'f',
                    blockType: BlockType.COMMAND,
                    text: '初始化3D引擎，宽[x]，高[y]',
                    arguments: {
                        x: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '480',
                        },
                        y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '360',
                        },
                    },
                },
                {
                    opcode: 'cu',
                    blockType: BlockType.COMMAND,
                    text: '新建[l]，图形名[n]，长[x]，高[y]，宽[z]',
                    arguments: {
                        n: {
                            type: ArgumentType.STRING,
                            defaultValue: 'cube',
                        },
                        x: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '50',
                        },
                        y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '50',
                        },
                        z: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '50',
                        },
                        l:{
                            type: ArgumentType.STRING,
                            defaultValue: '立方体',
                            menu:'lf'
                        }
                    },
                },
                {
                    opcode: 'yz',
                    blockType: BlockType.COMMAND,
                    text: '新建圆柱，图形名[n]，顶部直径[a]，底部直径[b]，高度[c]，圆周分段数[d]',
                    arguments: {
                        n: {
                            type: ArgumentType.STRING,
                            defaultValue: 'cube',
                        },
                        a: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '50',
                        },
                        b: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '100',
                        },
                        c: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '25',
                        },
                        d: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '2',
                        }
                    },
                },
                {
                    opcode: 'd',
                    blockType: BlockType.COMMAND,
                    text: '新建正[l]面体，图形名[n]，径[a]',
                    arguments: {
                        
                        n: {
                            type: ArgumentType.STRING,
                            defaultValue: 'cube',
                        },
                        a: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '50',
                        },
                        l: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '8',
                            menu:'m'
                        }
                    },
                },
                {
                    opcode: 'ma',
                    blockType: BlockType.COMMAND,
                    text: '新建材质[t]，材质名[n]，颜色[c]',
                    arguments: {
                        n: {
                            type: ArgumentType.STRING,
                            defaultValue: 'ma',
                        },
                        t: {
                            type: ArgumentType.STRING,
                            defaultValue: '基础网格材质',
                            menu:'cz'
                        },
                        c: {
                            type: ArgumentType.STRING,
                            defaultValue: '0x00ff',
                        },
                    },
                },
                {
                    opcode: 'setm',
                    blockType: BlockType.COMMAND,
                    text: '设置材质[n]的[t]值为[c]',
                    arguments: {
                        n: {
                            type: ArgumentType.STRING,
                            defaultValue: 'ma',
                        },
                        t: {
                            type: ArgumentType.STRING,
                            defaultValue: '颜色',
                            menu:'cz2'
                        },
                        c:{
                            type: ArgumentType.STRING,
                            defaultValue: '0x0000ff',
                        }
                    },
                },
                {
                    opcode: 'add',
                    blockType: BlockType.COMMAND,
                    text: '建立名称为[n]的网格模型，已有图形[a]、已有材质[b]',
                    arguments: {
                        a: {
                            type: ArgumentType.STRING,
                            defaultValue: 'cube',
                        },
                        n: {
                            type: ArgumentType.STRING,
                            defaultValue: 'mash',
                        },
                        b: {
                            type: ArgumentType.STRING,
                            defaultValue: 'ma',
                        },
                       
                    },
                },
                {
                    opcode: 'sxyz',
                    blockType: BlockType.COMMAND,
                    text: '设置网格模型[a]的坐标[x][y][z]',
                    arguments: {
                        a: {
                            type: ArgumentType.STRING,
                            defaultValue: 'mash',
                        },
                        x: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '400',
                        },
                        y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '200',
                        },
                        z: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '300',
                        },
                    },
                },
                {
                    opcode: 'addm',
                    blockType: BlockType.COMMAND,
                    text: '将网格模型[n]添加到场景中',
                    arguments: {
                        n: {
                            type: ArgumentType.STRING,
                            defaultValue: 'mash',
                        },

                    },
                },
                {
                    opcode: 'point',
                    blockType: BlockType.COMMAND,
                    text: '新建光源[g]，图形名[a]，颜色[b]',
                    arguments: {
                        a: {
                            type: ArgumentType.STRING,
                            defaultValue: 'point',
                        },
                        b: {
                            type: ArgumentType.STRING,
                            defaultValue: '0x00ffff',
                        },
                        g: {
                            type: ArgumentType.STRING,
                            defaultValue: '点光源',
                            menu:'gy'
                        },
                    },
                },
                {
                    opcode: 'spa',
                    blockType: BlockType.COMMAND,
                    text: '设置光源位置，已有光源名[a]，x[x] y[y] z[z]',
                    arguments: {
                        a: {
                            type: ArgumentType.STRING,
                            defaultValue: 'point',
                        },
                        x: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '400',
                        },
                        y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '200',
                        },
                        z: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '300',
                        },
                    },
                },
                {
                    opcode: 'adp',
                    blockType: BlockType.COMMAND,
                    text: '添加光源到场景中，已有光源名[a]',
                    arguments: {
                        a: {
                            type: ArgumentType.STRING,
                            defaultValue: 'point',
                        }

                    },
                },
                {
                    opcode: 'ada',
                    blockType: BlockType.COMMAND,
                    text: '添加环境光到场景中，颜色[a]',
                    arguments: {
                        a: {
                            type: ArgumentType.STRING,
                            defaultValue: '0x444444',
                        }

                    },
                },
                {
                    opcode: 'sc',
                    blockType: BlockType.COMMAND,
                    text: '设置相机位置 x[x] y[y] z[z]',
                    arguments: {
                        x: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '200',
                        },
                        y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '300',
                        },
                        z: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '200',
                        },
                    },
                },
                {
                    opcode: 'cm',
                    blockType: BlockType.COMMAND,
                    text: '相机面向x[x]y[y]z[z]',
                    arguments: {
                        x: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0',
                        },
                        y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0',
                        },
                        z: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0',
                        },
                    },
                },
                {
                    opcode: 'xr',
                    blockType: BlockType.REPORTER,
                    text: '获取渲染图片链接',
                    arguments: {
                      
                    },
                },
                
                // {
                //     opcode: 're',
                //     blockType: BlockType.COMMAND,
                //     text: '渲染至画布，背景颜色[c]',
                //     arguments: {
                //         c: {
                //             type: ArgumentType.NUMBER,
                //             defaultValue: '0',
                //         }
                //     },
                // },
            ],
            menus: {
                z: ['30帧', '60帧'],
                cz:['基础网格材质','Lambert网格材质','高光Phong材质','PBR物理材质'],
                cz2:['颜色','线框(0或1)','透明度(0到1)','开启透明(0或1)'],
                gy:['环境光','点光源','平行光','聚光源'],
                lf:['立方体','球体'],
                m:['8','12','20']
                //cj:['场景中心','图形']
            }
        };
    }
    ad() {

    }
    f({x,y}) {
            temp2['3d-'] = new THREE.Scene();
            var width = x||480; //窗口宽度
            var height = y||360; //窗口高度
            var k = width / height; //窗口宽高比
            var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
            //创建相机对象
            temp2.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
           temp2.renderer = new THREE.WebGLRenderer();
           temp2.renderer.setSize(width, height);
           temp2.renderer.setClearColor(0xb9d3ff, 1);
           temp2['3dcu'] = {};
           temp2['3dma'] = {};
           temp2['3dms'] = {};
           temp2['3dpo'] = {};
             //设置相机方向(指向的场景对象)
    }
    cu(a) {
        try{
            if(a.l!='球体')
            temp2['3dcu'][a.n] = new THREE.BoxGeometry(a.x-0, a.y-0, a.z-0);
            else
            temp2['3dcu'][a.n] = new THREE.SphereGeometry(a.x-0, a.y-0, a.z-0);
        }catch(e){console.log(e);}
        
    }
    d(a) {
        try{
            if(a.l=='8')
            temp2['3dcu'][a.n] = new THREE.OctahedronGeometry(a.a-0);
            if(a.l=='12')
            temp2['3dcu'][a.n] = new THREE.DodecahedronGeometry(a.a-0);
            if(a.l=='20')
            temp2['3dcu'][a.n] = new THREE.IcosahedronGeometry(a.a-0);
        }catch(e){console.log(e);}
        
    }
    yz(a) {
        try{
            temp2['3dcu'][a.n] = new THREE.CylinderGeometry(a.a, a.b, a.c, a.d);
        }catch(e){console.log(e);}
        
    }
    ma(a) {
        if (temp2['3dma'] === undefined) {
            return;
        }
        let cz=['基础网格材质','Lambert网格材质','高光Phong材质','PBR物理材质'],
        cz2=['MeshBasicMaterial','MeshLambertMaterial','MeshPhongMaterial','MeshStandardMaterial'];
        
        temp2['3dma'][a.n] = new THREE[cz2[cz.indexOf(a.t)]]({color:a.c-0});
    }
    setm(a){
        if (!temp2['3d-'])
            return;
        try{
            let cz2=['color','wireframe','opacity','transparent'],
            cz=['颜色','线框(0 or 1)','透明度(0~1)','开启透明(0 or 1)'];
            temp2['3dma'][a.n][cz2[cz.indexOf(a.t)]]=a.c-0;
        }catch(e){console.log(e)}
        
    }
    add(a) {
        if (!temp2['3dms'])
            return;
        try {
            temp2['3dms'][a.n] = new THREE.Mesh(temp2['3dcu'][a.a], temp2['3dma'][a.b]);
            //temp2['3d-'].add()
        } catch (e) {
            console.log(e);
        }
    }
    sxyz(a){
        if (temp2['3dms'] === undefined) {
            return;
        }
        temp2['3dms'][a.a].position.set(a.x-0,a.y-0,a.z-0)
    }
    addm(a){
        if (temp2['3dms'] === undefined) {
            return;
        }
        temp2['3d-'].add(temp2['3dms'][a.n]);
    }
    point(a) {
        if (temp2['3dpo'] === undefined) {
            return;
        }
        let cz=['环境光','点光源','平行光','聚光源'],
        cz2=['AmbientLight','PointLight','DirectionalLight','SpotLight'];
        temp2['3dpo'][a.a] = new THREE[cz2[cz.indexOf(a.g)]](a.b - 0);
        console.log(cz2[cz.indexOf(a.g)],a.b - 0);
    }
    spa(a) {
        try {
            temp2['3dpo'][a.a].position.set(a.x-0,a.y-0,a.z-0)
        } catch (e) {
            console.log(e);
        }
    }
    adp(a) {
        if (!temp2['3d-'])
            return;
        try {
            temp2['3d-'].add(temp2['3dpo'][a.a])
        } catch (e) {
            console.log(e);
        }
    }
    ada(a){
        if (!temp2['3d-'])
            return;
        temp2['3d-'].add(new THREE.AmbientLight(a.a-0));
    }
    sc(a){
        try{
           temp2.camera.position.set(a.x,a.y,a.z);
        }catch(e){console.log(e);}
    }
    // re(a){

    // }
    xr(){
        try{
            temp2.renderer.render(temp2['3d-'],temp2.camera);
            return URL.createObjectURL(dataURLToBlob(temp2.renderer.domElement.toDataURL("image/png")));
        }catch(e){
            try{
                temp2.renderer.render(temp2['3d-'],temp2.camera);
                return URL.createObjectURL(dataURLToBlob(temp2.renderer.domElement.toDataURL("image/png")));
            }catch(e){
                console.log(e);
                return '';
            }
        }
       
    }
    cm(a){
        try{
            temp2.camera.lookAt(new THREE.Vector3(a.x-0,a.y-0,a.z-0));
         }catch(e){console.log(e);}
    }
}

module.exports = Scratch3threeBlocks;
