import { create } from "zustand";
import { DEFAULT_AVATAR } from "../constants/avatarParts";
import type { AvatarPartCategory, AvatarState } from "../types/avatar";

type CardMaterial = "foil" | "neon" | "glass" | "metal";

interface CardState {
	material: CardMaterial;
	nickname: string;
	title: string;
	stats: Record<string, number>;
	badges: string[];
	particleEffect: string | null;
	avatar: AvatarState;
	setMaterial: (material: CardMaterial) => void;
	setNickname: (nickname: string) => void;
	setTitle: (title: string) => void;
	setStat: (key: string, value: number) => void;
	addBadge: (badge: string) => void;
	removeBadge: (badge: string) => void;
	setParticleEffect: (effect: string | null) => void;
	setAvatarPart: (category: AvatarPartCategory, partId: number) => void;
	resetAvatar: () => void;
	setAvatar: (avatar: AvatarState) => void;
}

export const useCardStore = create<CardState>()((set) => ({
	material: "foil",
	nickname: "",
	title: "",
	stats: {},
	badges: [],
	particleEffect: null,
	avatar: { ...DEFAULT_AVATAR },
	setMaterial: (material) => set({ material }),
	setNickname: (nickname) => set({ nickname }),
	setTitle: (title) => set({ title }),
	setStat: (key, value) => set((state) => ({ stats: { ...state.stats, [key]: value } })),
	addBadge: (badge) => set((state) => ({ badges: [...state.badges, badge] })),
	removeBadge: (badge) => set((state) => ({ badges: state.badges.filter((b) => b !== badge) })),
	setParticleEffect: (effect) => set({ particleEffect: effect }),
	setAvatarPart: (category, partId) =>
		set((state) => ({
			avatar: { ...state.avatar, [category]: partId },
		})),
	resetAvatar: () => set({ avatar: { ...DEFAULT_AVATAR } }),
	setAvatar: (avatar) => set({ avatar }),
}));
