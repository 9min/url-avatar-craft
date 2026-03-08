import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import type { Points as ThreePoints } from "three";
import {
	AdditiveBlending,
	BufferAttribute,
	BufferGeometry,
	CanvasTexture,
	LineBasicMaterial,
	MeshBasicMaterial,
	NormalBlending,
	PointsMaterial,
	Line as ThreeLine,
} from "three";
import { useCardStore } from "../../../stores/useCardStore";

// ─── 스프라이트 텍스처 팩토리 ────────────────────────────

function makeSprite(
	draw: (ctx: CanvasRenderingContext2D, s: number) => void,
	size = 64,
): CanvasTexture {
	const c = document.createElement("canvas");
	c.width = size;
	c.height = size;
	const ctx = c.getContext("2d");
	if (ctx) draw(ctx, size);
	return new CanvasTexture(c);
}

function fireSprite(): CanvasTexture {
	return makeSprite((ctx, s) => {
		const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
		g.addColorStop(0, "rgba(255,255,200,1)");
		g.addColorStop(0.4, "rgba(255,140,0,0.85)");
		g.addColorStop(0.75, "rgba(255,30,0,0.4)");
		g.addColorStop(1, "rgba(200,0,0,0)");
		ctx.fillStyle = g;
		ctx.fillRect(0, 0, s, s);
	});
}

function petalSprite(): CanvasTexture {
	return makeSprite((ctx, s) => {
		ctx.save();
		ctx.translate(s / 2, s / 2);
		ctx.rotate(Math.PI / 4);
		const g = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 0.4);
		g.addColorStop(0, "rgba(255,210,225,1)");
		g.addColorStop(0.65, "rgba(255,182,202,0.85)");
		g.addColorStop(1, "rgba(255,160,185,0)");
		ctx.fillStyle = g;
		ctx.beginPath();
		ctx.ellipse(0, 0, s * 0.4, s * 0.23, 0, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
	});
}

function snowSprite(): CanvasTexture {
	return makeSprite((ctx, s) => {
		const cx = s / 2;
		ctx.strokeStyle = "rgba(200,230,255,0.95)";
		ctx.lineWidth = 2;
		ctx.lineCap = "round";
		for (let i = 0; i < 6; i++) {
			const a = (Math.PI / 3) * i;
			ctx.beginPath();
			ctx.moveTo(cx, cx);
			ctx.lineTo(cx + Math.cos(a) * s * 0.43, cx + Math.sin(a) * s * 0.43);
			ctx.stroke();
			for (const t of [0.45, 0.72]) {
				const bx = cx + Math.cos(a) * s * 0.43 * t;
				const by = cx + Math.sin(a) * s * 0.43 * t;
				for (const sign of [1, -1]) {
					const ba = a + (sign * Math.PI) / 3;
					ctx.beginPath();
					ctx.moveTo(bx, by);
					ctx.lineTo(bx + Math.cos(ba) * s * 0.1, by + Math.sin(ba) * s * 0.1);
					ctx.stroke();
				}
			}
		}
		ctx.beginPath();
		ctx.arc(cx, cx, 3, 0, Math.PI * 2);
		ctx.fillStyle = "#E8F4FF";
		ctx.fill();
	});
}

function heartSprite(): CanvasTexture {
	return makeSprite((ctx, s) => {
		const cx = s / 2;
		ctx.fillStyle = "#FF88CC";
		ctx.shadowColor = "#FF44AA";
		ctx.shadowBlur = 8;
		ctx.beginPath();
		ctx.moveTo(cx, s * 0.74);
		ctx.bezierCurveTo(cx - s * 0.02, s * 0.64, cx - s * 0.46, s * 0.54, cx - s * 0.46, s * 0.36);
		ctx.bezierCurveTo(cx - s * 0.46, s * 0.2, cx - s * 0.28, s * 0.18, cx, s * 0.36);
		ctx.bezierCurveTo(cx + s * 0.28, s * 0.18, cx + s * 0.46, s * 0.2, cx + s * 0.46, s * 0.36);
		ctx.bezierCurveTo(cx + s * 0.46, s * 0.54, cx + s * 0.02, s * 0.64, cx, s * 0.74);
		ctx.fill();
	});
}

