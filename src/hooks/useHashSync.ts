import { useEffect, useRef } from "react";
import { useCardStore } from "../stores/useCardStore";
import { deserializeCard, serializeCard } from "../utils/cardSerializer";

/** URL 해시와 Zustand 스토어를 양방향 동기화한다. */
function useHashSync(): void {
	const isRestoringRef = useRef(false);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	// 초기 로드: 해시 → 스토어 복원
	useEffect(() => {
		const hash = window.location.hash.slice(1);
		if (!hash) return;

		isRestoringRef.current = true;
		const { material, nickname, title, avatarState } = deserializeCard(hash);
		useCardStore.getState().loadState({ material, nickname, title, avatar: avatarState });

		requestAnimationFrame(() => {
			isRestoringRef.current = false;
		});
	}, []);

	// 스토어 변경 → 해시 업데이트 (300ms 디바운스)
	useEffect(() => {
		const unsubscribe = useCardStore.subscribe((state) => {
			if (isRestoringRef.current) return;

			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}

			timerRef.current = setTimeout(() => {
				const hash = serializeCard({
					material: state.material,
					nickname: state.nickname,
					title: state.title,
					avatar: state.avatar,
				});
				history.replaceState(null, "", `#${hash}`);
			}, 300);
		});

		return () => {
			unsubscribe();
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, []);
}

export { useHashSync };
