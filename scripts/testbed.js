var canvas=document.querySelector('#c');
var gl=canvas.getContext("webgl");

async function main() 
{//loads shaders from a .vert or .frag file, not very efficient, will probably just use an html element in the future
  ////////////////////////LOADING SHADERS FROM ANOTHER FILE////////////////////////////////////
  const shaders= await compileShaders();
  const vert=shaders[0];
  const frag=shaders[1];
  var program = createProgram(gl, vert, frag);
///////////////////////////////////////////////////////////////////////
  
  gl.useProgram(program);

  function draw()
  {
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0,0,gl.canvas.width,gl.canvas.height);
    
  }
}