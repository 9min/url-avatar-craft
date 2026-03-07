const holographicVertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const holographicFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }

  void main() {
    vec3 viewDir = normalize(vViewPosition);
    float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 3.0);

    float hue = fract(vUv.x * 2.0 + vUv.y * 1.5 + uTime * 0.15 + uMouse.x * 0.3);
    vec3 rainbow = hsv2rgb(vec3(hue, 0.7, 1.0));

    float shimmer = sin(vUv.x * 30.0 + uTime * 2.0) * 0.5 + 0.5;
    shimmer *= sin(vUv.y * 20.0 - uTime * 1.5) * 0.5 + 0.5;

    vec3 baseColor = vec3(0.15, 0.15, 0.2);
    vec3 color = mix(baseColor, rainbow, fresnel * 0.8 + shimmer * 0.2);
    color += fresnel * 0.4;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export { holographicVertexShader, holographicFragmentShader };
