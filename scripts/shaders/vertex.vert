
  // an attribute will receive data from a buffer
  attribute vec2 a_position;
  //attribute vec3 vertColor;

  varying vec3 fragColor;

  uniform vec2 u_resolution;
  uniform vec2 u_translation;
  // all shaders have a main function
  void main() {
    vec2 r=u_resolution/1.0;
    vec2 position=a_position+u_translation;
    vec2 zeroToOne=position/r;
    vec2 zeroToTwo=zeroToOne * 2.0;
    vec2 clipSpace=zeroToTwo - 1.0;
    fragColor=vec3(clipSpace,0);
    gl_Position = vec4(clipSpace * vec2(1,-1),0,1);//a_position;
  }