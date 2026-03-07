import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import type { Mesh, ShaderMaterial } from "three";
import { useCardStore } from "../../../stores/useCardStore";
import { createCardMaterial } from "../../../utils/three/cardMaterials";

function CardMesh() {
	const material = useCardStore((s) => s.material);
	const meshRef = useRef<Mesh>(null);

	const threeMaterial = useMemo(() => createCardMaterial(material), [material]);

	// 이전 머티리얼 정리
	useEffect(() => {
		return () => {
			threeMaterial.dispose();
		};
	}, [threeMaterial]);

	// ShaderMaterial 계열의 uTime 업데이트 (foil, neon)
	useFrame((_state, delta) => {
		if ((material === "foil" || material === "neon") && meshRef.current) {
			const mat = meshRef.current.material as ShaderMaterial;
			if (mat.uniforms?.uTime) {
				mat.uniforms.uTime.value += delta;
			}
		}
	});

	return <RoundedBox ref={meshRef} args={[3.5, 5, 0.05]} radius={0.15} material={threeMaterial} />;
}

export { CardMesh };