function starSprite(): CanvasTexture {
	return makeSprite((ctx, s) => {
		const cx = s / 2;
		ctx.fillStyle = "#FFD700";
		ctx.shadowColor = "#FFAA00";
		ctx.shadowBlur = 12;
		ctx.beginPath();
		for (let i = 0; i < 10; i++) {
			const r = i % 2 === 0 ? s * 0.44 : s * 0.2;
			const a = -Math.PI / 2 + (i * Math.PI) / 5;
			const px = cx + Math.cos(a) * r;
			const py = cx + Math.sin(a) * r;
			if (i === 0) ctx.moveTo(px, py);
			else ctx.lineTo(px, py);
		}
		ctx.closePath();
		ctx.fill();
	});
}

function bubbleSprite(): CanvasTexture {
	return makeSprite((ctx, s) => {
		const cx = s / 2;
		ctx.strokeStyle = "rgba(180,220,255,0.9)";
		ctx.lineWidth = 2.5;
		ctx.beginPath();
		ctx.arc(cx, cx, s * 0.4, 0, Math.PI * 2);
		ctx.stroke();
		// 하이라이트
		ctx.fillStyle = "rgba(255,255,255,0.55)";
		ctx.beginPath();
		ctx.arc(cx - s * 0.12, cx - s * 0.12, s * 0.1, 0, Math.PI * 2);
		ctx.fill();
	});
}

function noteSprite(): CanvasTexture {
	return makeSprite((ctx, s) => {
		ctx.fillStyle = "rgba(255,180,255,0.95)";
		ctx.shadowColor = "#FF88FF";
		ctx.shadowBlur = 8;
		// 음표 머리
		ctx.beginPath();
		ctx.ellipse(s * 0.35, s * 0.65, s * 0.18, s * 0.13, -0.4, 0, Math.PI * 2);
		ctx.fill();
		// 줄기
		ctx.fillRect(s * 0.5, s * 0.2, s * 0.06, s * 0.45);
		// 꼬리
		ctx.beginPath();
		ctx.moveTo(s * 0.56, s * 0.2);
		ctx.bezierCurveTo(s * 0.85, s * 0.3, s * 0.75, s * 0.55, s * 0.56, s * 0.5);
		ctx.stroke();
	});
}

function crystalSprite(): CanvasTexture {
	return makeSprite((ctx, s) => {
		const cx = s / 2;
		ctx.fillStyle = "rgba(150,200,255,0.8)";
		ctx.strokeStyle = "rgba(200,230,255,0.95)";
		ctx.lineWidth = 1.5;
		// 다이아몬드형
		ctx.beginPath();
		ctx.moveTo(cx, s * 0.1);
		ctx.lineTo(s * 0.75, cx);
		ctx.lineTo(cx, s * 0.9);
		ctx.lineTo(s * 0.25, cx);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		// 내부 반짝
		ctx.fillStyle = "rgba(255,255,255,0.5)";
		ctx.beginPath();
		ctx.moveTo(cx, s * 0.2);
		ctx.lineTo(s * 0.65, cx);
		ctx.lineTo(cx, s * 0.45);
		ctx.lineTo(s * 0.35, cx);
		ctx.closePath();
		ctx.fill();
	});
}

