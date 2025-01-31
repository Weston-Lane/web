
precision mediump float;
uniform float u_time;
varying vec3 fragColor;
void main() {
    float freq=10.0;
    float amp=.2;

    float r=sin(fragColor.x+u_time);
    float g=sin(fragColor.y+u_time);
    float b=sin(fragColor.z+u_time);
    gl_FragColor = vec4(r,g,b,1.0);
}