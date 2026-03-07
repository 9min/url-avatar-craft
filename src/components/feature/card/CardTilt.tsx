import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import type { Group } from "three";
import { MathUtils } from "three";

const MAX_TILT = MathUtils.degToRad(15);
const LERP_FACTOR = 0.08;

interface Props {
	children: React.ReactNode;
}

function CardTilt({ children }: Props) {
	const groupRef = useRef<Group>(null);
	const [target, setTarget] = useState({ x: 0, y: 0 });

	const handlePointerMove = (e: { point: { x: number; y: number } }) => {
		const x = (e.point.y / 2.5) * MAX_TILT;
		const y = (-e.point.x / 1.75) * MAX_TILT;
		setTarget({ x, y });
	};

	const handlePointerLeave = () => {
		setTarget({ x: 0, y: 0 });
	};

	useFrame(() => {
		if (!groupRef.current) return;
		groupRef.current.rotation.x = MathUtils.lerp(
			groupRef.current.rotation.x,
			target.x,
			LERP_FACTOR,
		);
		groupRef.current.rotation.y = MathUtils.lerp(
			groupRef.current.rotation.y,
			target.y,
			LERP_FACTOR,
		);
	});

	return (
		<group ref={groupRef} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
			{children}
		</group>
	);
}

export { CardTilt };
