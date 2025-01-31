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

  var positionBuffer=gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
  setGeometry(gl);

  var positionAttributeLocation=gl.getAttribLocation(program,"a_position");
  var resolutionLocation=gl.getUniformLocation(program,"u_resolution");
  var matrixLocation=gl.getUniformLocation(program,"u_matrix");
  var uTimeLocation=gl.getUniformLocation(program,"u_time");
  
  var translate=[250,100];
  var rotation=0;
  var scale=[.75,.75];
  function draw()
  {
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0,0,gl.canvas.width,gl.canvas.height);
    gl.clearColor(0,0,0,0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    let translationMat=matrix3.translation(translate[0],translate[1]);
    let rotationMat=matrix3.rotation((rotation*Math.PI)/180);//in radians
    let scaleMat=matrix3.scaling(scale[0],scale[1]);
    let projectionsMat=matrix3.projection(gl.canvas.clientWidth, gl.canvas.clientHeight);
    let matrix=matrix3.identity();

    matrix=matrix3.multiply(rotationMat,scaleMat);
    matrix=matrix3.multiply(translationMat,matrix);
    matrix=matrix3.multiply(projectionsMat,matrix);

    gl.vertexAttribPointer(positionAttributeLocation,
                          size=2, type=gl.FLOAT,
                          normalize=gl.FALSE,
                          stride=0,
                          off_set=0);
    gl.uniform2f(resolutionLocation,gl.canvas.width,gl.canvas.height);
    gl.uniformMatrix3fv(matrixLocation,false,matrix);
    gl.uniform1f(uTimeLocation,rotation*.03);
    rotation+=.5;
    gl.enableVertexAttribArray(positionAttributeLocation);
      
    let primitiveType=gl.TRIANGLES;
    let offset=0;
    let count=18;
    gl.drawArrays(primitiveType,offset,count);
  }

  function render()
  {
    draw();
    requestAnimationFrame(render);
  }
  render();
}

function setGeometry(gl)
{
  gl.bufferData(gl.ARRAY_BUFFER,
                new Float32Array([
                -250,180,
                250,180,
                0,0]), 
                gl.STATIC_DRAW);
}
var matrix3={
  multiply: function(a, b) {
    var a00 = a[0 * 3 + 0];
    var a01 = a[0 * 3 + 1];
    var a02 = a[0 * 3 + 2];
    var a10 = a[1 * 3 + 0];
    var a11 = a[1 * 3 + 1];
    var a12 = a[1 * 3 + 2];
    var a20 = a[2 * 3 + 0];
    var a21 = a[2 * 3 + 1];
    var a22 = a[2 * 3 + 2];
    var b00 = b[0 * 3 + 0];
    var b01 = b[0 * 3 + 1];
    var b02 = b[0 * 3 + 2];
    var b10 = b[1 * 3 + 0];
    var b11 = b[1 * 3 + 1];
    var b12 = b[1 * 3 + 2];
    var b20 = b[2 * 3 + 0];
    var b21 = b[2 * 3 + 1];
    var b22 = b[2 * 3 + 2];
 
    return [
      b00 * a00 + b01 * a10 + b02 * a20,
      b00 * a01 + b01 * a11 + b02 * a21,
      b00 * a02 + b01 * a12 + b02 * a22,
      b10 * a00 + b11 * a10 + b12 * a20,
      b10 * a01 + b11 * a11 + b12 * a21,
      b10 * a02 + b11 * a12 + b12 * a22,
      b20 * a00 + b21 * a10 + b22 * a20,
      b20 * a01 + b21 * a11 + b22 * a21,
      b20 * a02 + b21 * a12 + b22 * a22,
    ];
  },
  identity: function(){
    return [
      1,0,0,
      0,1,0,
      0,0,1
    ];
  },
  translation: function(tx, ty) {
    return [
      1, 0, 0,
      0, 1, 0,
      tx, ty, 1,
    ];
  },
 
  rotation: function(angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);
    return [
      c,-s, 0,
      s, c, 0,
      0, 0, 1,
    ];
  },
 
  scaling: function(sx, sy) {
    return [
      sx, 0, 0,
      0, sy, 0,
      0, 0, 1,
    ];
  },
  projection: function(width, height) {
    // Note: This matrix flips the Y axis so that 0 is at the top.
    return [
      2 / width, 0, 0,
      0, -2 / height, 0,
      -1, 1, 1
    ];
  }
};