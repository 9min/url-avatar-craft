const neonVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const neonFragmentShader = /* glsl */ `
  uniform float uTime;

  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec2 vUv;

  void main() {
    vec3 viewDir = normalize(vViewPosition);
    float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 2.5);

    // 베이스: 어두운 인디고 (중앙에서도 보이는 색)
    vec3 baseColor = vec3(0.06, 0.04, 0.18);

    // 시안 + 마젠타 네온 그라데이션
    float pulse = sin(uTime * 1.5) * 0.12 + 0.88;
    vec3 neonCyan    = vec3(0.0, 0.9, 1.0) * pulse;
    vec3 neonMagenta = vec3(0.9, 0.1, 1.0) * pulse;

    float gradPos = vUv.y + sin(uTime * 0.8) * 0.1;
    vec3 neonColor = mix(neonMagenta, neonCyan, gradPos);

    // 중앙에도 최소 20%의 네온 색상 유지
    float blend = fresnel * 0.75 + 0.22;
    vec3 color = mix(baseColor, neonColor, blend);

    // 미세한 스캔라인 효과
    float scanline = sin(vUv.y * 80.0) * 0.025;
    color += scanline;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export { neonVertexShader, neonFragmentShader };
