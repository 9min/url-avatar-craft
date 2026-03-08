import { useCardStore } from "../../../stores/useCardStore";
import { VoxelCharacter } from "./VoxelCharacter";

// 케이스 내 캐릭터 스케일 / 위치
// scale=0.085 기준:
//   발(post-upscale y=-12): -12×0.085 = -1.02 → CHAR_Y=-0.88 → 발 y=-1.9 (받침대 상단)
//   헤어 최상단(post-upscale y=34): 34×0.085=2.89 → 2.89-0.88=2.01 < 케이스 상단 2.5 ✓
const CHAR_SCALE = 0.085;
// 캐릭터 z 중심: 뒤(-3)~앞(+6) → 중심 약 1.5 → 업스케일 후 약 0.13 유닛 앞쪽
// 케이스 중심(z=0)에 맞추기 위해 z를 약간 뒤로 이동
const CHAR_Z = 0;
const CHAR_Y = -0.88;

function CardAvatar() {
	const avatar = useCardStore((s) => s.avatar);
	return <VoxelCharacter avatar={avatar} position={[0, CHAR_Y, CHAR_Z]} scale={CHAR_SCALE} />;
}

export { CardAvatar };