function slimeSprite(): CanvasTexture {
	return makeSprite((ctx, s) => {
		const cx = s / 2;
		const g = ctx.createRadialGradient(cx, cx, 0, cx, cx, s * 0.42);
		g.addColorStop(0, "rgba(100,255,120,0.95)");
		g.addColorStop(0.6, "rgba(50,200,80,0.85)");
		g.addColorStop(1, "rgba(20,160,50,0)");
		ctx.fillStyle = g;
		// 물방울형 (아래가 볼록)
		ctx.beginPath();
		ctx.arc(cx, cx + s * 0.05, s * 0.38, 0, Math.PI * 2);
		ctx.fill();
		// 하이라이트
		ctx.fillStyle = "rgba(200,255,200,0.6)";
		ctx.beginPath();
		ctx.ellipse(cx - s * 0.1, cx - s * 0.08, s * 0.1, s * 0.07, -0.5, 0, Math.PI * 2);
		ctx.fill();
	});
}

// ─── 공통 스프라이트 파티클 ───────────────────────────────

interface SpriteProps {
	createTexture: () => CanvasTexture;
	count: number;
	size: number;
	spreadX: number;
	spreadY: number;
	spreadZ: number;
	vy: number;
	driftX?: number;
	additive?: boolean;
	twinkle?: boolean;
}

function SpriteParticles({
	createTexture,
	count,
	size,
	spreadX,
	spreadY,
	spreadZ,
	vy,
	driftX = 0,
	additive = true,
	twinkle = false,
}: SpriteProps) {
	const texture = useMemo(() => createTexture(), [createTexture]);

	const initPos = useMemo(() => {
		const arr = new Float32Array(count * 3);
		for (let i = 0; i < count; i++) {
			arr[i * 3] = (Math.random() - 0.5) * spreadX * 2;
			arr[i * 3 + 1] = (Math.random() - 0.5) * spreadY;
			arr[i * 3 + 2] = (Math.random() - 0.5) * 2 * spreadZ;
		}
		return arr;
	}, [count, spreadX, spreadY, spreadZ]);

	const phases = useMemo(() => {
		const arr = new Float32Array(count);
		for (let i = 0; i < count; i++) arr[i] = Math.random() * Math.PI * 2;
		return arr;
	}, [count]);

	const geo = useMemo(() => {
		const g = new BufferGeometry();
		g.setAttribute("position", new BufferAttribute(initPos.slice(), 3));
		return g;
	}, [initPos]);

	const mat = useMemo(
		() =>
			new PointsMaterial({
				map: texture,
				size,
				transparent: true,
				alphaTest: 0.05,
				blending: additive ? AdditiveBlending : NormalBlending,
				depthWrite: false,
				sizeAttenuation: true,
			}),
		[texture, size, additive],
	);

	useEffect(
		() => () => {
			texture.dispose();
			geo.dispose();
			mat.dispose();
		},
		[texture, geo, mat],
	);

	const ptRef = useRef<ThreePoints>(null);

	useFrame(({ clock }, delta) => {
		if (!ptRef.current) return;
		const posAttr = ptRef.current.geometry.attributes.position as BufferAttribute;
		const arr = posAttr.array as Float32Array;
		const t = clock.getElapsedTime();
		const half = spreadY / 2;

		for (let i = 0; i < count; i++) {
			const xi = i * 3;
			const yi = i * 3 + 1;
			const phase = phases[i] ?? 0;

			if (twinkle) {
				arr[yi] = (initPos[yi] ?? 0) + Math.sin(t * 1.2 + phase) * 0.15;
			} else {
				arr[yi] = (arr[yi] ?? 0) + vy * delta;
				if (vy > 0 && (arr[yi] ?? 0) > half) {
					arr[xi] = (Math.random() - 0.5) * spreadX * 2;
					arr[yi] = -half;
				}
				if (vy < 0 && (arr[yi] ?? 0) < -half) {
					arr[xi] = (Math.random() - 0.5) * spreadX * 2;
					arr[yi] = half;
				}
			}

			if (driftX > 0) {
				arr[xi] = (initPos[xi] ?? 0) + Math.sin(t * 0.7 + phase) * driftX;
			}
		}

		if (twinkle) mat.opacity = 0.55 + Math.sin(t * 2.5) * 0.35;

		posAttr.needsUpdate = true;
	});

	return <points ref={ptRef} geometry={geo} material={mat} />;
}

