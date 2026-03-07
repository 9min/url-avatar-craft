import type { AvatarState } from "../types/avatar";
import type { CardMaterial, CardSerializedState } from "../types/card";
import { deserializeAvatar, serializeAvatar } from "./avatarSerializer";

const MATERIAL_TO_CHAR: Record<CardMaterial, string> = {
	foil: "f",
	neon: "n",
	glass: "g",
	metal: "e",
};

const CHAR_TO_MATERIAL: Record<string, CardMaterial> = {
	f: "foil",
	n: "neon",
	g: "glass",
	e: "metal",
};

const DEFAULT_MATERIAL: CardMaterial = "foil";

/** 카드 상태를 URL 해시 문자열로 직렬화한다. */
function serializeCard(state: {
	material: CardMaterial;
	nickname: string;
	title: string;
	avatar: AvatarState;
}): string {
	const params = new URLSearchParams();
	params.set("m", MATERIAL_TO_CHAR[state.material]);
	params.set("n", state.nickname);
	params.set("t", state.title);
	params.set("av", serializeAvatar(state.avatar));
	return params.toString();
}

/** URL 해시 문자열을 카드 상태로 역직렬화한다. 잘못된 입력 시 기본값을 반환한다. */
function deserializeCard(hash: string): CardSerializedState & { avatarState: AvatarState } {
	const params = new URLSearchParams(hash);

	const materialChar = params.get("m") ?? "";
	const material = CHAR_TO_MATERIAL[materialChar] ?? DEFAULT_MATERIAL;
	const nickname = params.get("n") ?? "";
	const title = params.get("t") ?? "";
	const avatarEncoded = params.get("av") ?? "";
	const avatarState = deserializeAvatar(avatarEncoded);

	return {
		material,
		nickname,
		title,
		avatar: avatarEncoded,
		avatarState,
	};
}

export { serializeCard, deserializeCard };
