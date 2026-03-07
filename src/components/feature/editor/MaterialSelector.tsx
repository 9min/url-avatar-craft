import { clsx } from "clsx";
import { useCardStore } from "../../../stores/useCardStore";
import type { CardMaterial } from "../../../types/card";

interface MaterialOption {
	value: CardMaterial;
	label: string;
	bgClass: string;
}

const MATERIALS: MaterialOption[] = [
	{
		value: "foil",
		label: "Foil",
		bgClass: "bg-gradient-to-br from-pink-500 via-yellow-400 to-cyan-400",
	},
	{
		value: "neon",
		label: "Neon",
		bgClass: "bg-gradient-to-br from-cyan-400 to-fuchsia-500 shadow-[0_0_15px_rgba(0,255,200,0.4)]",
	},
	{
		value: "glass",
		label: "Glass",
		bgClass: "bg-gradient-to-br from-white/20 to-white/5 backdrop-blur border border-white/20",
	},
	{
		value: "metal",
		label: "Metal",
		bgClass: "bg-gradient-to-br from-gray-300 to-gray-500",
	},
];

function MaterialSelector() {
	const material = useCardStore((s) => s.material);
	const setMaterial = useCardStore((s) => s.setMaterial);

	return (
		<div role="radiogroup" aria-label="카드 재질 선택" className="grid grid-cols-2 gap-3">
			{MATERIALS.map((opt) => (
				<label
					key={opt.value}
					className={clsx(
						"flex h-20 cursor-pointer items-center justify-center rounded-xl text-sm font-bold transition-all",
						opt.bgClass,
						material === opt.value
							? "scale-105 ring-2 ring-violet-400 ring-offset-2 ring-offset-gray-900"
							: "opacity-70 hover:opacity-100",
					)}
				>
					<input
						type="radio"
						name="material"
						value={opt.value}
						checked={material === opt.value}
						onChange={() => setMaterial(opt.value)}
						className="sr-only"
					/>
					{opt.label}
				</label>
			))}
		</div>
	);
}

export { MaterialSelector };
