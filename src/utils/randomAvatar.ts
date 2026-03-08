import { AVATAR_CATEGORIES, DEFAULT_AVATAR } from "../constants/avatarParts";
import type { AvatarState } from "../types/avatar";

/** 각 카테고리에서 랜덤 옵션을 선택하여 아바타 상태를 생성한다. */
function generateRandomAvatar(): AvatarState {
	const result = { ...DEFAULT_AVATAR };

	for (const category of AVATAR_CATEGORIES) {
		const maxId = category.options.length;
		const randomId = Math.floor(Math.random() * maxId);
		(result as Record<string, number>)[category.key] = randomId;
	}

	return result;
}

export { generateRandomAvatar };
