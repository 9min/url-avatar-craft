import { Text } from "@react-three/drei";
import { useCardStore } from "../../../stores/useCardStore";
import { FIGURE_CASE } from "./FigureCase";

const FONT_URL = "/fonts/Pretendard-Bold.woff";

// 받침대 앞면에 네임플레이트 배치
const NAMEPLATE_Z = FIGURE_CASE.PED_D / 2 + 0.01;
const NAMEPLATE_Y = FIGURE_CASE.PED_Y;

function CardText() {
	const nickname = useCardStore((s) => s.nickname);
	const title = useCardStore((s) => s.title);

	return (
		<group>
			{title && (
				<Text
					position={[0, NAMEPLATE_Y + 0.1, NAMEPLATE_Z]}
					fontSize={0.13}
					color="#e0e0ff"
					anchorX="center"
					anchorY="middle"
					font={FONT_URL}
					maxWidth={3.0}
				>
					{title}
				</Text>
			)}
			{nickname && (
				<Text
					position={[0, NAMEPLATE_Y - 0.13, NAMEPLATE_Z]}
					fontSize={0.24}
					color="white"
					anchorX="center"
					anchorY="middle"
					font={FONT_URL}
					maxWidth={3.0}
				>
					{nickname}
				</Text>
			)}
		</group>
	);
}

export { CardText };
