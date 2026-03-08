import { useState } from "react";
import { AVATAR_CATEGORIES, DEFAULT_AVATAR } from "../../../constants/avatarParts";
import { useCardStore } from "../../../stores/useCardStore";
import { generateRandomAvatar } from "../../../utils/randomAvatar";
import { Button } from "../../ui/Button";

const SKIN_TONE_COLORS = [
	"#FFDBB0",
	"#FFCC8E",
	"#E8B87A",
	"#D4A76A",
	"#C19A6B",
	"#A0714F",
	"#7B4E2D",
	"#4B2C1A",
];

const HAIR_COLORS = [
	"#1A1A1A",
	"#5C3317",
	"#D4B254",
	"#CC2222",
	"#FF69B4",
	"#2255CC",
	"#7B2FBE",
	"#22AA44",
	"#CCCCCC",
	"#EEEEEE",
	"#FF6600",
	"#FF88CC",
	"#00CCCC",
	"#BB99EE",
	"#99DD00",
	"#1133BB",
	"#885500",
	"#DD1177",
];

const COLOR_KEYS = new Set(["skinTone", "hairColor"]);

const GROUP_ORDER = ["얼굴 기본", "헤어", "악세사리", "의상", "이펙트"];

/** 그룹별 아이콘 (SVG path) */
const GROUP_ICONS: Record<string, string> = {
	"얼굴 기본":
		"M12 2a5 5 0 110 10A5 5 0 0112 2zm0 12c-5.33 0-8 2.67-8 4v1h16v-1c0-1.33-2.67-4-8-4z",
	헤어: "M12 3C8.5 3 5 5.5 5 9c0 2 .8 3.7 2 5l1 1v3h8v-3l1-1c1.2-1.3 2-3 2-5 0-3.5-3.5-6-7-6zM9 18h6v1H9v-1z",
	악세사리: "M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 5.8 21.3l2.4-7.4L2 9.4h7.6L12 2z",
	의상: "M20.5 6l-2.5-3h-12l-2.5 3-1.5 6h4v7h12v-7h4l-1.5-6zM12 17l-3-3h6l-3 3z",
	이펙트:
		"M12 2L9.1 9.1 2 12l7.1 2.9L12 22l2.9-7.1L22 12l-7.1-2.9L12 2zm0 4.8l1.8 4.4 4.4 1.8-4.4 1.8-1.8 4.4-1.8-4.4-4.4-1.8 4.4-1.8L12 6.8z",
};

function GroupIcon({ group }: { group: string }) {
	const path = GROUP_ICONS[group];
	if (!path) return null;
	return (
		<svg
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="currentColor"
			className="flex-shrink-0 text-violet-400"
			aria-hidden="true"
		>
			<path d={path} />
		</svg>
	);
}

