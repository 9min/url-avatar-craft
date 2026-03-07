import { describe, expect, it } from "vitest";
import { DEFAULT_AVATAR } from "../constants/avatarParts";
import type { AvatarState } from "../types/avatar";
import { deserializeAvatar, serializeAvatar } from "./avatarSerializer";

describe("avatarSerializer", () => {
	it("기본 아바타 직렬화 시 14개의 0 문자열을 반환한다", () => {
		const result = serializeAvatar(DEFAULT_AVATAR);
		expect(result).toBe("00000000000000");
		expect(result).toHaveLength(14);
	});

	it("기본 아바타 라운드트립이 동일하다", () => {
		const encoded = serializeAvatar(DEFAULT_AVATAR);
		const decoded = deserializeAvatar(encoded);
		expect(decoded).toEqual(DEFAULT_AVATAR);
	});

	it("커스텀 아바타 라운드트립이 동일하다", () => {
		const custom: AvatarState = {
			skinTone: 3,
			faceShape: 2,
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
		};
		const encoded = serializeAvatar(custom);
		expect(encoded).toHaveLength(14);
		const decoded = deserializeAvatar(encoded);
		expect(decoded).toEqual(custom);
	});

	it("Base36 범위의 값(10~35)을 올바르게 처리한다", () => {
		const avatar: AvatarState = {
			...DEFAULT_AVATAR,
			eyes: 11, // 'b' in base36
			hairStyle: 19, // 'j' in base36
			top: 11, // 'b' in base36
		};
		const encoded = serializeAvatar(avatar);
		const decoded = deserializeAvatar(encoded);
		expect(decoded).toEqual(avatar);
	});

	it("잘못된 길이의 문자열은 기본값을 반환한다", () => {
		expect(deserializeAvatar("")).toEqual(DEFAULT_AVATAR);
		expect(deserializeAvatar("000")).toEqual(DEFAULT_AVATAR);
		expect(deserializeAvatar("000000000000000")).toEqual(DEFAULT_AVATAR);
	});

	it("잘못된 문자가 포함된 문자열은 기본값을 반환한다", () => {
		expect(deserializeAvatar("0000000000000!")).toEqual(DEFAULT_AVATAR);
	});
});
