import { AVATAR_KEYS, DEFAULT_AVATAR } from "../constants/avatarParts";
import type { AvatarState } from "../types/avatar";

const BASE = 36;
const AVATAR_LENGTH = AVATAR_KEYS.length; // 16

/** 아바타 상태를 Base36 16문자 문자열로 직렬화한다. */
function serializeAvatar(avatar: AvatarState): string {
	return AVATAR_KEYS.map((key) => avatar[key].toString(BASE)).join("");
}

/**
 * Base36 문자열을 아바타 상태로 역직렬화한다.
 *
 * 하위 호환:
 *   - 16문자: 현재 형식
 *   - 14문자 구버전 (blush/pet 없음): 끝에 "00" 추가
 *   - 15문자 최구버전 (faceShape 포함): position 1의 faceShape 제거 → 14문자 → "00" 추가
 *   - 잘못된 입력 시 기본값을 반환한다.
 */
function deserializeAvatar(encoded: string): AvatarState {
	let normalized = encoded;

	// 15문자 최구버전 URL (faceShape 포함): position 1의 faceShape 문자 제거
	if (normalized.length === 15) {
		normalized = normalized[0] + normalized.slice(2);
	}

	// 14문자 구버전 URL (blush/pet 없음): 끝에 "00" 추가
	if (normalized.length === 14) {
		normalized = `${normalized}00`;
	}

	if (normalized.length !== AVATAR_LENGTH) {
		return { ...DEFAULT_AVATAR };
	}

	const result = { ...DEFAULT_AVATAR };

	for (let i = 0; i < AVATAR_LENGTH; i++) {
		const char = normalized.charAt(i);
		const key = AVATAR_KEYS[i];
		if (!key) {
			return { ...DEFAULT_AVATAR };
		}
		const parsed = Number.parseInt(char, BASE);
		if (Number.isNaN(parsed)) {
			return { ...DEFAULT_AVATAR };
		}
		result[key] = parsed;
	}

	return result;
}

export { serializeAvatar, deserializeAvatar };
