const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');

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
class Scratch3setBlocks {
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
            id: 'set',
            name: 'set',
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'f',
                    blockType: BlockType.COMMAND,
                    text: '设置帧率[a]',
                    arguments: {
                        a: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '30帧',
                            menu:'z'
                        },
                    },
                },
                // {
                //     opcode: 'return',
                //     blockType: BlockType.COMMAND,
                //     text: '返回[a]',
                //     arguments: {
                //         a: {
                //             type: ArgumentType.STRING,
                //             defaultValue: '1',
                //         },
                //     }
                // }
            ],
            menus: {
              z:['30帧','60帧']
            }
        };
    }
   f(a){
       //console.log(this.runtime)
       let zz;
       if(a.a=='30帧')
        zz=1;
       else
        zz=0;
       this.runtime.setCompatibilityMode(zz);
       //console.log(this.runtime,this);
   }
   return(a,util){
       console.log(util)
    util.stopThisScript();
   }
   
}

module.exports = Scratch3setBlocks;
