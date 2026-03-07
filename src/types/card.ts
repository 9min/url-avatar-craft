/** 카드 재질 타입 */
type CardMaterial = "foil" | "neon" | "glass" | "metal";

/** URL 직렬화 대상 카드 상태 */
interface CardSerializedState {
	material: CardMaterial;
	nickname: string;
	title: string;
	avatar: string;
}

export type { CardMaterial, CardSerializedState };
