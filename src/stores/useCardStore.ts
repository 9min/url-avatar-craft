import { create } from "zustand";
import { DEFAULT_AVATAR } from "../constants/avatarParts";
import type { AvatarPartCategory, AvatarState } from "../types/avatar";
import type { CardMaterial } from "../types/card";

interface CardState {
	material: CardMaterial;
	nickname: string;
	title: string;
	particleEffect: string | null;
	avatar: AvatarState;
	isFlipped: boolean;
	captureRequested: boolean;
	autoRandom: boolean;
	autoRotate: boolean;
	setMaterial: (material: CardMaterial) => void;
	setNickname: (nickname: string) => void;
	setTitle: (title: string) => void;
	setParticleEffect: (effect: string | null) => void;
	setAvatarPart: (category: AvatarPartCategory, partId: number) => void;
	resetAvatar: () => void;
	setAvatar: (avatar: AvatarState) => void;
	stopAutoRandom: () => void;
	startAutoRandom: () => void;
	setAutoRotate: (value: boolean) => void;
	toggleFlip: () => void;
	requestCapture: () => void;
	clearCaptureRequest: () => void;
	loadState: (
		state: Partial<Pick<CardState, "material" | "nickname" | "title" | "avatar">>,
	) => void;
}

export const useCardStore = create<CardState>()((set) => ({
	material: "foil",
	nickname: "",
	title: "",
	particleEffect: null,
	avatar: { ...DEFAULT_AVATAR },
	isFlipped: false,
	captureRequested: false,
	// URL 해시나 쿼리 파라미터가 없을 때만 자동 랜덤 활성화
	autoRandom: !window.location.hash && !window.location.search,
	autoRotate: true,
	setMaterial: (material) => set({ material }),
	setNickname: (nickname) => set({ nickname }),
	setTitle: (title) => set({ title }),
	setParticleEffect: (effect) => set({ particleEffect: effect }),
	setAvatarPart: (category, partId) =>
		set((state) => ({
			avatar: { ...state.avatar, [category]: partId },
		})),
	resetAvatar: () => set({ avatar: { ...DEFAULT_AVATAR } }),
	setAvatar: (avatar) => set({ avatar }),
	stopAutoRandom: () => set({ autoRandom: false }),
	startAutoRandom: () => set({ autoRandom: true }),
	setAutoRotate: (value) => set({ autoRotate: value }),
	toggleFlip: () => set((state) => ({ isFlipped: !state.isFlipped })),
	requestCapture: () => set({ captureRequested: true }),
	clearCaptureRequest: () => set({ captureRequested: false }),
	loadState: (partial) => set(partial),
}));
