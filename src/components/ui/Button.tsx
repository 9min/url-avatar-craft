import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
	primary: "bg-violet-600 hover:bg-violet-500 text-white",
	secondary: "bg-gray-700 hover:bg-gray-600 text-gray-100",
	ghost: "bg-transparent hover:bg-gray-800 text-gray-300",
};

function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
	return (
		<button
			className={twMerge(
				clsx(
					"rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50",
					VARIANT_CLASSES[variant],
					className,
				),
			)}
			{...props}
		>
			{children}
		</button>
	);
}

export { Button };
