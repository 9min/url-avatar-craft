import { CardScene } from "../feature/card/CardScene";
import { EditorPanel } from "../feature/editor/EditorPanel";

function MainLayout() {
	return (
		<div className="flex min-h-screen flex-col bg-gray-950 lg:flex-row">
			<div className="h-[60vh] w-full lg:h-screen lg:w-3/5">
				<CardScene />
			</div>
			<div className="w-full overflow-y-auto border-t border-gray-800 lg:w-2/5 lg:border-l lg:border-t-0">
				<EditorPanel />
			</div>
		</div>
	);
}

export { MainLayout };
