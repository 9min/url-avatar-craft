import { useCardStore } from "../../../stores/useCardStore";
import { Button } from "../../ui/Button";

function DownloadButton() {
	const requestCapture = useCardStore((s) => s.requestCapture);

	return (
		<Button variant="secondary" onClick={requestCapture} className="w-full">
			🖼️ 이미지 저장 (PNG)
		</Button>
	);
}

export { DownloadButton };