// ─── 매트릭스 이펙트 ──────────────────────────────────────

const MATRIX_CHARS = "0123456789ABCDEF아이우에오カキクケコサシスセソタチツテト";
const MATRIX_COLS = 16;

function MatrixEffect() {
	const canvas = useMemo(() => {
		const c = document.createElement("canvas");
		c.width = 320;
		c.height = 480;
		return c;
	}, []);

	const texture = useMemo(() => new CanvasTexture(canvas), [canvas]);
	const material = useMemo(
		() =>
			new MeshBasicMaterial({
				map: texture,
				transparent: true,
				opacity: 0.92,
				depthWrite: false,
			}),
		[texture],
	);

	useEffect(
		() => () => {
			texture.dispose();
			material.dispose();
		},
		[texture, material],
	);

	const drops = useRef(new Float32Array(MATRIX_COLS).map(() => -Math.random() * 18));

	useFrame((_, delta) => {
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const { width, height } = canvas;
		const fs = 18;
		const colW = width / MATRIX_COLS;

		// 잔상 효과
		ctx.fillStyle = "rgba(0,0,12,0.15)";
		ctx.fillRect(0, 0, width, height);

		ctx.textAlign = "center";
		ctx.textBaseline = "top";

		for (let col = 0; col < MATRIX_COLS; col++) {
			const drop = drops.current[col] ?? 0;
			const x = col * colW + colW / 2;
			const y = drop * fs;
			const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)] ?? "0";
			const prev = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)] ?? "0";

			ctx.font = `bold ${fs}px monospace`;
			ctx.fillStyle = "#BBFFBB";
			ctx.fillText(char, x, y);

			ctx.font = `${fs - 2}px monospace`;
			ctx.fillStyle = "#00DD44";
			ctx.fillText(prev, x, y - fs);

			drops.current[col] = drop + delta * 9;
			if (y > height + fs * 4) drops.current[col] = -Math.random() * 14;
		}
		texture.needsUpdate = true;
	});

	// 카드 뒷배경에 배치
	return (
		<mesh position={[0, 0, -0.8]} material={material}>
			<planeGeometry args={[5.0, 7.5]} />
		</mesh>
	);
}

// ─── 번개 이펙트 ──────────────────────────────────────────

const BOLT_POINTS = 9;

function generateBolt(): Float32Array {
	const arr = new Float32Array(BOLT_POINTS * 3);
	const sx = (Math.random() - 0.5) * 3.5;
	const ex = (Math.random() - 0.5) * 3.5;
	for (let i = 0; i < BOLT_POINTS; i++) {
		const t = i / (BOLT_POINTS - 1);
		arr[i * 3] = sx + (ex - sx) * t + (Math.random() - 0.5) * 0.55;
		arr[i * 3 + 1] = 3.0 - t * 6.0;
		arr[i * 3 + 2] = 0.12 + Math.random() * 0.12;
	}
	return arr;
}

function BoltLine({ initDelay }: { initDelay: number }) {
	const mat = useMemo(
		() => new LineBasicMaterial({ color: "#CCDEFF", transparent: true, opacity: 0 }),
		[],
	);

	const lineObj = useMemo(() => {
		const geo = new BufferGeometry();
		geo.setAttribute("position", new BufferAttribute(generateBolt(), 3));
		return new ThreeLine(geo, mat);
	}, [mat]);

	useEffect(
		() => () => {
			lineObj.geometry.dispose();
			mat.dispose();
		},
		[lineObj, mat],
	);

	const timer = useRef(-initDelay);

	useFrame((_, delta) => {
		timer.current -= delta;
		if (timer.current > 0) return;

		if (!lineObj.visible) {
			const posAttr = lineObj.geometry.attributes.position as BufferAttribute;
			const newPts = generateBolt();
			const arr = posAttr.array as Float32Array;
			for (let j = 0; j < newPts.length; j++) arr[j] = newPts[j] ?? 0;
			posAttr.needsUpdate = true;
			lineObj.visible = true;
			mat.opacity = 0.95;
			timer.current = 0.04 + Math.random() * 0.07;
		} else {
			lineObj.visible = false;
			timer.current = 0.35 + Math.random() * 1.6;
		}
	});

	return <primitive object={lineObj} />;
}

