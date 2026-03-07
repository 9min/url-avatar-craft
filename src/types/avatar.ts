/** 아바타 파츠 식별자 (0부터 시작하는 인덱스) */
type AvatarPartId = number;

/** 아바타 전체 상태 — 14개 카테고리 */
interface AvatarState {
	skinTone: AvatarPartId;
	faceShape: AvatarPartId;
	eyes: AvatarPartId;
	eyebrows: AvatarPartId;
	nose: AvatarPartId;
	mouth: AvatarPartId;
	hairStyle: AvatarPartId;
	hairColor: AvatarPartId;
	glasses: AvatarPartId;
	earrings: AvatarPartId;
	hat: AvatarPartId;
	mask: AvatarPartId;
	top: AvatarPartId;
	auraEffect: AvatarPartId;
}

/** 아바타 파츠 카테고리 키 */
type AvatarPartCategory = keyof AvatarState;

export type { AvatarPartId, AvatarState, AvatarPartCategory };
