import { RoundedBox } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { useCardStore } from "../../../stores/useCardStore";

// ── 케이스 치수 (월드 유닛) ──────────────────────────────────────
const CASE_W = 3.3; // 케이스 너비
const CASE_H = 4.4; // 케이스 높이 (투명 박스 부분)
const CASE_D = 1.6; // 케이스 깊이
const CASE_CY = 0.3; // 케이스 중심 Y (y=-1.9 ~ y=2.5)

const PED_H = 0.5; // 받침대 높이
const PED_D = CASE_D + 0.2; // 받침대 깊이 (케이스보다 약간 넓게)
// 받침대 중심 Y = 케이스 하단 - PED_H/2
const PED_Y = CASE_CY - CASE_H / 2 - PED_H / 2; // ≈ -2.15

// 재질별 엣지 색상
const EDGE_COLORS: Record<string, THREE.ColorRepresentation> = {
	foil: 0xbb99ff,
	neon: 0x00ffcc,
	glass: 0x88ccff,
	metal: 0xccccdd,
};

/**
 * 피규어 케이스: 홀로그램 와이어프레임 + 미세 유리 앞면 + 받침대
 *
 * 치수 설계:
 *   - 케이스(투명) : y = -1.9 ~ +2.5 (높이 4.4)
 *   - 받침대       : y ≈ -2.15 중심 (높이 0.5)
 *   - 전체 높이    : ≈ 5 (기존 카드와 동일)
 */
function FigureCase() {
	const material = useCardStore((s) => s.material);

	// ── 케이스 와이어프레임 + 앞면 유리 패널 ─────────────────────
	const { edgeLines, frontPanel } = useMemo(() => {
		const boxGeo = new THREE.BoxGeometry(CASE_W, CASE_H, CASE_D);
		const edgesGeo = new THREE.EdgesGeometry(boxGeo);
		boxGeo.dispose();

		const edgeColor = EDGE_COLORS[material] ?? 0x88ccff;
		const edgeMat = new THREE.LineBasicMaterial({
			color: edgeColor,
			transparent: true,
			opacity: 0.9,
		});
		const edgeLines = new THREE.LineSegments(edgesGeo, edgeMat);

		// 앞면 패널 — 매우 낮은 불투명도로 유리 느낌만 표현
		const glassMat = new THREE.MeshPhysicalMaterial({
			color: 0x99bbff,
			transparent: true,
			opacity: 0.07,
			roughness: 0.02,
			depthWrite: false,
		});
		const frontPanel = new THREE.Mesh(new THREE.PlaneGeometry(CASE_W, CASE_H), glassMat);
		frontPanel.position.set(0, 0, CASE_D / 2 + 0.01);

		return { edgeLines, frontPanel };
	}, [material]);

	// 이전 Three.js 오브젝트 정리
	useEffect(() => {
		return () => {
			edgeLines.geometry.dispose();
			(edgeLines.material as THREE.Material).dispose();
			frontPanel.geometry.dispose();
			(frontPanel.material as THREE.Material).dispose();
		};
	}, [edgeLines, frontPanel]);

	return (
		<group>
			{/* 케이스 와이어프레임 + 앞면 유리 */}
			<group position={[0, CASE_CY, 0]}>
				<primitive object={edgeLines} />
				<primitive object={frontPanel} />
			</group>

			{/* 받침대 (카드 재질과 동일한 다크 메탈) */}
			<RoundedBox args={[CASE_W + 0.2, PED_H, PED_D]} radius={0.04} position={[0, PED_Y, 0]}>
				<meshStandardMaterial
					color={0x0d0d1f}
					metalness={0.85}
					roughness={0.2}
					emissive={EDGE_COLORS[material] ?? 0x88ccff}
					emissiveIntensity={0.08}
				/>
			</RoundedBox>
		</group>
	);
}

// 외부에서 필요한 상수 export (CardAvatar, CardText 위치 계산용)
export const FIGURE_CASE = {
	PED_Y,
	PED_D,
	CASE_D,
} as const;

export { FigureCase };
