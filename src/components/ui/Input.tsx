import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
}

function Input({ label, className, id, ...props }: InputProps) {
	const inputId = id ?? label.replace(/\s+/g, "-").toLowerCase();

	return (
		<div className="flex flex-col gap-1">
			<label htmlFor={inputId} className="text-sm font-medium text-gray-400">
				{label}
			</label>
			<input
				id={inputId}
				className={twMerge(
					clsx(
						"rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 transition-colors focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500",
						className,
					),
				)}
				{...props}
			/>
		</div>
	);
}

export { Input };
