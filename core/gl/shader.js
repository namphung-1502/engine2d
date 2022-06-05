class Shader {
    constructor(name, vertexSource, fragmentSource) {
        this.name = name;
        let vertexShader = this.loadShader(vertexSource, gl.VERTEX_SHADER);
        let fragmentShader = this.loadShader(fragmentSource, gl.FRAGMENT_SHADER);

        this.createProgram(vertexShader, fragmentShader);
    }

    getName() {
        return this.name;
    }

    use() {
        gl.useProgram(this.program);
    }


    /**
     * Gets the location of an attribute with the provided name.
     * @param name The name of the attribute whose location to retrieve.
     */
     getAttributeLocation(name) {
        if ( this.attributes[name] === undefined ) {
            throw new Error( `Unable to find attribute named '${name}'` );
        }

        return this.attributes[name];
    }

    loadShader(source, shaderType) {
        let shader = gl.createShader(shaderType);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        let error = gl.getShaderInfoLog(shader);
        if (error !== "") {
            throw new Error("Error compiling shader: " + error);
        }

        return shader;
    }

    createProgram(vertexShader, fragmentShader) {
        this.program = gl.createProgram();
        gl.attachShader(this.program, vertexShader);
        gl.attachShader(this.program, fragmentShader);
        gl.linkProgram(this.program);
        let error = gl.getProgramInfoLog(this.program);
        if (error !== "") {
            throw new Error("Error compiling shader: " + error);
        }
    }

    detectAttributes() {
        let attributeCount = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES);
        for(let i = 0; i < attributeCount; ++i) {
            let attributeInfo = gl.getActiveAttrib(this.program, i);
            if (!attributeInfo) {
                break;
            }

            this.attributes[attributeInfo.name] = gl.getAttribLocation(this.program, attributeInfo.name);
        }
    }
}