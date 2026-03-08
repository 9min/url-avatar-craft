import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { useCardStore } from "../../../stores/useCardStore";

/** R3F Canvas 내부에서 PNG 다운로드를 실행하는 헬퍼 (Canvas 외부 버튼과 Zustand로 연동) */
function CaptureHelper() {
	const { gl } = useThree();
	const captureRequested = useCardStore((s) => s.captureRequested);
	const clearCaptureRequest = useCardStore((s) => s.clearCaptureRequest);

	useEffect(() => {
		if (!captureRequested) return;

		// 다음 프레임 렌더 후 캡처
		requestAnimationFrame(() => {
			const dataUrl = gl.domElement.toDataURL("image/png");
			const a = document.createElement("a");
			a.href = dataUrl;
			a.download = "holoid-card.png";
			a.click();
			clearCaptureRequest();
		});
	}, [captureRequested, gl, clearCaptureRequest]);

	return null;
}

export { CaptureHelper };
