import { useCardStore } from "../../stores/useCardStore";
import { CardScene } from "../feature/card/CardScene";
import { EditorPanel } from "../feature/editor/EditorPanel";
import { ViewerCTA } from "../feature/viewer/ViewerCTA";

const isViewerMode = new URLSearchParams(window.location.search).has("view");

function RotateToggle() {
	const autoRotate = useCardStore((s) => s.autoRotate);
	const setAutoRotate = useCardStore((s) => s.setAutoRotate);

	return (
		<div className="absolute left-3 top-3 z-10 flex overflow-hidden rounded-lg border border-gray-700 text-xs font-medium shadow-lg">
			<button
				type="button"
				onClick={() => setAutoRotate(false)}
				className={`px-3 py-1.5 transition-colors ${
					!autoRotate
						? "bg-violet-600 text-white"
						: "bg-gray-900/80 text-gray-400 hover:text-gray-200"
				}`}
			>
				정면고정
			</button>
			<button
				type="button"
				onClick={() => setAutoRotate(true)}
				className={`px-3 py-1.5 transition-colors ${
					autoRotate
						? "bg-violet-600 text-white"
						: "bg-gray-900/80 text-gray-400 hover:text-gray-200"
				}`}
			>
				자동회전
			</button>
		</div>
	);
}

function MainLayout() {
	if (isViewerMode) {
		return (
			<div className="relative flex min-h-screen items-center justify-center bg-gray-950">
				<div className="h-screen w-full max-w-2xl">
					<CardScene />
				</div>
				<ViewerCTA />
			</div>
		);
	}

	return (
		<div className="flex min-h-screen flex-col bg-gray-950 lg:flex-row">
			<div className="relative h-[50vh] w-full lg:h-screen lg:w-3/5">
				<RotateToggle />
				<CardScene />
			</div>
			<div className="flex h-[50vh] w-full flex-col overflow-hidden border-t border-gray-800 lg:h-screen lg:w-2/5 lg:border-l lg:border-t-0">
				<EditorPanel />
			</div>
		</div>
	);
}

export { MainLayout };
