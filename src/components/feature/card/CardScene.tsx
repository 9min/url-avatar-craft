import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useCardStore } from "../../../stores/useCardStore";
import { CaptureHelper } from "./CaptureHelper";
import { CardAvatar } from "./CardAvatar";
import { CardParticles } from "./CardParticles";
import { CardText } from "./CardText";
import { FigureCase } from "./FigureCase";

/**
 * 피규어 케이스 씬
 *
 * 구성:
 *   - FigureCase: 홀로그램 와이어프레임 케이스 + 받침대
 *   - CardAvatar: 3D 복셀 캐릭터 (케이스 내부)
 *   - CardText: 받침대 네임플레이트
 *   - CardParticles: 배경 파티클 이펙트 (auraEffect)
 *   - OrbitControls: 드래그로 360도 회전, 줌 가능
 */
function CardScene() {
	const autoRotate = useCardStore((s) => s.autoRotate);
	const controlsRef = useRef<OrbitControlsImpl>(null);

	// 정면고정 클릭 시 카메라를 초기 정면 위치로 리셋
	useEffect(() => {
		if (!autoRotate && controlsRef.current) {
			controlsRef.current.reset();
		}
	}, [autoRotate]);

	return (
		<Canvas camera={{ position: [0, 0, 7], fov: 45 }} gl={{ preserveDrawingBuffer: true }}>
			<ambientLight intensity={0.8} />
			<directionalLight position={[5, 8, 5]} intensity={1.2} />
			<directionalLight position={[-4, -2, 3]} intensity={0.4} />
			<Environment preset="city" />

			{/* 파티클은 월드 공간에 배치 (케이스 회전 영향 없음) */}
			<CardParticles />

			{/* 피규어 케이스 (와이어프레임 + 받침대) */}
			<FigureCase />

			{/* 복셀 캐릭터 (케이스 내부) — 불투명 오브젝트는 투명 케이스보다 먼저 렌더 */}
			<CardAvatar />

			{/* 받침대 네임플레이트 */}
			<CardText />

			{/* 드래그 회전 + 줌 (OrbitControls) */}
			<OrbitControls
				ref={controlsRef}
				enablePan={false}
				enableZoom={true}
				minDistance={4}
				maxDistance={12}
				autoRotate={autoRotate}
				autoRotateSpeed={0.6}
				maxPolarAngle={Math.PI * 0.72}
				minPolarAngle={Math.PI * 0.28}
			/>

			<CaptureHelper />
		</Canvas>
	);
}

export { CardScene };
