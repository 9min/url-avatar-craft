import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { CardMesh } from "./CardMesh";
import { CardText } from "./CardText";
import { CardTilt } from "./CardTilt";

function CardScene() {
	return (
		<Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
			<ambientLight intensity={0.5} />
			<directionalLight position={[5, 5, 5]} intensity={1} />
			<pointLight position={[-5, -5, 5]} intensity={0.5} />
			<Environment preset="city" />
			<CardTilt>
				<CardMesh />
				<CardText />
			</CardTilt>
			<OrbitControls enableZoom={false} enablePan={false} />
		</Canvas>
	);
}

export { CardScene };
