import { useCallback, useState } from "react";
import { Button } from "../../ui/Button";

function ShareButton() {
	const [copied, setCopied] = useState(false);

	const handleCopy = useCallback(async () => {
		try {
			await navigator.clipboard.writeText(window.location.href);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			// 클립보드 API 미지원 시 폴백
			const textarea = document.createElement("textarea");
			textarea.value = window.location.href;
			document.body.appendChild(textarea);
			textarea.select();
			document.execCommand("copy");
			document.body.removeChild(textarea);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	}, []);

	return (
		<Button onClick={handleCopy} variant={copied ? "secondary" : "primary"} className="w-full">
			{copied ? "복사됨!" : "링크 복사"}
		</Button>
	);
}

export { ShareButton };
