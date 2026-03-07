import { describe, expect, it } from "vitest";
import { DEFAULT_AVATAR } from "../constants/avatarParts";
import { deserializeCard, serializeCard } from "./cardSerializer";

describe("cardSerializer", () => {
	it("라운드트립: 직렬화 후 역직렬화하면 원래 상태를 복원한다", () => {
		const state = {
			material: "neon" as const,
			nickname: "테스터",
			title: "개발자",
			avatar: { ...DEFAULT_AVATAR, eyes: 3, hairStyle: 5 },
		};

		const hash = serializeCard(state);
		const restored = deserializeCard(hash);

		expect(restored.material).toBe("neon");
		expect(restored.nickname).toBe("테스터");
		expect(restored.title).toBe("개발자");
		expect(restored.avatarState.eyes).toBe(3);
		expect(restored.avatarState.hairStyle).toBe(5);
	});

	it("빈 텍스트를 올바르게 처리한다", () => {
		const state = {
			material: "foil" as const,
			nickname: "",
			title: "",
			avatar: { ...DEFAULT_AVATAR },
		};

		const hash = serializeCard(state);
		const restored = deserializeCard(hash);

		expect(restored.nickname).toBe("");
		expect(restored.title).toBe("");
	});

	it("한글 인코딩을 올바르게 처리한다", () => {
		const state = {
			material: "glass" as const,
			nickname: "홀로그램마스터",
			title: "빛나는 존재",
			avatar: { ...DEFAULT_AVATAR },
		};

		const hash = serializeCard(state);
		const restored = deserializeCard(hash);

		expect(restored.nickname).toBe("홀로그램마스터");
		expect(restored.title).toBe("빛나는 존재");
	});

	it("잘못된 해시 입력 시 기본값을 반환한다", () => {
		const restored = deserializeCard("invalid=data");

		expect(restored.material).toBe("foil");
		expect(restored.nickname).toBe("");
		expect(restored.title).toBe("");
	});

	it("모든 재질 타입을 올바르게 매핑한다", () => {
		const materials = ["foil", "neon", "glass", "metal"] as const;

		for (const material of materials) {
			const hash = serializeCard({
				material,
				nickname: "",
				title: "",
				avatar: { ...DEFAULT_AVATAR },
			});
			const restored = deserializeCard(hash);
			expect(restored.material).toBe(material);
		}
	});
});