function ChevronIcon({ open }: { open: boolean }) {
	return (
		<svg
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={`flex-shrink-0 text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
			aria-hidden="true"
		>
			<polyline points="6 9 12 15 18 9" />
		</svg>
	);
}

function CheckIcon() {
	return (
		<svg
			width="12"
			height="12"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="3"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="text-white drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]"
			aria-hidden="true"
		>
			<polyline points="20 6 9 17 4 12" />
		</svg>
	);
}

function AvatarEditor() {
	const avatar = useCardStore((s) => s.avatar);
	const setAvatarPart = useCardStore((s) => s.setAvatarPart);
	const setAvatar = useCardStore((s) => s.setAvatar);
	const stopAutoRandom = useCardStore((s) => s.stopAutoRandom);
	const startAutoRandom = useCardStore((s) => s.startAutoRandom);
	const autoRandom = useCardStore((s) => s.autoRandom);

	// 모든 그룹 기본 펼침
	const [openGroups, setOpenGroups] = useState<Set<string>>(new Set(GROUP_ORDER));

	const toggleGroup = (group: string) => {
		setOpenGroups((prev) => {
			const next = new Set(prev);
			if (next.has(group)) next.delete(group);
			else next.add(group);
			return next;
		});
	};

	const handleRandom = () => {
		stopAutoRandom();
		setAvatar(generateRandomAvatar());
	};

	const handleToggleAutoRandom = () => {
		if (autoRandom) {
			stopAutoRandom();
		} else {
			startAutoRandom();
		}
	};

	const handleReset = () => {
		stopAutoRandom();
		setAvatar({ ...DEFAULT_AVATAR });
	};

	const handleSetAvatarPart = (category: Parameters<typeof setAvatarPart>[0], partId: number) => {
		stopAutoRandom();
		setAvatarPart(category, partId);
	};

	const grouped = GROUP_ORDER.map((group) => ({
		group,
		categories: AVATAR_CATEGORIES.filter((c) => c.group === group),
	}));

	return (
		<div className="flex flex-col gap-2 pt-2">
			{/* 액션 버튼 영역 */}
			<div className="flex gap-2">
				{/* 초기화 */}
				<Button
					variant="secondary"
					onClick={handleReset}
					className="flex min-h-[44px] flex-1 cursor-pointer items-center justify-center gap-1.5"
				>
					<svg
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinecap="round"
						aria-hidden="true"
					>
						<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
						<path d="M3 3v5h5" />
					</svg>
					초기화
				</Button>

				{/* 랜덤 (1회) */}
				<button
					type="button"
					onClick={handleRandom}
					className="flex min-h-[44px] flex-1 cursor-pointer items-center justify-center gap-1.5 rounded bg-gray-700 px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-600 hover:text-white"
				>
					<svg
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden="true"
					>
						<rect x="2" y="2" width="5" height="5" rx="1" />
						<rect x="9.5" y="2" width="5" height="5" rx="1" />
						<rect x="17" y="2" width="5" height="5" rx="1" />
						<rect x="2" y="9.5" width="5" height="5" rx="1" />
						<rect x="17" y="9.5" width="5" height="5" rx="1" />
						<rect x="9.5" y="17" width="5" height="5" rx="1" />
						<rect x="17" y="17" width="5" height="5" rx="1" />
					</svg>
					랜덤
				</button>

				{/* 자동 랜덤 재생/정지 */}
				<button
					type="button"
					onClick={handleToggleAutoRandom}
					title={autoRandom ? "자동 랜덤 정지" : "자동 랜덤 재생"}
					className={`flex min-h-[44px] cursor-pointer items-center justify-center rounded px-3 py-2 transition-all ${
						autoRandom
							? "bg-violet-600 text-white ring-1 ring-violet-400 hover:bg-violet-700"
							: "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
					}`}
				>
					{autoRandom ? (
						/* 정지 아이콘 */
						<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
							<rect x="6" y="5" width="4" height="14" rx="1" />
							<rect x="14" y="5" width="4" height="14" rx="1" />
						</svg>
					) : (
						/* 재생 아이콘 */
						<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
							<path d="M8 5v14l11-7L8 5z" />
						</svg>
					)}
				</button>
			</div>

			{/* 그룹 아코디언 */}
			{grouped.map(({ group, categories }) => (
				<div key={group} className="overflow-hidden rounded-lg border border-gray-700/80">
					{/* 그룹 헤더 */}
					<button
						type="button"
						onClick={() => toggleGroup(group)}
						className="flex w-full cursor-pointer items-center justify-between bg-gray-800/60 px-3 py-3 text-xs font-semibold uppercase tracking-wider text-gray-300 transition-colors hover:bg-gray-800"
					>
						<span className="flex items-center gap-2">
							<GroupIcon group={group} />
							{group}
						</span>
						<ChevronIcon open={openGroups.has(group)} />
					</button>

					{/* 그룹 내용 */}
					{openGroups.has(group) && (
						<div className="flex flex-col gap-3 border-t border-gray-700/60 bg-gray-900/30 px-3 py-3">
							{categories.map((cat) => (
								<div key={cat.key}>
									{/* 카테고리 레이블 */}
									<p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-gray-500">
										{cat.label}
									</p>

									{/* 옵션 목록 */}
									<div className="flex flex-wrap gap-1.5">
										{COLOR_KEYS.has(cat.key)
											? cat.options.map((opt) => {
													const colors = cat.key === "skinTone" ? SKIN_TONE_COLORS : HAIR_COLORS;
													const color = colors[opt.id] ?? "#888";
													const isSelected = avatar[cat.key] === opt.id;
													return (
														<button
															key={opt.id}
															type="button"
															title={opt.label}
															onClick={() => handleSetAvatarPart(cat.key, opt.id)}
															className="relative h-8 w-8 flex-shrink-0 cursor-pointer rounded-full border-2 transition-all hover:scale-110 hover:ring-1 hover:ring-violet-400/60"
															style={{
																backgroundColor: color,
																borderColor: isSelected ? "#A78BFA" : "transparent",
																boxShadow: isSelected
																	? "0 0 0 1px rgba(167,139,250,0.5)"
																	: undefined,
															}}
														>
															{isSelected && (
																<span className="absolute inset-0 flex items-center justify-center">
																	<CheckIcon />
																</span>
															)}
															<span className="sr-only">{opt.label}</span>
														</button>
													);
												})
											: cat.options.map((opt) => {
													const isSelected = avatar[cat.key] === opt.id;
													return (
														<button
															key={opt.id}
															type="button"
															onClick={() => handleSetAvatarPart(cat.key, opt.id)}
															className={`flex-shrink-0 cursor-pointer rounded-md px-2.5 py-1.5 text-xs font-medium transition-all ${
																isSelected
																	? "bg-violet-600 text-white shadow-[0_0_8px_rgba(124,58,237,0.5)] ring-1 ring-violet-400/60"
																	: "bg-gray-700/80 text-gray-300 hover:bg-gray-600 hover:text-white"
															}`}
														>
															{opt.label}
														</button>
													);
												})}
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			))}
		</div>
	);
}

export { AvatarEditor };
