/**
 * The main engine class.
 */
class Engine {

    /**
    * Create a new engine
    */
    constructor() {
        
    }

    /**
    * Start this engine
    */
    start() {
        this.canvas = GLUtilities.initialize("canvas");

        gl.clearColor(0, 0, 0, 1);
        
        this.loadShader();
        this.shader.use();

        this.createBuffer();

        this.resize();
        this.loop();
    }

    /**
     * Resizes the canvas to fit the window
     */
    resize() {
        if (this.canvas !== undefined) {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }

        gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }

    loop() {
        gl.clear(gl.COLOR_BUFFER_BIT)

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(0);
        gl.drawArrays(gl.TRIANGLES, 0, 3)
        requestAnimationFrame(this.loop.bind(this));
    }

    createBuffer() {
        this.buffer = gl.createBuffer();
        
        let vertices = [
            0, 0, 0,
            0, 0.5, 0,
            0.5, 0.5, 0
        ];

        gl.bindBuffer(gl.ARRAY_BUFFER,  this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, undefined);
        gl.disableVertexAttribArray(0);

    }

    loadShader() {
        let vertexShaderSource = `
        attribute vec3 a_position;
        void main() {
            gl_Position = vec4(a_position, 1.0);
        }`;

        let fragmentShaderSource = `
        
        void main() {
            precision mediump float;
            gl_FragColor = vec4(1.0);
        }`;

        this.shader = new Shader("basic", vertexShaderSource, fragmentShaderSource);
    }

}