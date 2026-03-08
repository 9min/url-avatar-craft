import { useEffect, useMemo } from "react";
import * as THREE from "three";
import type { AvatarState } from "../../../types/avatar";
import { buildVoxelCharacter } from "../../../utils/three/voxelData";

// 모듈 레벨 싱글톤 — 재생성 방지
const BOX_GEO = new THREE.BoxGeometry(0.92, 0.92, 0.92);
// 주의: vertexColors: true를 설정하면 geometry에 'color' attribute가 필요한데
// BoxGeometry에는 color attribute가 없어서 vec3(0,0,0) = 검정이 되어
// instanceColor와 곱해져 항상 검정으로 렌더됨.
// vertexColors 없이 MeshBasicMaterial을 사용하면 instanceColor만으로 색상 적용됨.
const VOXEL_MAT = new THREE.MeshBasicMaterial();

interface Props {
	avatar: AvatarState;
	position?: [number, number, number];
	scale?: number;
}

/**
 * 복셀 캐릭터 렌더러 (InstancedMesh)
 * - 1 draw call로 전체 복셀 렌더
 * - instanceColor로 개별 복셀 색상 설정 (vertexColors와 별개)
 */
function VoxelCharacter({ avatar, position = [0, 0, 0], scale = 1 }: Props) {
	const voxels = useMemo(() => buildVoxelCharacter(avatar), [avatar]);

	const instancedMesh = useMemo(() => {
		const count = voxels.length;
		const im = new THREE.InstancedMesh(BOX_GEO, VOXEL_MAT, count);
		const dummy = new THREE.Object3D();
		const color = new THREE.Color();

		for (let i = 0; i < count; i++) {
			const v = voxels[i];
			if (!v) continue;

			dummy.position.set(v.position[0], v.position[1], v.position[2]);
			dummy.updateMatrix();
			im.setMatrixAt(i, dummy.matrix);
			im.setColorAt(i, color.set(v.color));
		}

		im.instanceMatrix.needsUpdate = true;
		if (im.instanceColor) im.instanceColor.needsUpdate = true;
		im.frustumCulled = false;

		return im;
	}, [voxels]);

	useEffect(() => {
		return () => {
			instancedMesh.dispose();
		};
	}, [instancedMesh]);

	return (
		<group position={position} scale={scale}>
			<primitive object={instancedMesh} />
		</group>
	);
}

export { VoxelCharacter };
