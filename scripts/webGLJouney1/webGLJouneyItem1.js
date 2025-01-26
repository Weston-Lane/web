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
  
  var positions = [
      // X,   Y                           R,   G,  B
      canvas.width/3, canvas.height/4,  1.0, 1.0, 0.0, //left
    2*canvas.width/3, canvas.height/4,  0.7, 0.0, 1.0, //right
    canvas.width/2, 3*canvas.height/6,  0.1, 1.0, 0.6  //top
  ];
  var translation=[0,0];
  // Create a buffer and put three 2d clip space points in it
  var positionBuffer = gl.createBuffer();

  gl.useProgram(program);
  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
// look up where the vertex data needs to go.//a_position is an attribute position buffer that holds the position data
  var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  var colorAttribLocation=gl.getAttribLocation(program, "vertColor");

  var resolutionLocation=gl.getUniformLocation(program,"u_resolution");
  var translationLocation=gl.getUniformLocation(program,"u_translation");
  
  function draw()
  {
      //loading attributes with data
    //{@link https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/vertexAttribPointer JS doc attrib location}
    gl.vertexAttribPointer(positionAttributeLocation, //derived attribute location
      size=2, //2 components per attribute {x,y}
      type=gl.FLOAT,//element type
      normalize=gl.FALSE, //normalizes the value depending on the type of element
      stride=5*Float32Array.BYTES_PER_ELEMENT,//offset in bytes between start of vetex attributes
      offset=0);//offset in bytesof the first component in the attribute, such as if an array holds pos and color values
    //same but for the other attribute
    gl.vertexAttribPointer(colorAttribLocation,
        size=3, //{R,G,B}
        type=gl.FLOAT,
        normalize=gl.FALSE,
        stride=5*Float32Array.BYTES_PER_ELEMENT,
        offset=2*Float32Array.BYTES_PER_ELEMENT);
      console.log(gl.canvas.width);
    gl.uniform2f(resolutionLocation, gl.canvas.width/2, gl.canvas.height/2);
    gl.uniform2fv(translationLocation,translation);
  
    // Turn on the attributes
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.enableVertexAttribArray(colorAttribLocation);
  
    // code above this line is initialization code.//////////////////////
  
  
    // code below this line is rendering code./////////////////////////
    // Tell WebGL how to convert from clip space to pixels
    resizeCanvasToDisplaySize(canvas);
   
    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);
    // Draw the triangle
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 3;
    gl.drawArrays(primitiveType, offset, count);
    
  }
  function slider()
  {
    const x=document.querySelector('#x');
    x.innerHTML=`
        <input class="slider" id="x-slider" type="range" min="0" max="${canvas.width}" value="${canvas.width/2}">X-pos:</input>
        <div class="value" id="sliderXVal">${canvas.width/2}</div> 
    `;
    const sliderX=x.querySelector('#x-slider');
    const sliderValX= x.querySelector('#sliderXVal');
    sliderX.addEventListener('input', ()=>{
      sliderValX.textContent=sliderX.value;
      translation[0]=sliderX.value-canvas.width/2;
      console.log(translation[0]);
      draw();
    });

    const y=document.querySelector('#y');
    y.innerHTML=`
        <input class="slider" id="y-slider" type="range" min="0" max="${canvas.height}" value="${canvas.height/2}">Y-pos:</input>
        <div class="value" id="sliderYVal">${canvas.height/2}</div> 
    `;
    const sliderY=y.querySelector('#y-slider');
    const sliderValY= y.querySelector('#sliderYVal');
    sliderY.addEventListener('input', ()=>{
      sliderValY.textContent=sliderY.value;
      translation[1]=sliderY.value-canvas.height/2;
      draw(); 
    });
    
  }
  draw();
  slider();
}

function setGeometry(gl) 
{
  gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
          // left column
          0, 0,
          30, 0,
          0, 150,
          0, 150,
          30, 0,
          30, 150,

          // top rung
          30, 0,
          100, 0,
          30, 30,
          30, 30,
          100, 0,
          100, 30,

          // middle rung
          30, 60,
          67, 60,
          30, 90,
          30, 90,
          67, 60,
          67, 90,
      ]),
      gl.STATIC_DRAW);
}