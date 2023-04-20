export default /* glsl */ `uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform sampler2D u_helmet_texture;

varying vec2 vUv;

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  float pct = 1.0 - distance(st, u_mouse);
  
  vec4 heatmap = vec4(pct*2.0, 0.1, 0.1, 0.7);
  vec4 helmet = texture2D(u_helmet_texture, vUv);
  
  vec4 color = mix(heatmap, helmet, .60);
  
  gl_FragColor = color;
}`;
