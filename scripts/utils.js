const shaderUrls = [
    '../scripts/shaders/vertex.vert',
    '../scripts/shaders/fragment.frag',
]; 
function loadTextFile(url) {
    return fetch(url).then(response => response.text());
}

async function compileShaders()
{
    const files = await Promise.all(shaderUrls.map(loadTextFile));
    //loop through all if nessacary here
    const vertexShaderSource=files[0];
    const fragmentShaderSource=files[1];

    const vert=gl.createShader(gl.VERTEX_SHADER);
    const frag=gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vert, vertexShaderSource);
    gl.shaderSource(frag, fragmentShaderSource);

    gl.compileShader(vert);
    gl.compileShader(frag);

    let success=gl.getShaderParameter(vert,gl.COMPILE_STATUS);
    if(!success) {throw "could not compile vertex shader"+gl.getShaderInfoLog(vert)};

    success=gl.getShaderParameter(frag,gl.COMPILE_STATUS);
    if(!success) {throw "could not compile frag shader"+gl.getShaderInfoLog(frag)};

    return [vert,frag];
}

  // function createShader(gl,type,source)//passes in gl context window, type of shader, and shader source via text string
  // {
  //     const shader=gl.createShader(type); //creates shader with gl function
  //     gl.shaderSource(shader,source);//passes in the source to gl api
  //     gl.compileShader(shader);//compiles shader
  //     const success=gl.getShaderParameter(shader,gl.COMPILE_STATUS);//success check
  //     if(success) {return shader};
  //     //return shader, if not success:return error
  //     console.log(gl.getShaderInfoLog(shader));
  //     gl.deleteShader(shader);
  // }

function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
      return program;
    }
  
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
  }

function resizeCanvasToDisplaySize(canvas) {
  // Lookup the size the browser is displaying the canvas in CSS pixels.
  const displayWidth  = canvas.clientWidth;
  const displayHeight = canvas.clientHeight;

  // Check if the canvas is not the same size.
  const needResize = canvas.width  !== displayWidth ||
                      canvas.height !== displayHeight;

  if (needResize) {
      // Make the canvas the same size
      canvas.width  = displayWidth;
      canvas.height = displayHeight;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  }
  
  return needResize;
}
