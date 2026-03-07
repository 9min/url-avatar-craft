import {
	type Material,
	MeshPhysicalMaterial,
	MeshStandardMaterial,
	ShaderMaterial,
	Vector2,
} from "three";
import type { CardMaterial } from "../../types/card";
import { holographicFragmentShader, holographicVertexShader } from "./holographicShader";
import { neonFragmentShader, neonVertexShader } from "./neonShader";

function createFoilMaterial(): ShaderMaterial {
	return new ShaderMaterial({
		vertexShader: holographicVertexShader,
		fragmentShader: holographicFragmentShader,
		uniforms: {
			uTime: { value: 0 },
			uMouse: { value: new Vector2(0, 0) },
		},
	});
}

function createNeonMaterial(): ShaderMaterial {
	return new ShaderMaterial({
		vertexShader: neonVertexShader,
		fragmentShader: neonFragmentShader,
		uniforms: {
			uTime: { value: 0 },
		},
	});
}

function createGlassMaterial(): MeshPhysicalMaterial {
	return new MeshPhysicalMaterial({
		color: 0xffffff,
		transmission: 0.9,
		roughness: 0.05,
		clearcoat: 1,
		clearcoatRoughness: 0.05,
		ior: 1.5,
		thickness: 0.5,
	});
}

function createMetalMaterial(): MeshStandardMaterial {
	return new MeshStandardMaterial({
		color: 0xcccccc,
		metalness: 1.0,
		roughness: 0.15,
	});
}

const MATERIAL_CREATORS: Record<CardMaterial, () => Material> = {
	foil: createFoilMaterial,
	neon: createNeonMaterial,
	glass: createGlassMaterial,
	metal: createMetalMaterial,
};

function createCardMaterial(type: CardMaterial): Material {
	return MATERIAL_CREATORS[type]();
}

export { createCardMaterial, createFoilMaterial };
