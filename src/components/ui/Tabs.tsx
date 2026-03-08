import { clsx } from "clsx";

interface Tab {
	key: string;
	label: string;
}

interface TabsProps {
	tabs: Tab[];
	activeTab: string;
	onTabChange: (key: string) => void;
}

function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
	return (
		<div className="flex border-b border-gray-700/80">
			{tabs.map((tab) => (
				<button
					key={tab.key}
					type="button"
					onClick={() => onTabChange(tab.key)}
					className={clsx(
						"flex-1 cursor-pointer px-2 py-3 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-inset",
						activeTab === tab.key
							? "border-b-2 border-violet-500 bg-violet-500/10 text-violet-300"
							: "text-gray-400 hover:bg-gray-800/40 hover:text-gray-200",
					)}
				>
					{tab.label}
				</button>
			))}
		</div>
	);
}

export { Tabs };
export type { Tab };
