import { useState } from "react";
import { Tabs } from "../../ui/Tabs";
import { AvatarEditor } from "./AvatarEditor";
import { DownloadButton } from "./DownloadButton";
import { MaterialSelector } from "./MaterialSelector";
import { ShareButton } from "./ShareButton";
import { TextInputGroup } from "./TextInputGroup";

const TABS = [
	{ key: "avatar", label: "아바타" },
	{ key: "material", label: "재질" },
	{ key: "info", label: "기본정보" },
];

function EditorPanel() {
	const [activeTab, setActiveTab] = useState("avatar");

	return (
		<div className="flex h-full flex-col">
			{/* 패널 헤더 */}
			<div className="flex-shrink-0 px-5 pt-4 pb-3">
				<h2 className="text-sm font-semibold tracking-widest text-violet-400 uppercase">
					아바타 편집
				</h2>
			</div>

			{/* 탭 */}
			<div className="flex-shrink-0">
				<Tabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
			</div>

			{/* 탭 콘텐츠 (스크롤 영역) */}
			<div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 pb-6">
				{activeTab === "material" && (
					<div className="pt-4">
						<MaterialSelector />
					</div>
				)}
				{activeTab === "avatar" && <AvatarEditor />}
				{activeTab === "info" && (
					<div className="flex flex-col gap-4 pt-4">
						<TextInputGroup />
						<ShareButton />
						<DownloadButton />
					</div>
				)}
			</div>
		</div>
	);
}

export { EditorPanel };
