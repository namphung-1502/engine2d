/**
 * The WebGL rendering context.
 */
let gl;
let canvas;

class GLUtilities {
    constructor() {

    }

    /**
    * Initialize WebGL, potentially using canvas with an assigned id matching the provided if it is defined
    */
    static initialize(elementId) {
        if (elementId !== undefined) {
          canvas = document.getElementById(elementId);
          if (canvas === undefined) {
            throw new Error("Can not find canvas element has id " + elementId);
          }
        }
        else {
          canvas = document.createElement("canvas");
          document.body.appendChild(canvas);
        }

        gl = canvas.getContext("webgl2");
  
        if (gl === undefined) {
          throw new Error("Unable to initialize WebGL!");
        }

        return canvas;
    }

}