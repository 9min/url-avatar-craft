import { MaterialSelector } from "./MaterialSelector";
import { ShareButton } from "./ShareButton";
import { TextInputGroup } from "./TextInputGroup";

function EditorPanel() {
	return (
		<div className="flex flex-col gap-6 p-6">
			<h2 className="text-lg font-bold text-white">카드 편집</h2>
			<section>
				<h3 className="mb-3 text-sm font-medium text-gray-400">재질</h3>
				<MaterialSelector />
			</section>
			<section>
				<h3 className="mb-3 text-sm font-medium text-gray-400">텍스트</h3>
				<TextInputGroup />
			</section>
			<ShareButton />
		</div>
	);
}

export { EditorPanel };
