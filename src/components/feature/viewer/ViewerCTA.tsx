function ViewerCTA() {
	const handleCreate = () => {
		// 해시는 유지하되 ?view 쿼리 파라미터를 제거
		const url = `${window.location.origin}${window.location.pathname}${window.location.hash}`;
		window.location.href = url;
	};

	return (
		<div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end pb-10">
			<div className="pointer-events-auto flex flex-col items-center gap-3">
				<p className="text-sm text-gray-400">이 카드는 HoloID로 만들었습니다</p>
				<button
					type="button"
					onClick={handleCreate}
					className="rounded-xl bg-violet-600 px-8 py-3 text-base font-bold text-white shadow-lg shadow-violet-900/50 transition-colors hover:bg-violet-500"
				>
					✨ 나도 만들기
				</button>
			</div>
		</div>
	);
}

export { ViewerCTA };
