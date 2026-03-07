import { Text } from "@react-three/drei";
import { useCardStore } from "../../../stores/useCardStore";

const FONT_URL = "/fonts/Pretendard-Bold.woff";

function CardText() {
	const nickname = useCardStore((s) => s.nickname);
	const title = useCardStore((s) => s.title);

	return (
		<group position={[0, 0, 0.05]}>
			{title && (
				<Text
					position={[0, -1.5, 0]}
					fontSize={0.18}
					color="#e0e0ff"
					anchorX="center"
					anchorY="middle"
					font={FONT_URL}
					maxWidth={3.2}
				>
					{title}
				</Text>
			)}
			{nickname && (
				<Text
					position={[0, -2.0, 0]}
					fontSize={0.32}
					color="white"
					anchorX="center"
					anchorY="middle"
					font={FONT_URL}
					maxWidth={3.2}
				>
					{nickname}
				</Text>
			)}
		</group>
	);
}

export { CardText };
