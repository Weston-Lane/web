
  attribute vec2 a_position;

  varying vec3 fragColor;

  uniform vec2 u_resolution;
  uniform vec2 u_translation;
  uniform vec2 u_rotation;
  uniform vec2 u_scale;
  // all shaders have a main function
  void main() {
    vec2 scaledPosition=a_position*u_scale;
    vec2 rotatedPosition = vec2(
     scaledPosition.x * u_rotation.y + scaledPosition.y * u_rotation.x,
     scaledPosition.y * u_rotation.y - scaledPosition.x * u_rotation.x);
    vec2 r=u_resolution/1.0;
    vec2 position=rotatedPosition+u_translation;
    vec2 zeroToOne=position/r;
    vec2 zeroToTwo=zeroToOne * 2.0;
    vec2 clipSpace=zeroToTwo - 1.0;
    fragColor=vec3(clipSpace,0);
    gl_Position = vec4(clipSpace * vec2(1,-1),0,1);//a_position;
  }