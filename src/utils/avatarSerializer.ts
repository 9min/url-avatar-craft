import { AVATAR_KEYS, DEFAULT_AVATAR } from "../constants/avatarParts";
import type { AvatarState } from "../types/avatar";

const BASE = 36;
const AVATAR_LENGTH = AVATAR_KEYS.length; // 14

/** 아바타 상태를 Base36 14문자 문자열로 직렬화한다. */
function serializeAvatar(avatar: AvatarState): string {
	return AVATAR_KEYS.map((key) => avatar[key].toString(BASE)).join("");
}

/** Base36 14문자 문자열을 아바타 상태로 역직렬화한다. 잘못된 입력 시 기본값을 반환한다. */
function deserializeAvatar(encoded: string): AvatarState {
	if (encoded.length !== AVATAR_LENGTH) {
		return { ...DEFAULT_AVATAR };
	}

	const result = { ...DEFAULT_AVATAR };

	for (let i = 0; i < AVATAR_LENGTH; i++) {
		const char = encoded.charAt(i);
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
