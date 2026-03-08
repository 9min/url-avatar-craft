import { useEffect } from "react";
import { useCardStore } from "../stores/useCardStore";
import { generateRandomAvatar } from "../utils/randomAvatar";

/** autoRandom이 true인 동안 1초마다 랜덤 아바타를 적용한다. */
function useAutoRandom(): void {
	const autoRandom = useCardStore((s) => s.autoRandom);
	const setAvatar = useCardStore((s) => s.setAvatar);

	useEffect(() => {
		if (!autoRandom) return;

		const id = setInterval(() => {
			setAvatar(generateRandomAvatar());
		}, 1000);

		return () => clearInterval(id);
	}, [autoRandom, setAvatar]);
}

export { useAutoRandom };
