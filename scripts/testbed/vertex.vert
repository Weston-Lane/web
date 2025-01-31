
  attribute vec2 a_position;
  uniform mat3 u_matrix;
  varying vec3 fragColor;
  void main() {

    fragColor=vec3((u_matrix * vec3(a_position,1)).xyz);
    gl_Position = vec4((u_matrix * vec3(a_position,1)).xy,0,1);//a_position;
  }