function LightningEffect() {
	const delays = useMemo(
		() => Array.from({ length: 4 }, (_, i) => i * 0.45 + Math.random() * 0.3),
		[],
	);
	return (
		<group>
			{delays.map((d) => (
				<BoltLine key={d} initDelay={d} />
			))}
		</group>
	);
}

// ─── 메인 스위치 ──────────────────────────────────────────

function CardParticles() {
	const auraEffect = useCardStore((s) => s.avatar.auraEffect);

	switch (auraEffect) {
		case 1:
			return (
				<SpriteParticles
					createTexture={fireSprite}
					count={70}
					size={0.32}
					spreadX={1.7}
					spreadY={6}
					spreadZ={1.4}
					vy={1.9}
					additive
				/>
			);
		case 2:
			return (
				<SpriteParticles
					createTexture={petalSprite}
					count={55}
					size={0.22}
					spreadX={2.2}
					spreadY={6}
					spreadZ={1.4}
					vy={-0.7}
					driftX={0.45}
					additive={false}
				/>
			);
		case 3:
			return <MatrixEffect />;
		case 4:
			return <LightningEffect />;
		case 5:
			return (
				<SpriteParticles
					createTexture={snowSprite}
					count={65}
					size={0.18}
					spreadX={2.2}
					spreadY={6}
					spreadZ={1.4}
					vy={-0.9}
					driftX={0.3}
					additive={false}
				/>
			);
		case 6:
			return (
				<SpriteParticles
					createTexture={heartSprite}
					count={40}
					size={0.22}
					spreadX={1.8}
					spreadY={6}
					spreadZ={1.4}
					vy={0.85}
					additive={false}
				/>
			);
		case 7:
			return (
				<SpriteParticles
					createTexture={starSprite}
					count={50}
					size={0.26}
					spreadX={2.5}
					spreadY={5.5}
					spreadZ={1.6}
					vy={0}
					additive
					twinkle
				/>
			);
		case 8:
			return (
				<SpriteParticles
					createTexture={bubbleSprite}
					count={45}
					size={0.28}
					spreadX={2.0}
					spreadY={6}
					spreadZ={1.4}
					vy={0.6}
					driftX={0.3}
					additive={false}
				/>
			);
		case 9:
			return (
				<SpriteParticles
					createTexture={noteSprite}
					count={35}
					size={0.24}
					spreadX={2.2}
					spreadY={5.5}
					spreadZ={1.4}
					vy={0.9}
					driftX={0.4}
					additive={false}
				/>
			);
		case 10:
			return (
				<SpriteParticles
					createTexture={crystalSprite}
					count={40}
					size={0.22}
					spreadX={2.5}
					spreadY={5.5}
					spreadZ={1.6}
					vy={0}
					additive
					twinkle
				/>
			);
		case 11:
			return (
				<SpriteParticles
					createTexture={crystalSprite}
					count={30}
					size={0.32}
					spreadX={1.8}
					spreadY={5}
					spreadZ={1.4}
					vy={-0.4}
					additive={false}
				/>
			);
		case 12:
			return (
				<SpriteParticles
					createTexture={slimeSprite}
					count={35}
					size={0.26}
					spreadX={1.6}
					spreadY={6}
					spreadZ={1.4}
					vy={-1.0}
					driftX={0.2}
					additive={false}
				/>
			);
		default:
			return null;
	}
}

export { CardParticles };
