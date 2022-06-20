const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const Clone = require('../../util/clone');
const Color = require('../../util/color');
const formatMessage = require('format-message');
const MathUtil = require('../../util/math-util');
const RenderedTarget = require('../../sprites/rendered-target');
const log = require('../../util/log');
const StageLayering = require('../../engine/stage-layering');

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii00NTkgMjYxIDQwIDQwIj48cGF0aCBkPSJNLTQ0NC40IDI5MC41bC0zLjYtMy42cy0xLjEgMS40LTMuOC44bC0zLjQgOS41Yy0uMS4zLjIuNi41LjVsOS41LTMuNGMtLjYtMi43LjgtMy44LjgtMy44eiIgZmlsbD0iI2Y3YzY3ZiIgc3Ryb2tlPSIjNTc1ZTc1IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiLz48cGF0aCBkPSJNLTQ0MS45IDI5MC40bDE5LjUtMjIuMXMxLjMtMS42LS4yLTMuMWMtMS42LTEuNS0zLjEtLjItMy4xLS4ybC0yMi4xIDE5LjUtLjIgMi41IDEuOCAxLjggMS44IDEuOCAyLjUtLjJ6IiBmaWxsPSIjZjQ2ZDM4IiBzdHJva2U9IiM1NzVlNzUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzU3NWU3NSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik0tNDU1LjEgMjk3LjZsMy44LTMuOCIvPjxwYXRoIGZpbGw9IiM5NWQ4ZDYiIHN0cm9rZT0iIzU3NWU3NSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik0tNDQ2LjUgMjgzLjFsNS44IDUuOCAyLjktMy4yLTUuNC01LjR6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjNTc1ZTc1IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik0tNDQzLjYgMjg2bC0yLjktMi45LTEuMyAxLjItLjMgMi42IDMuNyAzLjYgMi41LS4xIDEuMi0xLjV6Ii8+PHBhdGggZD0iTS00NDQuOCAyOTAuMmwyLjYtLjIgMTkuNC0yMnMuOC0xLjEuMS0yLjFsLTMwLjkgMzAuOCA3LjgtMi43Yy0uNC0yLjIuNi0zLjUgMS0zLjh6IiBvcGFjaXR5PSIuMiIgZmlsbD0iIzM1MzUzNSIvPjwvc3ZnPg==';

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
class Scratch3lvideoBlocks {
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
            id: 'lvedio',
            name: 'lvedio',
            blockIconURI: blockIconURI,
            blocks: [{ }   
            ],
            menus: {
                
            }
        };
    }

}

module.exports = Scratch3lvideoBlocks;
