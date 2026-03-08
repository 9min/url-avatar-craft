import { describe, expect, it } from "vitest";
import { DEFAULT_AVATAR } from "../constants/avatarParts";
import type { AvatarState } from "../types/avatar";
import { deserializeAvatar, serializeAvatar } from "./avatarSerializer";

describe("avatarSerializer", () => {
	it("기본 아바타 직렬화 시 16개의 0 문자열을 반환한다", () => {
		const result = serializeAvatar(DEFAULT_AVATAR);
		expect(result).toBe("0000000000000000");
		expect(result).toHaveLength(16);
	});

	it("기본 아바타 라운드트립이 동일하다", () => {
		const encoded = serializeAvatar(DEFAULT_AVATAR);
		const decoded = deserializeAvatar(encoded);
		expect(decoded).toEqual(DEFAULT_AVATAR);
	});

	it("커스텀 아바타 라운드트립이 동일하다", () => {
		const custom: AvatarState = {
			skinTone: 3,
			eyes: 11,
			eyebrows: 5,
			nose: 4,
			mouth: 9,
			hairStyle: 19,
			hairColor: 8,
			glasses: 7,
			earrings: 5,
			hat: 2,
			mask: 3,
			top: 11,
			auraEffect: 7,
			heldItem: 5,
			blush: 3,
			pet: 2,
		};
		const encoded = serializeAvatar(custom);
		expect(encoded).toHaveLength(16);
		const decoded = deserializeAvatar(encoded);
		expect(decoded).toEqual(custom);
	});

	it("Base36 범위의 값(10~35)을 올바르게 처리한다", () => {
		const avatar: AvatarState = {
			...DEFAULT_AVATAR,
			eyes: 15, // 'f' in base36
			hairStyle: 25, // 'p' in base36
			top: 16, // 'g' in base36
		};
		const encoded = serializeAvatar(avatar);
		const decoded = deserializeAvatar(encoded);
		expect(decoded).toEqual(avatar);
	});

	it("15문자 구버전 URL (faceShape 포함)은 faceShape 제거 후 복원한다", () => {
		// 구버전: skinTone=0, faceShape=2, eyes=0, ... (모두 0)
		// position 1의 faceShape='2' 제거 → 14자 → "00" 추가 → "0000000000000000" → DEFAULT_AVATAR
		const decoded = deserializeAvatar("020000000000000");
		expect(decoded).toEqual(DEFAULT_AVATAR);
	});

	it("15문자 구버전 URL에서 faceShape 외 값이 보존된다", () => {
		// skinTone=3, faceShape=0(무시), eyes=5, 나머지 0
		const decoded = deserializeAvatar("305000000000000");
		expect(decoded.skinTone).toBe(3);
		expect(decoded.eyes).toBe(5);
		expect(decoded.hairStyle).toBe(0);
		expect(decoded.blush).toBe(0);
		expect(decoded.pet).toBe(0);
	});

	it("14문자 구버전 URL (blush/pet 없음)을 기본값으로 복원한다", () => {
		// 14자 구버전 → blush=0, pet=0으로 복원
		const decoded = deserializeAvatar("00000000000000");
		expect(decoded).toEqual(DEFAULT_AVATAR);
	});

	it("14문자 구버전 URL의 기존 값이 보존된다", () => {
		// skinTone=1, eyes=2, 나머지 0
		const decoded = deserializeAvatar("12000000000000");
		expect(decoded.skinTone).toBe(1);
		expect(decoded.eyes).toBe(2);
		expect(decoded.blush).toBe(0);
		expect(decoded.pet).toBe(0);
	});

	it("잘못된 길이의 문자열은 기본값을 반환한다", () => {
		expect(deserializeAvatar("")).toEqual(DEFAULT_AVATAR);
		expect(deserializeAvatar("000")).toEqual(DEFAULT_AVATAR);
		expect(deserializeAvatar("000000000000000000")).toEqual(DEFAULT_AVATAR); // 18자 (너무 김)
	});

	it("잘못된 문자가 포함된 문자열은 기본값을 반환한다", () => {
		expect(deserializeAvatar("0000000000000000!")).toEqual(DEFAULT_AVATAR);
	});
});
