import type { AvatarState } from "../../types/avatar";

export interface VoxelCell {
	position: [number, number, number];
	color: string;
}

// ─── 팔레트 ────────────────────────────────────────────────────
const SKIN_TONES = [
	"#FFDBB0",
	"#FFCC8E",
	"#E8B87A",
	"#D4A76A",
	"#C19A6B",
	"#A0714F",
	"#7B4E2D",
	"#4B2C1A",
];

const HAIR_COLORS = [
	"#1A1A1A",
	"#5C3317",
	"#D4B254",
	"#CC2222",
	"#FF69B4",
	"#2255CC",
	"#7B2FBE",
	"#22AA44",
	"#CCCCCC",
	"#EEEEEE",
	"#FF6600",
	"#FF88CC",
	// 12-17: 추가 컬러
	"#00CCCC", // 12: 청록
	"#BB99EE", // 13: 연보라
	"#99DD00", // 14: 라임
	"#1133BB", // 15: 코발트
	"#885500", // 16: 투톤 갈+금 (어두운쪽)
	"#DD1177", // 17: 딥핑크
];

// 눈 스타일별 눈동자 색상
const EYE_STYLE_COLORS = [
	"#223388", // 0 기본
	"#AA6600", // 1 고양이눈
	"#FF1493", // 2 하트눈
	"#FFD700", // 3 별눈
	"#553377", // 4 졸린눈
	"#1177CC", // 5 큰눈
	"#AA0000", // 6 째려보기
	"#117766", // 7 윙크
	"#AA3388", // 8 반달눈
	"#333333", // 9 X눈
	"#0088CC", // 10 동그란눈
	"#FF2222", // 11 사이보그
	"#5588CC", // 12 눈물눈
	"#775599", // 13 피로눈
	"#FF1493", // 14 하트+별 (왼쪽)
	"#FFFFFF", // 15 반짝눈
];

const TOP_COLORS = [
	"#DDDDDD",
	"#2244AA",
	"#111133",
	"#667788",
	"#660000",
	"#001144",
	"#220D44",
	"#D4B878",
	"#882222",
	"#6699BB",
	"#334455",
	"#4B1A88",
];

const LEG_COLORS = [
	"#2233AA",
	"#1A2244",
	"#335577",
	"#553311",
	"#333333",
	"#114411",
	"#442244",
	"#221133",
];

const SHOE_COLORS = [
	"#111111",
	"#332211",
	"#333333",
	"#5B3A29",
	"#222222",
	"#112211",
	"#331122",
	"#111122",
];

// ─── 헬퍼 ──────────────────────────────────────────────────────
function px(voxels: VoxelCell[], x: number, y: number, color: string, z = 0) {
	voxels.push({ position: [x, y, z], color });
}

// ─── 색상 유틸 ──────────────────────────────────────────────────
function darken(hex: string, amount: number): string {
	const r = Math.max(0, Math.round(parseInt(hex.slice(1, 3), 16) * (1 - amount)));
	const g = Math.max(0, Math.round(parseInt(hex.slice(3, 5), 16) * (1 - amount)));
	const b = Math.max(0, Math.round(parseInt(hex.slice(5, 7), 16) * (1 - amount)));
	return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

// ─── 아이템 정의 ───────────────────────────────────────────────
type ItemVoxel = { dx: number; dy: number; color: string };

const HELD_ITEMS: ItemVoxel[][] = [
	// 0: 없음
	[],
	// 1: 검
	[
		{ dx: 5, dy: 2, color: "#8B4513" },
		{ dx: 5, dy: 3, color: "#CCCCCC" },
		{ dx: 5, dy: 4, color: "#CCCCCC" },
		{ dx: 5, dy: 5, color: "#CCCCCC" },
		{ dx: 5, dy: 6, color: "#CCCCCC" },
		{ dx: 4, dy: 3, color: "#BBBBBB" },
		{ dx: 6, dy: 3, color: "#BBBBBB" },
		{ dx: 5, dy: 7, color: "#EEEEEE" },
	],
	// 2: 도끼
	[
		{ dx: 5, dy: 2, color: "#8B4513" },
		{ dx: 5, dy: 3, color: "#8B4513" },
		{ dx: 5, dy: 4, color: "#999999" },
		{ dx: 5, dy: 5, color: "#999999" },
		{ dx: 6, dy: 4, color: "#999999" },
		{ dx: 6, dy: 5, color: "#999999" },
		{ dx: 6, dy: 6, color: "#AAAAAA" },
		{ dx: 5, dy: 6, color: "#AAAAAA" },
	],
	// 3: 활
	[
		{ dx: 5, dy: 1, color: "#8B4513" },
		{ dx: 5, dy: 2, color: "#8B4513" },
		{ dx: 5, dy: 3, color: "#8B4513" },
		{ dx: 5, dy: 4, color: "#8B4513" },
		{ dx: 5, dy: 5, color: "#8B4513" },
		{ dx: 6, dy: 2, color: "#DDCCAA" },
		{ dx: 6, dy: 3, color: "#DDCCAA" },
		{ dx: 6, dy: 4, color: "#DDCCAA" },
	],
	// 4: 마법봉
	[
		{ dx: 5, dy: 1, color: "#4422AA" },
		{ dx: 5, dy: 2, color: "#4422AA" },
		{ dx: 5, dy: 3, color: "#5533BB" },
		{ dx: 5, dy: 4, color: "#5533BB" },
		{ dx: 5, dy: 5, color: "#6644CC" },
		{ dx: 5, dy: 6, color: "#FF44FF" },
		{ dx: 4, dy: 6, color: "#DD22DD" },
		{ dx: 6, dy: 6, color: "#DD22DD" },
	],
	// 5: 총
	[
		{ dx: 5, dy: 3, color: "#2A2A2A" },
		{ dx: 5, dy: 4, color: "#2A2A2A" },
		{ dx: 6, dy: 4, color: "#222222" },
		{ dx: 7, dy: 4, color: "#222222" },
		{ dx: 8, dy: 4, color: "#1A1A1A" },
		{ dx: 5, dy: 2, color: "#3A3A3A" },
		{ dx: 6, dy: 2, color: "#333333" },
	],
	// 6: 방패
	[
		{ dx: 5, dy: 2, color: "#8B0000" },
		{ dx: 5, dy: 3, color: "#8B0000" },
		{ dx: 5, dy: 4, color: "#8B0000" },
		{ dx: 6, dy: 2, color: "#8B0000" },
		{ dx: 6, dy: 3, color: "#FFD700" },
		{ dx: 6, dy: 4, color: "#8B0000" },
		{ dx: 7, dy: 2, color: "#8B0000" },
		{ dx: 7, dy: 3, color: "#8B0000" },
		{ dx: 7, dy: 4, color: "#8B0000" },
	],
	// 7: 지팡이
	[
		{ dx: 5, dy: 0, color: "#6B3F0A" },
		{ dx: 5, dy: 1, color: "#6B3F0A" },
		{ dx: 5, dy: 2, color: "#6B3F0A" },
		{ dx: 5, dy: 3, color: "#6B3F0A" },
		{ dx: 5, dy: 4, color: "#6B3F0A" },
		{ dx: 5, dy: 5, color: "#6B3F0A" },
		{ dx: 5, dy: 6, color: "#00CCFF" },
		{ dx: 4, dy: 6, color: "#0099CC" },
		{ dx: 6, dy: 6, color: "#0099CC" },
		{ dx: 4, dy: 7, color: "#00CCFF" },
		{ dx: 6, dy: 7, color: "#00CCFF" },
	],
	// 8: 횃불
	[
		{ dx: 5, dy: 2, color: "#8B4513" },
		{ dx: 5, dy: 3, color: "#8B4513" },
		{ dx: 5, dy: 4, color: "#FF8C00" },
		{ dx: 5, dy: 5, color: "#FF4400" },
		{ dx: 4, dy: 5, color: "#FF6600" },
		{ dx: 6, dy: 5, color: "#FF6600" },
		{ dx: 5, dy: 6, color: "#FFAA00" },
	],
	// 9: 쌍칼
	[
		{ dx: 5, dy: 2, color: "#BBBBBB" },
		{ dx: 5, dy: 3, color: "#BBBBBB" },
		{ dx: 5, dy: 4, color: "#BBBBBB" },
		{ dx: 5, dy: 5, color: "#EEEEEE" },
		{ dx: -1, dy: 2, color: "#BBBBBB" },
		{ dx: -1, dy: 3, color: "#BBBBBB" },
		{ dx: -1, dy: 4, color: "#BBBBBB" },
		{ dx: -1, dy: 5, color: "#EEEEEE" },
	],
	// 10: 망치
	[
		{ dx: 5, dy: 2, color: "#8B4513" },
		{ dx: 5, dy: 3, color: "#8B4513" },
		{ dx: 5, dy: 4, color: "#8B4513" },
		{ dx: 4, dy: 5, color: "#888888" },
		{ dx: 5, dy: 5, color: "#888888" },
		{ dx: 6, dy: 5, color: "#888888" },
		{ dx: 4, dy: 6, color: "#888888" },
		{ dx: 5, dy: 6, color: "#888888" },
		{ dx: 6, dy: 6, color: "#888888" },
	],
	// 11: 트라이던트
	[
		{ dx: 5, dy: 1, color: "#4488CC" },
		{ dx: 5, dy: 2, color: "#4488CC" },
		{ dx: 5, dy: 3, color: "#4488CC" },
		{ dx: 5, dy: 4, color: "#4488CC" },
		{ dx: 5, dy: 5, color: "#4488CC" },
		{ dx: 4, dy: 5, color: "#55AADD" },
		{ dx: 6, dy: 5, color: "#55AADD" },
		{ dx: 4, dy: 6, color: "#55AADD" },
		{ dx: 6, dy: 6, color: "#55AADD" },
		{ dx: 4, dy: 7, color: "#66BBEE" },
		{ dx: 6, dy: 7, color: "#66BBEE" },
	],
	// 12: 책
	[
		{ dx: 4, dy: 1, color: "#AA5522" },
		{ dx: 5, dy: 1, color: "#CC7733" },
		{ dx: 6, dy: 1, color: "#AA5522" },
		{ dx: 4, dy: 2, color: "#AA5522" },
		{ dx: 5, dy: 2, color: "#EEEECC" },
		{ dx: 6, dy: 2, color: "#AA5522" },
		{ dx: 4, dy: 3, color: "#AA5522" },
		{ dx: 5, dy: 3, color: "#EEEECC" },
		{ dx: 6, dy: 3, color: "#AA5522" },
		{ dx: 4, dy: 4, color: "#AA5522" },
		{ dx: 5, dy: 4, color: "#EEEECC" },
		{ dx: 6, dy: 4, color: "#AA5522" },
	],
	// 13: 마이크
	[
		{ dx: 5, dy: 0, color: "#888888" },
		{ dx: 5, dy: 1, color: "#888888" },
		{ dx: 5, dy: 2, color: "#888888" },
		{ dx: 4, dy: 3, color: "#444444" },
		{ dx: 5, dy: 3, color: "#DDDDDD" },
		{ dx: 6, dy: 3, color: "#444444" },
		{ dx: 4, dy: 4, color: "#333333" },
		{ dx: 5, dy: 4, color: "#CCCCCC" },
		{ dx: 6, dy: 4, color: "#333333" },
		{ dx: 4, dy: 5, color: "#444444" },
		{ dx: 5, dy: 5, color: "#DDDDDD" },
		{ dx: 6, dy: 5, color: "#444444" },
	],
	// 14: 기타
	[
		{ dx: 5, dy: 0, color: "#6B3F0A" },
		{ dx: 5, dy: 1, color: "#6B3F0A" },
		{ dx: 5, dy: 2, color: "#6B3F0A" },
		{ dx: 4, dy: 3, color: "#CC4400" },
		{ dx: 5, dy: 3, color: "#CC4400" },
		{ dx: 6, dy: 3, color: "#CC4400" },
		{ dx: 4, dy: 4, color: "#CC4400" },
		{ dx: 5, dy: 4, color: "#FF6622" },
		{ dx: 6, dy: 4, color: "#CC4400" },
		{ dx: 4, dy: 5, color: "#CC4400" },
		{ dx: 5, dy: 5, color: "#CC4400" },
		{ dx: 6, dy: 5, color: "#CC4400" },
		{ dx: 6, dy: 2, color: "#EEEEAA" }, // 줄감개
		{ dx: 6, dy: 1, color: "#EEEEAA" },
	],
	// 15: 낫
	[
		{ dx: 5, dy: 1, color: "#6B3F0A" },
		{ dx: 5, dy: 2, color: "#6B3F0A" },
		{ dx: 5, dy: 3, color: "#6B3F0A" },
		{ dx: 5, dy: 4, color: "#6B3F0A" },
		{ dx: 5, dy: 5, color: "#AAAAAA" },
		{ dx: 6, dy: 5, color: "#BBBBBB" },
		{ dx: 7, dy: 5, color: "#AAAAAA" },
		{ dx: 7, dy: 6, color: "#AAAAAA" },
		{ dx: 7, dy: 7, color: "#999999" },
		{ dx: 6, dy: 7, color: "#AAAAAA" },
	],
	// 16: 우산
	[
		{ dx: 5, dy: 0, color: "#885588" },
		{ dx: 5, dy: 1, color: "#885588" },
		{ dx: 5, dy: 2, color: "#885588" },
		{ dx: 5, dy: 3, color: "#885588" },
		{ dx: 4, dy: 4, color: "#AA66AA" },
		{ dx: 5, dy: 4, color: "#AA66AA" },
		{ dx: 6, dy: 4, color: "#AA66AA" },
		{ dx: 3, dy: 5, color: "#AA66AA" },
		{ dx: 4, dy: 5, color: "#CC88CC" },
		{ dx: 5, dy: 5, color: "#CC88CC" },
		{ dx: 6, dy: 5, color: "#CC88CC" },
		{ dx: 7, dy: 5, color: "#AA66AA" },
	],
	// 17: 폭탄
	[
		{ dx: 5, dy: 2, color: "#222222" },
		{ dx: 4, dy: 3, color: "#222222" },
		{ dx: 5, dy: 3, color: "#333333" },
		{ dx: 6, dy: 3, color: "#222222" },
		{ dx: 4, dy: 4, color: "#333333" },
		{ dx: 5, dy: 4, color: "#111111" },
		{ dx: 6, dy: 4, color: "#333333" },
		{ dx: 4, dy: 5, color: "#222222" },
		{ dx: 5, dy: 5, color: "#222222" },
		{ dx: 6, dy: 5, color: "#222222" },
		{ dx: 6, dy: 2, color: "#555555" }, // 도화선
		{ dx: 7, dy: 2, color: "#FF6600" }, // 불꽃
	],
];

// ─── 눈 ────────────────────────────────────────────────────────
/**
 * 좌표계 (업스케일 전):
 *   왼쪽 눈 중심: x=-3,-2, y=9
 *   오른쪽 눈 중심: x=1,2, y=9
 *   z=2 흰자, z=2 동공 (앞면 z=1 위로 돌출)
 */
function addEyes(voxels: VoxelCell[], style: number, skin: string): void {
	const w = "#F0F0F0";
	const wz = 2;
	const ez = 2;
	const ec = EYE_STYLE_COLORS[style] ?? "#223388";

	switch (style) {
		case 0: {
			// 기본 - 흰자 + 동공
			px(voxels, -3, 9, w, wz);
			px(voxels, -2, 9, ec, ez);
			px(voxels, 1, 9, w, wz);
			px(voxels, 2, 9, ec, ez);
			break;
		}
		case 1: {
			// 고양이눈 - 아몬드형, 꼬리 올라감
			px(voxels, -4, 9, w, wz);
			px(voxels, -3, 9, w, wz);
			px(voxels, -2, 9, ec, ez);
			px(voxels, -1, 8, ec, ez); // 안쪽 아래 꼬리
			px(voxels, 1, 9, w, wz);
			px(voxels, 2, 9, w, wz);
			px(voxels, 3, 9, ec, ez);
			px(voxels, 0, 8, ec, ez);
			break;
		}
		case 2: {
			// 하트눈 - 핑크 하트 모양
			const hc = "#FF69B4";
			const hd = "#FF1493";
			px(voxels, -4, 9, hc, ez);
			px(voxels, -3, 9, hd, ez);
			px(voxels, -2, 9, hc, ez);
			px(voxels, -3, 8, hd, ez);
			px(voxels, 1, 9, hc, ez);
			px(voxels, 2, 9, hd, ez);
			px(voxels, 3, 9, hc, ez);
			px(voxels, 2, 8, hd, ez);
			break;
		}
		case 3: {
			// 별눈 - 골드 빛 별
			const sc = "#FFD700";
			const sl = "#FFCC44";
			// 왼쪽 별
			px(voxels, -3, 10, sl, ez);
			px(voxels, -2, 10, sl, ez);
			px(voxels, -4, 9, sl, ez);
			px(voxels, -3, 9, sc, ez);
			px(voxels, -2, 9, sc, ez);
			px(voxels, -1, 9, sl, ez);
			px(voxels, -3, 8, sl, ez);
			px(voxels, -2, 8, sl, ez);
			// 오른쪽 별
			px(voxels, 1, 10, sl, ez);
			px(voxels, 2, 10, sl, ez);
			px(voxels, 0, 9, sl, ez);
			px(voxels, 1, 9, sc, ez);
			px(voxels, 2, 9, sc, ez);
			px(voxels, 3, 9, sl, ez);
			px(voxels, 1, 8, sl, ez);
			px(voxels, 2, 8, sl, ez);
			break;
		}
		case 4: {
			// 졸린눈 - 눈동자만, 흰자 없음 (반쯤 감긴 느낌)
			px(voxels, -2, 9, ec, ez);
			px(voxels, 2, 9, ec, ez);
			break;
		}
		case 5: {
			// 큰눈 - 2x2 큰 눈
			px(voxels, -4, 9, w, wz);
			px(voxels, -3, 9, w, wz);
			px(voxels, -2, 9, ec, ez);
			px(voxels, -4, 8, w, wz);
			px(voxels, -3, 8, w, wz);
			px(voxels, -2, 8, ec, ez);
			px(voxels, 1, 9, w, wz);
			px(voxels, 2, 9, w, wz);
			px(voxels, 3, 9, ec, ez);
			px(voxels, 1, 8, w, wz);
			px(voxels, 2, 8, w, wz);
			px(voxels, 3, 8, ec, ez);
			break;
		}
		case 6: {
			// 째려보기 - 흰자 없이 동공만, 안쪽 기울기
			px(voxels, -3, 9, ec, ez);
			px(voxels, -2, 9, ec, ez);
			px(voxels, -2, 8, ec, ez); // 안쪽 아래
			px(voxels, 1, 9, ec, ez);
			px(voxels, 2, 9, ec, ez);
			px(voxels, 1, 8, ec, ez);
			break;
		}
		case 7: {
			// 윙크 - 왼쪽 정상, 오른쪽 감음
			px(voxels, -3, 9, w, wz);
			px(voxels, -2, 9, ec, ez);
			// 오른쪽 = 가로 선 (감긴 눈)
			px(voxels, 1, 9, ec, ez);
			px(voxels, 2, 9, ec, ez);
			px(voxels, 1, 8, ec, ez);
			break;
		}
		case 8: {
			// 반달눈 - ^^ 웃는 눈
			px(voxels, -3, 9, ec, ez);
			px(voxels, -2, 9, ec, ez);
			px(voxels, -4, 8, ec, ez);
			px(voxels, -1, 8, ec, ez);
			px(voxels, 1, 9, ec, ez);
			px(voxels, 2, 9, ec, ez);
			px(voxels, 0, 8, ec, ez);
			px(voxels, 3, 8, ec, ez);
			break;
		}
		case 9: {
			// X눈 - X 모양 (어두운 색)
			px(voxels, -3, 9, ec, ez);
			px(voxels, -2, 9, ec, ez);
			px(voxels, -3, 8, ec, ez);
			px(voxels, -2, 8, ec, ez);
			px(voxels, 1, 9, ec, ez);
			px(voxels, 2, 9, ec, ez);
			px(voxels, 1, 8, ec, ez);
			px(voxels, 2, 8, ec, ez);
			break;
		}
		case 10: {
			// 동그란눈 - 3픽셀 너비 원형
			px(voxels, -4, 9, w, wz);
			px(voxels, -3, 9, w, wz);
			px(voxels, -2, 9, w, wz);
			px(voxels, -3, 8, ec, ez);
			px(voxels, 1, 9, w, wz);
			px(voxels, 2, 9, w, wz);
			px(voxels, 3, 9, w, wz);
			px(voxels, 2, 8, ec, ez);
			break;
		}
		case 11: {
			// 사이보그 - 왼쪽 빨간 스캔라인, 오른쪽 기계눈
			px(voxels, -4, 9, "#880000", ez);
			px(voxels, -3, 9, "#FF2222", ez);
			px(voxels, -2, 9, "#880000", ez);
			px(voxels, -4, 8, "#440000", ez);
			px(voxels, -2, 8, "#440000", ez);
			// 오른쪽 기계눈 (육각형 느낌)
			px(voxels, 1, 9, "#004488", ez);
			px(voxels, 2, 9, "#0088CC", ez);
			px(voxels, 3, 9, "#004488", ez);
			px(voxels, 2, 8, skin, wz);
			break;
		}
		case 12: {
			// 눈물눈 - 눈 아래 눈물방울
			px(voxels, -3, 9, w, wz);
			px(voxels, -2, 9, ec, ez);
			px(voxels, 1, 9, w, wz);
			px(voxels, 2, 9, ec, ez);
			// 눈물방울
			px(voxels, -3, 8, "#88CCFF", ez);
			px(voxels, 2, 8, "#88CCFF", ez);
			break;
		}
		case 13: {
			// 피로눈 - 반쯤 감긴 + 아래 다크서클
			px(voxels, -3, 9, ec, ez);
			px(voxels, -2, 9, ec, ez);
			px(voxels, 1, 9, ec, ez);
			px(voxels, 2, 9, ec, ez);
			// 다크서클
			px(voxels, -3, 8, "#AA8877", wz);
			px(voxels, -2, 8, "#AA8877", wz);
			px(voxels, 1, 8, "#AA8877", wz);
			px(voxels, 2, 8, "#AA8877", wz);
			break;
		}
		case 14: {
			// 하트+별 혼합 - 왼쪽 하트, 오른쪽 별
			// 왼쪽 하트
			const hc14 = "#FF69B4";
			const hd14 = "#FF1493";
			px(voxels, -4, 9, hc14, ez);
			px(voxels, -3, 9, hd14, ez);
			px(voxels, -2, 9, hc14, ez);
			px(voxels, -3, 8, hd14, ez);
			// 오른쪽 별
			const sc14 = "#FFD700";
			px(voxels, 1, 10, sc14, ez);
			px(voxels, 2, 10, sc14, ez);
			px(voxels, 0, 9, sc14, ez);
			px(voxels, 1, 9, sc14, ez);
			px(voxels, 2, 9, sc14, ez);
			px(voxels, 3, 9, sc14, ez);
			px(voxels, 1, 8, sc14, ez);
			px(voxels, 2, 8, sc14, ez);
			break;
		}
		case 15: {
			// 반짝눈 - 흰 하이라이트 + 보라 동공
			const sp = "#9944CC";
			px(voxels, -3, 9, w, wz);
			px(voxels, -2, 9, sp, ez);
			px(voxels, -3, 8, w, wz);
			px(voxels, 1, 9, w, wz);
			px(voxels, 2, 9, sp, ez);
			px(voxels, 2, 8, w, wz);
			break;
		}
		default: {
			px(voxels, -3, 9, w, wz);
			px(voxels, -2, 9, ec, ez);
			px(voxels, 1, 9, w, wz);
			px(voxels, 2, 9, ec, ez);
		}
	}
}

// ─── 눈썹 ──────────────────────────────────────────────────────
function addEyebrows(voxels: VoxelCell[], style: number, browColor: string): void {
	if (style === 7) return; // 없음
	const bz = 2; // 얼굴 앞면 위로
	const bd = darken(browColor, 0.1);

	switch (style) {
		case 0: {
			// 일자 - 수평 직선
			px(voxels, -3, 10, browColor, bz);
			px(voxels, -2, 10, browColor, bz);
			px(voxels, 1, 10, browColor, bz);
			px(voxels, 2, 10, browColor, bz);
			break;
		}
		case 1: {
			// 아치형 - 가운데가 높은 아치
			px(voxels, -4, 10, browColor, bz);
			px(voxels, -3, 11, browColor, bz);
			px(voxels, -2, 10, browColor, bz);
			px(voxels, 1, 10, browColor, bz);
			px(voxels, 2, 11, browColor, bz);
			px(voxels, 3, 10, browColor, bz);
			break;
		}
		case 2: {
			// 굵은 - 2줄 두꺼운 눈썹
			px(voxels, -4, 10, browColor, bz);
			px(voxels, -3, 10, browColor, bz);
			px(voxels, -2, 10, browColor, bz);
			px(voxels, -4, 11, bd, bz);
			px(voxels, -3, 11, bd, bz);
			px(voxels, -2, 11, bd, bz);
			px(voxels, 1, 10, browColor, bz);
			px(voxels, 2, 10, browColor, bz);
			px(voxels, 3, 10, browColor, bz);
			px(voxels, 1, 11, bd, bz);
			px(voxels, 2, 11, bd, bz);
			px(voxels, 3, 11, bd, bz);
			break;
		}
		case 3: {
			// 얇은 - 중앙 한 픽셀씩
			px(voxels, -3, 10, browColor, bz);
			px(voxels, 2, 10, browColor, bz);
			break;
		}
		case 4: {
			// 각진 - 외측이 높은 L자 형태
			px(voxels, -4, 11, browColor, bz);
			px(voxels, -3, 11, browColor, bz);
			px(voxels, -2, 10, browColor, bz);
			px(voxels, 1, 10, browColor, bz);
			px(voxels, 2, 11, browColor, bz);
			px(voxels, 3, 11, browColor, bz);
			break;
		}
		case 5: {
			// 찡그린 - V자 모양 (내측 낮음 = 화난 표정)
			px(voxels, -4, 11, browColor, bz);
			px(voxels, -3, 10, browColor, bz);
			px(voxels, -2, 10, browColor, bz);
			px(voxels, 1, 10, browColor, bz);
			px(voxels, 2, 10, browColor, bz);
			px(voxels, 3, 11, browColor, bz);
			break;
		}
		case 6: {
			// 올라간 - 외측 높음 (놀란/의아한 표정)
			px(voxels, -3, 10, browColor, bz);
			px(voxels, -2, 11, browColor, bz);
			px(voxels, 1, 11, browColor, bz);
			px(voxels, 2, 10, browColor, bz);
			break;
		}
		case 8: {
			// 아기형 - 가늘고 둥근 아치
			px(voxels, -2, 11, browColor, bz);
			px(voxels, 2, 11, browColor, bz);
			break;
		}
		case 9: {
			// 하트모양 - 하트형 눈썹
			px(voxels, -4, 10, browColor, bz);
			px(voxels, -2, 10, browColor, bz);
			px(voxels, -3, 11, browColor, bz);
			px(voxels, 1, 10, browColor, bz);
			px(voxels, 3, 10, browColor, bz);
			px(voxels, 2, 11, browColor, bz);
			break;
		}
		case 10: {
			// 물결 - 지그재그 웨이브
			px(voxels, -4, 11, browColor, bz);
			px(voxels, -3, 10, browColor, bz);
			px(voxels, -2, 11, browColor, bz);
			px(voxels, 1, 11, browColor, bz);
			px(voxels, 2, 10, browColor, bz);
			px(voxels, 3, 11, browColor, bz);
			break;
		}
		case 11: {
			// 끊어진 - 각 눈썹이 두 점으로 분리
			px(voxels, -4, 10, browColor, bz);
			px(voxels, -2, 10, browColor, bz);
			px(voxels, 1, 10, browColor, bz);
			px(voxels, 3, 10, browColor, bz);
			break;
		}
		default: {
			px(voxels, -3, 10, browColor, bz);
			px(voxels, -2, 10, browColor, bz);
			px(voxels, 1, 10, browColor, bz);
			px(voxels, 2, 10, browColor, bz);
		}
	}
}

// ─── 코 ────────────────────────────────────────────────────────
function addNose(voxels: VoxelCell[], style: number, skin: string): void {
	const skinDark = darken(skin, 0.15);
	const nz = 3; // 코는 가장 앞으로 돌출

	switch (style) {
		case 0: {
			// 기본 - 점 하나
			px(voxels, 0, 7, skinDark, nz);
			break;
		}
		case 1: {
			// 작은코 - 없음 (아주 작은 코)
			break;
		}
		case 2: {
			// 높은코 - 콧대 2픽셀
			px(voxels, 0, 7, skinDark, nz);
			px(voxels, 0, 8, skinDark, nz);
			break;
		}
		case 3: {
			// 둥근코 - 2픽셀 나란히
			px(voxels, -1, 7, skinDark, nz);
			px(voxels, 0, 7, skinDark, nz);
			break;
		}
		case 4: {
			// 뾰족코 - 하이라이트 포함
			px(voxels, 0, 7, skinDark, nz);
			px(voxels, 0, 8, skin, 3); // 콧대 하이라이트 (더 돌출)
			break;
		}
		case 5: {
			// 납작코 - 3픽셀 넓게
			px(voxels, -1, 7, skinDark, nz);
			px(voxels, 0, 7, skinDark, nz);
			px(voxels, 1, 7, skinDark, nz);
			break;
		}
		case 6: {
			// 돼지코 - 두 개의 콧구멍
			px(voxels, -1, 7, skinDark, nz);
			px(voxels, 1, 7, skinDark, nz);
			break;
		}
		case 7: {
			// 없음 - 코 미표시
			break;
		}
		default: {
			px(voxels, 0, 7, skinDark, nz);
		}
	}
}

// ─── 입 ────────────────────────────────────────────────────────
// 입 영역: y=5(아래), y=6(위). 얼굴 중앙 x=-1,0,1
function addMouth(voxels: VoxelCell[], style: number): void {
	const mc = "#CC3333"; // 입술 기본색
	const md = "#993333"; // 어두운 입술
	const mz = 2; // 얼굴 앞면(z=1) 위로 돌출
	const wt = "#F0F0EE"; // 이빨 흰색
	const tg = "#FF8888"; // 혀 분홍

	switch (style) {
		case 0: {
			// 미소 - U자형
			px(voxels, -1, 6, mc, mz);
			px(voxels, 0, 5, mc, mz);
			px(voxels, 1, 6, mc, mz);
			break;
		}
		case 1: {
			// 무표정 - 직선
			px(voxels, -1, 6, md, mz);
			px(voxels, 0, 6, md, mz);
			px(voxels, 1, 6, md, mz);
			break;
		}
		case 2: {
			// 활짝웃음 - 이빨 보이는 큰 웃음
			px(voxels, -2, 6, mc, mz); // 왼쪽 코너
			px(voxels, 2, 6, mc, mz); // 오른쪽 코너
			px(voxels, -1, 6, wt, mz); // 이빨
			px(voxels, 0, 6, wt, mz);
			px(voxels, 1, 6, wt, mz);
			px(voxels, -1, 5, mc, mz); // 아랫입술
			px(voxels, 0, 5, mc, mz);
			px(voxels, 1, 5, mc, mz);
			break;
		}
		case 3: {
			// 삐죽 - 역 U자 (삐진 표정)
			px(voxels, -1, 5, mc, mz);
			px(voxels, 0, 6, mc, mz);
			px(voxels, 1, 5, mc, mz);
			break;
		}
		case 4: {
			// O형 - 동그란 O 입
			px(voxels, -1, 6, mc, mz);
			px(voxels, 0, 6, mc, mz);
			px(voxels, 1, 6, mc, mz);
			px(voxels, -1, 5, mc, mz);
			px(voxels, 0, 5, "#222222", mz);
			px(voxels, 1, 5, mc, mz);
			break;
		}
		case 5: {
			// 혀내밀기 - 혀 돌출
			px(voxels, -1, 6, mc, mz);
			px(voxels, 1, 6, mc, mz);
			px(voxels, 0, 6, wt, mz);
			px(voxels, 0, 5, tg, mz); // 혀
			break;
		}
		case 6: {
			// 이빨 - 이를 드러낸 미소
			px(voxels, -1, 6, wt, mz);
			px(voxels, 0, 6, wt, mz);
			px(voxels, 1, 6, wt, mz);
			px(voxels, -1, 5, mc, mz);
			px(voxels, 0, 5, mc, mz);
			px(voxels, 1, 5, mc, mz);
			break;
		}
		case 7: {
			// 송곳니 - 흡혈귀 송곳니
			px(voxels, -2, 6, mc, mz);
			px(voxels, 2, 6, mc, mz);
			px(voxels, -1, 6, wt, mz);
			px(voxels, 1, 6, wt, mz);
			px(voxels, -1, 5, wt, mz); // 왼쪽 송곳니
			px(voxels, 1, 5, wt, mz); // 오른쪽 송곳니
			px(voxels, 0, 5, mc, mz); // 가운데 공간
			break;
		}
		case 8: {
			// 입술물기 - 아랫입술 약간 물기
			px(voxels, -1, 6, mc, mz);
			px(voxels, 0, 6, wt, mz); // 물린 부분
			px(voxels, 1, 6, mc, mz);
			px(voxels, 0, 5, mc, mz);
			break;
		}
		case 9: {
			// 마스크 - 입 가린 형태 (기본 미소)
			px(voxels, -1, 6, mc, mz);
			px(voxels, 0, 5, mc, mz);
			px(voxels, 1, 6, mc, mz);
			break;
		}
		case 10: {
			// 씩웃음 - 한쪽만 올라간 스마크
			px(voxels, 0, 6, mc, mz);
			px(voxels, 1, 6, mc, mz);
			px(voxels, 2, 5, mc, mz);
			break;
		}
		case 11: {
			// 공포입 - 크게 벌린 입
			px(voxels, -2, 6, md, mz);
			px(voxels, 2, 6, md, mz);
			px(voxels, -1, 6, "#1A1A1A", mz);
			px(voxels, 0, 6, "#1A1A1A", mz);
			px(voxels, 1, 6, "#1A1A1A", mz);
			px(voxels, -1, 5, "#1A1A1A", mz);
			px(voxels, 0, 5, wt, mz);
			px(voxels, 1, 5, "#1A1A1A", mz);
			px(voxels, -1, 4, "#1A1A1A", mz);
			px(voxels, 0, 4, "#1A1A1A", mz);
			px(voxels, 1, 4, "#1A1A1A", mz);
			break;
		}
		case 12: {
			// 지퍼입 - 지퍼 닫힌 모양
			px(voxels, -2, 6, "#888888", mz);
			px(voxels, -1, 6, "#CCCCCC", mz);
			px(voxels, 0, 6, "#888888", mz);
			px(voxels, 1, 6, "#CCCCCC", mz);
			px(voxels, 2, 6, "#888888", mz);
			break;
		}
		case 13: {
			// 고양이입 - w 모양
			px(voxels, -1, 6, mc, mz);
			px(voxels, 0, 5, mc, mz);
			px(voxels, 1, 6, mc, mz);
			px(voxels, -2, 5, mc, mz);
			px(voxels, 2, 5, mc, mz);
			break;
		}
		default: {
			px(voxels, -1, 6, mc, mz);
			px(voxels, 0, 5, mc, mz);
			px(voxels, 1, 6, mc, mz);
		}
	}
}

// ─── 귀걸이 ────────────────────────────────────────────────────
// 귀 위치: x=-5 (왼쪽), x=4 (오른쪽), y=7,8
function addEarrings(voxels: VoxelCell[], style: number): void {
	if (style === 0) return;
	const ez = 1; // 귀 옆, 얼굴과 동일 레이어

	switch (style) {
		case 1: {
			// 스터드 - 금색 작은 원
			px(voxels, -5, 8, "#FFD700", ez);
			px(voxels, 4, 8, "#FFD700", ez);
			break;
		}
		case 2: {
			// 링형 - 고리 모양
			px(voxels, -5, 7, "#CCAA00", ez);
			px(voxels, -5, 8, "#CCAA00", ez);
			px(voxels, -6, 7, "#CCAA00", ez);
			px(voxels, 4, 7, "#CCAA00", ez);
			px(voxels, 4, 8, "#CCAA00", ez);
			px(voxels, 5, 7, "#CCAA00", ez);
			break;
		}
		case 3: {
			// 드롭형 - 아래로 늘어지는 펜던트
			px(voxels, -5, 8, "#9955DD", ez);
			px(voxels, -5, 6, "#BB77FF", ez); // 드롭
			px(voxels, 4, 8, "#9955DD", ez);
			px(voxels, 4, 6, "#BB77FF", ez);
			break;
		}
		case 4: {
			// 크로스 - 십자 모양
			px(voxels, -5, 8, "#CCCCCC", ez);
			px(voxels, -5, 6, "#CCCCCC", ez);
			px(voxels, -6, 7, "#CCCCCC", ez);
			px(voxels, 4, 8, "#CCCCCC", ez);
			px(voxels, 4, 6, "#CCCCCC", ez);
			px(voxels, 5, 7, "#CCCCCC", ez);
			break;
		}
		case 5: {
			// 별모양 - 별 모양 방사형
			px(voxels, -5, 8, "#FFD700", ez);
			px(voxels, -5, 6, "#FFD700", ez);
			px(voxels, -6, 7, "#FFD700", ez);
			px(voxels, -4, 7, "#FFD700", ez);
			px(voxels, 4, 8, "#FFD700", ez);
			px(voxels, 4, 6, "#FFD700", ez);
			px(voxels, 5, 7, "#FFD700", ez);
			px(voxels, 3, 7, "#FFD700", ez);
			break;
		}
		case 6: {
			// 하트 - 분홍 하트
			px(voxels, -5, 9, "#FF69B4", ez);
			px(voxels, -4, 9, "#FF69B4", ez);
			px(voxels, -5, 8, "#FF1493", ez);
			px(voxels, 4, 9, "#FF69B4", ez);
			px(voxels, 5, 9, "#FF69B4", ez);
			px(voxels, 4, 8, "#FF1493", ez);
			break;
		}
		case 7: {
			// 해골 - 흰 해골 모양
			px(voxels, -5, 8, "#EEEEEE", ez);
			px(voxels, -6, 8, "#EEEEEE", ez);
			px(voxels, -5, 7, "#333333", ez);
			px(voxels, -6, 7, "#333333", ez);
			px(voxels, -6, 6, "#EEEEEE", ez);
			px(voxels, 4, 8, "#EEEEEE", ez);
			px(voxels, 5, 8, "#EEEEEE", ez);
			px(voxels, 4, 7, "#333333", ez);
			px(voxels, 5, 7, "#333333", ez);
			px(voxels, 5, 6, "#EEEEEE", ez);
			break;
		}
		case 8: {
			// 깃털 - 아래로 늘어지는 깃털
			px(voxels, -5, 8, "#BBDDFF", ez);
			px(voxels, -5, 7, "#99CCFF", ez);
			px(voxels, -6, 7, "#AADDFF", ez);
			px(voxels, -5, 6, "#88BBEE", ez);
			px(voxels, -6, 6, "#99CCFF", ez);
			px(voxels, -5, 5, "#77AADD", ez);
			px(voxels, 4, 8, "#BBDDFF", ez);
			px(voxels, 4, 7, "#99CCFF", ez);
			px(voxels, 5, 7, "#AADDFF", ez);
			px(voxels, 4, 6, "#88BBEE", ez);
			px(voxels, 5, 6, "#99CCFF", ez);
			px(voxels, 4, 5, "#77AADD", ez);
			break;
		}
		case 9: {
			// 뱀형 - 초록 뱀 고리
			px(voxels, -5, 8, "#44BB44", ez);
			px(voxels, -6, 8, "#228822", ez);
			px(voxels, -6, 7, "#44BB44", ez);
			px(voxels, -5, 7, "#228822", ez);
			px(voxels, 4, 8, "#44BB44", ez);
			px(voxels, 5, 8, "#228822", ez);
			px(voxels, 5, 7, "#44BB44", ez);
			px(voxels, 4, 7, "#228822", ez);
			break;
		}
		default:
			break;
	}
}

// ─── 마스크 ────────────────────────────────────────────────────
function addMask(voxels: VoxelCell[], maskStyle: number): void {
	if (maskStyle === 0) return;
	const mz = 3; // 마스크는 얼굴 맨 앞에 배치

	switch (maskStyle) {
		case 1: {
			// 가면 - 팬텀 화이트 마스크 (눈 위 절반)
			for (let y = 9; y <= 11; y++) {
				for (let x = -4; x <= 3; x++) {
					px(voxels, x, y, "#F0EEE8", mz);
				}
			}
			// 왼쪽 눈 구멍
			px(voxels, -3, 9, "#222222", mz + 1);
			px(voxels, -2, 9, "#222222", mz + 1);
			break;
		}
		case 2: {
			// 반다나 - 붉은 천 (코+입 부분)
			const bc = "#CC2222";
			const bd = "#AA1111";
			for (let x = -5; x <= 4; x++) {
				px(voxels, x, 5, bc, mz);
				px(voxels, x, 6, bc, mz);
				px(voxels, x, 7, bc, mz);
			}
			// 무늬
			for (let x = -5; x <= 4; x += 2) {
				px(voxels, x, 6, bd, mz + 1);
			}
			break;
		}
		case 3: {
			// 여우가면 - 주황색 반쪽 가면 (눈 부분)
			const fox = "#D4590B";
			const foxD = "#992200";
			for (let y = 8; y <= 12; y++) {
				for (let x = -4; x <= 3; x++) {
					px(voxels, x, y, fox, mz);
				}
			}
			// 여우 귀
			px(voxels, -5, 12, foxD, mz);
			px(voxels, -4, 13, foxD, mz);
			px(voxels, 4, 12, foxD, mz);
			px(voxels, 3, 13, foxD, mz);
			// 눈 구멍
			px(voxels, -3, 9, "#111111", mz + 1);
			px(voxels, -2, 9, "#111111", mz + 1);
			px(voxels, 1, 9, "#111111", mz + 1);
			px(voxels, 2, 9, "#111111", mz + 1);
			// 여우 코
			px(voxels, 0, 7, foxD, mz + 1);
			break;
		}
		case 4: {
			// 방독면 - 어두운 방호 마스크
			const gm = "#2A2A2A";
			const gml = "#444444";
			for (let x = -5; x <= 4; x++) {
				for (let y = 5; y <= 8; y++) {
					px(voxels, x, y, gm, mz);
				}
			}
			// 호흡기 필터 (원 2개)
			px(voxels, -2, 6, gml, mz + 1);
			px(voxels, -1, 6, gml, mz + 1);
			px(voxels, 1, 6, gml, mz + 1);
			px(voxels, 2, 6, gml, mz + 1);
			// 스트랩
			px(voxels, -5, 8, gm, mz);
			px(voxels, 4, 8, gm, mz);
			break;
		}
		case 5: {
			// 복면 - 전체 얼굴 덮는 검은 복면
			const fm = "#1A1A1A";
			for (let y = 5; y <= 12; y++) {
				for (let x = -5; x <= 4; x++) {
					px(voxels, x, y, fm, mz);
				}
			}
			// 눈 슬릿
			px(voxels, -3, 9, "#333333", mz + 1);
			px(voxels, -2, 9, "#444444", mz + 1);
			px(voxels, 1, 9, "#333333", mz + 1);
			px(voxels, 2, 9, "#444444", mz + 1);
			break;
		}
		case 6: {
			// 나비가면 - 눈 주변 날개형 가면
			const bm = "#220044";
			const bml = "#6600AA";
			// 왼쪽 날개
			for (let x = -5; x <= -1; x++) px(voxels, x, 9, bm, mz);
			px(voxels, -6, 10, bml, mz);
			px(voxels, -5, 10, bml, mz);
			px(voxels, -4, 10, bml, mz);
			// 오른쪽 날개
			for (let x = 0; x <= 4; x++) px(voxels, x, 9, bm, mz);
			px(voxels, 3, 10, bml, mz);
			px(voxels, 4, 10, bml, mz);
			px(voxels, 5, 10, bml, mz);
			// 눈 구멍
			px(voxels, -3, 9, "#AA44FF", mz + 1);
			px(voxels, -2, 9, "#BB55FF", mz + 1);
			px(voxels, 1, 9, "#AA44FF", mz + 1);
			px(voxels, 2, 9, "#BB55FF", mz + 1);
			break;
		}
		case 7: {
			// 해골마스크 - 흰 해골형 하반부
			const sk = "#EEEEEE";
			const skd = "#CCCCCC";
			for (let x = -4; x <= 3; x++) {
				for (let y = 5; y <= 8; y++) {
					px(voxels, x, y, sk, mz);
				}
			}
			// 해골 이빨 패턴
			px(voxels, -3, 5, skd, mz + 1);
			px(voxels, -1, 5, skd, mz + 1);
			px(voxels, 1, 5, skd, mz + 1);
			px(voxels, 3, 5, skd, mz + 1);
			// 코 구멍
			px(voxels, -1, 7, "#888888", mz + 1);
			px(voxels, 1, 7, "#888888", mz + 1);
			break;
		}
		case 8: {
			// 의사마스크 - 흰 수술 마스크
			const wm = "#EEEEEE";
			const wmd = "#DDDDDD";
			for (let x = -5; x <= 4; x++) {
				px(voxels, x, 5, wm, mz);
				px(voxels, x, 6, wm, mz);
				px(voxels, x, 7, wmd, mz);
			}
			// 수평 라인 (마스크 주름)
			for (let x = -4; x <= 3; x++) px(voxels, x, 6, "#CCCCCC", mz + 1);
			break;
		}
		default:
			break;
	}
}

// ─── 헤어 스타일 (20종 개별 구현) ──────────────────────────────
/**
 * 헤어 배경(y=9..12)과 확장 부분을 모두 담당한다.
 * buildVoxelCharacter에서 얼굴 루프보다 먼저 호출되어야 한다.
 */
function addHairStyle(
	voxels: VoxelCell[],
	style: number,
	hair: string,
	hairDark: string,
	skin: string,
): void {
	if (style === 13) return; // 삭발 — 헤어 없음

	// 내부 헬퍼: 직사각형 채우기
	const fill = (x1: number, x2: number, y1: number, y2: number, c = hair) => {
		for (let x = x1; x <= x2; x++) {
			for (let y = y1; y <= y2; y++) {
				px(voxels, x, y, c);
			}
		}
	};

	switch (style) {
		case 0: {
			// 숏컷 — 납작한 짧은 탑
			fill(-4, 3, 9, 12);
			for (let x = -3; x <= 2; x++) px(voxels, x, 13, hairDark);
			break;
		}
		case 1: {
			// 포니테일 — 중앙 위로 묶음
			fill(-4, 3, 9, 12);
			fill(-4, 3, 13, 13);
			px(voxels, -1, 14, hair);
			px(voxels, 0, 14, hair);
			px(voxels, -1, 15, hairDark);
			px(voxels, 0, 15, hair);
			px(voxels, 0, 16, hairDark);
			break;
		}
		case 2: {
			// 웨이브 — 물결 교차 패턴
			for (let x = -4; x <= 3; x++) {
				for (let y = 9; y <= 12; y++) {
					px(voxels, x, y, (x + y) % 2 === 0 ? hair : hairDark);
				}
			}
			fill(-4, 3, 13, 13);
			break;
		}
		case 3: {
			// 투블럭 — 언더컷 (아래 옆 밀기)
			fill(-4, 3, 11, 12); // 윗부분 풀 커버
			fill(-2, 1, 9, 10); // 아랫부분 중앙만
			fill(-4, 3, 13, 13);
			px(voxels, -4, 14, hair);
			px(voxels, 3, 14, hair); // 넓은 탑
			break;
		}
		case 4: {
			// 댄디컷 — 오른쪽 스윕
			fill(-4, 3, 9, 12);
			fill(-4, 3, 13, 13);
			px(voxels, 1, 14, hair);
			px(voxels, 2, 14, hair);
			px(voxels, 3, 14, hairDark);
			break;
		}
		case 5: {
			// 보브컷 — 귀 덮는 동글한 사이드
			fill(-4, 3, 9, 12);
			for (let y = 9; y <= 11; y++) {
				px(voxels, -5, y, hairDark);
				px(voxels, 4, y, hairDark);
			}
			fill(-4, 3, 13, 13);
			break;
		}
		case 6: {
			// 트윈테일 — 양옆 두 묶음
			fill(-4, 3, 9, 12);
			fill(-4, 3, 13, 13);
			// 왼쪽 꼬리
			px(voxels, -5, 12, hair);
			px(voxels, -5, 13, hair);
			px(voxels, -5, 14, hairDark);
			px(voxels, -6, 12, hairDark);
			px(voxels, -6, 13, hair);
			// 오른쪽 꼬리
			px(voxels, 4, 12, hair);
			px(voxels, 4, 13, hair);
			px(voxels, 4, 14, hairDark);
			px(voxels, 5, 12, hairDark);
			px(voxels, 5, 13, hair);
			break;
		}
		case 7: {
			// 리젠트 — 앞부분 높이 올라간 폼파두르
			fill(-4, 3, 9, 12);
			fill(-4, 3, 13, 13);
			px(voxels, -4, 14, hair);
			px(voxels, -3, 14, hair);
			px(voxels, -2, 14, hair);
			px(voxels, -3, 15, hairDark);
			px(voxels, -2, 15, hairDark);
			px(voxels, -2, 16, hairDark);
			break;
		}
		case 8: {
			// 스파이크 — 다중 뾰족 스파이크
			fill(-4, 3, 9, 12);
			px(voxels, -3, 13, hair);
			px(voxels, -3, 14, hairDark);
			px(voxels, -1, 13, hair);
			px(voxels, -1, 14, hair);
			px(voxels, -1, 15, hairDark);
			px(voxels, 1, 13, hair);
			px(voxels, 1, 14, hairDark);
			px(voxels, 3, 13, hairDark);
			break;
		}
		case 9: {
			// 모히칸 — 중앙 세로 띠만 (양 옆 민머리)
			fill(-1, 0, 9, 12);
			for (let y = 13; y <= 17; y++) {
				px(voxels, -1, y, hair);
				px(voxels, 0, y, hairDark);
			}
			px(voxels, -2, 13, hairDark);
			px(voxels, 1, 13, hairDark);
			break;
		}
		case 10: {
			// 장발 — 긴 사이드 확장
			fill(-4, 3, 9, 12);
			fill(-4, 3, 13, 13);
			for (let y = 5; y <= 12; y++) {
				px(voxels, -5, y, hairDark);
				px(voxels, 4, y, hairDark);
			}
			break;
		}
		case 11: {
			// 드레드 — 두꺼운 가닥이 아래로 늘어짐
			fill(-4, 3, 9, 12);
			fill(-4, 3, 13, 13);
			px(voxels, -4, 8, hairDark);
			px(voxels, -4, 7, hair);
			px(voxels, -4, 6, hairDark);
			px(voxels, -4, 5, hair);
			px(voxels, -2, 8, hair);
			px(voxels, -2, 7, hairDark);
			px(voxels, -2, 6, hair);
			px(voxels, 0, 8, hairDark);
			px(voxels, 0, 7, hair);
			px(voxels, 0, 6, hairDark);
			px(voxels, 2, 8, hair);
			px(voxels, 2, 7, hairDark);
			px(voxels, 2, 6, hair);
			px(voxels, 4, 8, hairDark);
			px(voxels, 4, 7, hair);
			px(voxels, 4, 6, hairDark);
			break;
		}
		case 12: {
			// 아프로 — 사방으로 펑키하게 넓음
			fill(-5, 4, 9, 12); // 얼굴보다 넓은 배경
			fill(-5, 4, 13, 13);
			px(voxels, -5, 8, hair);
			px(voxels, 4, 8, hair);
			break;
		}
		// case 13: 삭발 (return at top)
		case 14: {
			// 올백 — 납작하게 뒤로 넘김
			fill(-4, 3, 9, 12);
			fill(-4, 3, 13, 13);
			// 광택 느낌 (중앙 행 밝게)
			for (let x = -2; x <= 1; x++) px(voxels, x, 13, hair);
			break;
		}
		case 15: {
			// 앞머리 — 이마 위까지 내려오는 뱅
			fill(-4, 3, 9, 12);
			fill(-4, 3, 13, 13);
			// 뱅 (얼굴 앞면 위로 드리움)
			for (let x = -3; x <= 2; x++) px(voxels, x, 8, hairDark, 2);
			break;
		}
		case 16: {
			// 가르마 — 측면 가르마 라인
			fill(-4, 3, 9, 12);
			fill(-4, 3, 13, 13);
			// 가르마 라인 (피부색으로 hair 위에 표시)
			px(voxels, 0, 12, skin, 2);
			px(voxels, 0, 13, skin, 2);
			px(voxels, -1, 12, skin, 2);
			break;
		}
		case 17: {
			// 만두머리 — 정수리 위에 동글한 번
			fill(-4, 3, 9, 12);
			fill(-4, 3, 13, 13);
			fill(-2, 1, 14, 15, hairDark);
			px(voxels, -1, 16, hair);
			px(voxels, 0, 16, hair);
			break;
		}
		case 18: {
			// 레이어드 — 층층이 명암 패턴
			for (let x = -4; x <= 3; x++) {
				for (let y = 9; y <= 12; y++) {
					px(voxels, x, y, y % 2 === 0 ? hairDark : hair);
				}
			}
			for (let x = -4; x <= 3; x++) {
				px(voxels, x, 13, x % 2 === 0 ? hair : hairDark);
			}
			px(voxels, -4, 14, hair);
			px(voxels, -2, 14, hairDark);
			px(voxels, 0, 14, hair);
			px(voxels, 2, 14, hairDark);
			break;
		}
		case 19: {
			// 울프컷 — 불규칙한 층진 볼륨
			fill(-4, 3, 9, 12);
			px(voxels, -5, 11, hair);
			px(voxels, -5, 12, hairDark);
			px(voxels, 4, 11, hair);
			px(voxels, 4, 12, hairDark);
			// 불규칙 탑
			px(voxels, -4, 13, hairDark);
			px(voxels, -3, 13, hair);
			px(voxels, -2, 14, hairDark);
			px(voxels, -1, 13, hair);
			px(voxels, 0, 14, hair);
			px(voxels, 1, 13, hairDark);
			px(voxels, 2, 13, hair);
			px(voxels, 3, 14, hairDark);
			break;
		}
		case 20: {
			// 버섯컷 — 머쉬룸 컷 (아래가 직선, 위가 반원형 볼륨)
			fill(-4, 3, 9, 12);
			fill(-5, 4, 13, 14); // 옆으로 더 넓은 탑
			px(voxels, -4, 15, hair);
			px(voxels, -3, 15, hair);
			px(voxels, 2, 15, hair);
			px(voxels, 3, 15, hair);
			// 앞머리 (일자로 내려오는 뱅)
			for (let x = -3; x <= 2; x++) px(voxels, x, 8, hairDark, 2);
			break;
		}
		case 21: {
			// 사이드업 — 한쪽으로 틀어 올린 반업
			fill(-4, 3, 9, 12);
			// 오른쪽만 위로 올림
			px(voxels, 1, 13, hair);
			px(voxels, 2, 13, hair);
			px(voxels, 3, 13, hair);
			px(voxels, 2, 14, hairDark);
			px(voxels, 3, 14, hair);
			px(voxels, 3, 15, hairDark);
			// 왼쪽 아래로 내림
			px(voxels, -5, 11, hair);
			px(voxels, -5, 10, hairDark);
			px(voxels, -5, 9, hair);
			px(voxels, -5, 8, hairDark);
			break;
		}
		case 22: {
			// 헝클어진 — 뾰족뾰족 사방으로 뻗침
			fill(-4, 3, 9, 12);
			// 삐죽삐죽 끝
			px(voxels, -5, 12, hairDark);
			px(voxels, -5, 11, hair);
			px(voxels, 4, 12, hairDark);
			px(voxels, 4, 11, hair);
			px(voxels, -4, 13, hair);
			px(voxels, -3, 14, hairDark);
			px(voxels, -2, 13, hair);
			px(voxels, -1, 14, hair);
			px(voxels, 0, 13, hairDark);
			px(voxels, 1, 14, hair);
			px(voxels, 2, 13, hair);
			px(voxels, 3, 14, hairDark);
			break;
		}
		case 23: {
			// 롱포니 — 아래로 길게 늘어지는 포니테일
			fill(-4, 3, 9, 12);
			fill(-4, 3, 13, 13);
			// 뒤로 긴 꼬리 (낮은 z = 뒤쪽)
			px(voxels, 0, 12, hairDark);
			px(voxels, 0, 11, hair);
			px(voxels, 0, 10, hairDark);
			px(voxels, 0, 9, hair);
			px(voxels, 0, 8, hairDark);
			px(voxels, 0, 7, hair);
			px(voxels, 0, 6, hairDark);
			px(voxels, 0, 5, hair);
			px(voxels, 0, 4, hair);
			px(voxels, -1, 4, hairDark);
			break;
		}
		case 24: {
			// 크라운 브레이드 — 머리 위로 두른 땋은 머리띠
			fill(-4, 3, 9, 12);
			// 위쪽 땋은 머리띠 띠
			for (let x = -4; x <= 3; x++) {
				px(voxels, x, 13, x % 2 === 0 ? hair : hairDark);
			}
			px(voxels, -5, 12, hair);
			px(voxels, 4, 12, hair);
			px(voxels, -5, 11, hairDark);
			px(voxels, 4, 11, hairDark);
			break;
		}
		case 25: {
			// 피쉬테일 브레이드 — 물고기 꼬리 땋기 (측면으로)
			fill(-4, 3, 9, 12);
			fill(-4, 3, 13, 13);
			// 오른쪽 아래로 사선으로 늘어짐
			px(voxels, 4, 12, hair);
			px(voxels, 4, 11, hairDark);
			px(voxels, 5, 10, hair);
			px(voxels, 5, 9, hairDark);
			px(voxels, 4, 8, hair);
			px(voxels, 4, 7, hairDark);
			px(voxels, 3, 6, hair);
			px(voxels, 3, 5, hairDark);
			// 교차 패턴
			px(voxels, 5, 11, hairDark);
			px(voxels, 4, 10, hair);
			break;
		}
		default: {
			fill(-4, 3, 9, 12);
			for (let x = -3; x <= 2; x++) px(voxels, x, 13, hairDark);
		}
	}
}

// ─── 메인 빌더 ─────────────────────────────────────────────────
export function buildVoxelCharacter(avatar: AvatarState): VoxelCell[] {
	const skin = SKIN_TONES[avatar.skinTone] ?? "#FFDBB0";
	const hair = HAIR_COLORS[avatar.hairColor] ?? "#1A1A1A";
	const hairDark = darken(hair, 0.2);
	const topColor = TOP_COLORS[avatar.top] ?? "#DDDDDD";
	const topDark = darken(topColor, 0.2);
	const legColor = LEG_COLORS[avatar.skinTone % LEG_COLORS.length] ?? "#2233AA";
	const shoeColor = SHOE_COLORS[avatar.skinTone % SHOE_COLORS.length] ?? "#111111";
	// 조끼 여부: 팔 색상 결정 (깊이 레이어에서도 사용)
	const isVest = avatar.top === 10;
	const armColor = isVest ? skin : topColor;
	const armDark = isVest ? darken(skin, 0.1) : topDark;

	const voxels: VoxelCell[] = [];

	// ── 3D 솔리드 레이어 ─────────────────────────────────────────────
	// 모든 z값은 정수. upscale2x는 z를 변환하지 않음.
	// 각 파츠를 z=-2~1(4레이어) 또는 z=-3~1(5레이어)로 꽉 채워 솔리드 블록 생성.
	// 뒤쪽 z일수록 darken, 앞쪽은 원색 또는 약간 밝게.
	//
	// ── 머리 솔리드 (x=-4..3, y=5..12, z=-3..1) ──
	for (let dz = -3; dz <= 1; dz++) {
		for (let y = 5; y <= 12; y++) {
			const useHairZone = y >= 9;
			let c: string;
			if (dz <= -2) c = useHairZone ? hairDark : darken(skin, 0.2);
			else if (dz === -1) c = useHairZone ? hair : darken(skin, 0.1);
			else c = useHairZone ? hair : skin; // z=0,1: 앞면
			for (let x = -4; x <= 3; x++) {
				px(voxels, x, y, c, dz);
			}
		}
		// 귀 (z=-1..0만)
		if (dz >= -1 && dz <= 0) {
			px(voxels, -5, 7, darken(skin, 0.1), dz);
			px(voxels, -5, 8, darken(skin, 0.1), dz);
			px(voxels, 4, 7, darken(skin, 0.1), dz);
			px(voxels, 4, 8, darken(skin, 0.1), dz);
		}
	}

	// ── 목 솔리드 (z=-1..0) ──
	for (let dz = -1; dz <= 0; dz++) {
		for (let x = -1; x <= 1; x++) {
			px(voxels, x, 4, darken(skin, 0.1), dz);
		}
	}

	// ── 몸통 솔리드 (x=-4..3, y=-1..3, z=-2..1) ──
	for (let dz = -2; dz <= 1; dz++) {
		const bodyC = dz <= -2 ? darken(topColor, 0.25) : dz === -1 ? topDark : topColor;
		for (let x = -4; x <= 3; x++) {
			for (let y = -1; y <= 3; y++) {
				px(voxels, x, y, bodyC, dz);
			}
		}
	}

	// ── 팔 솔리드 (z=-1..1) ──
	for (let dz = -1; dz <= 1; dz++) {
		const armC = dz < 0 ? armDark : armColor;
		for (let y = 0; y <= 3; y++) {
			px(voxels, -5, y, armC, dz);
			px(voxels, -6, y, armDark, dz);
			px(voxels, 4, y, armC, dz);
			px(voxels, 5, y, armDark, dz);
		}
	}

	// ── 다리 솔리드 (z=-1..1) ──
	for (let dz = -1; dz <= 1; dz++) {
		const legC = dz < 0 ? darken(legColor, 0.15) : legColor;
		for (let y = -5; y <= -2; y++) {
			px(voxels, -3, y, legC, dz);
			px(voxels, -2, y, darken(legC, 0.1), dz);
			px(voxels, 1, y, legC, dz);
			px(voxels, 2, y, darken(legC, 0.1), dz);
		}
	}

	// ── 발 솔리드 (z=-1..1) ──
	const shoeD = darken(shoeColor, 0.15);
	for (let dz = -1; dz <= 1; dz++) {
		const sc = dz < 0 ? shoeD : shoeColor;
		px(voxels, -3, -6, sc, dz);
		px(voxels, -2, -6, sc, dz);
		px(voxels, -4, -6, sc, dz);
		px(voxels, 1, -6, sc, dz);
		px(voxels, 2, -6, sc, dz);
		px(voxels, 3, -6, sc, dz);
	}

	// ── 헤어 확장 솔리드 (y=13..17, z=-2..1, 삭발 제외) ──
	if (avatar.hairStyle !== 13) {
		for (let dz = -2; dz <= 1; dz++) {
			const c = dz <= -2 ? hairDark : dz < 0 ? hair : darken(hair, 0.05);
			for (let y = 13; y <= 17; y++) {
				for (let x = -4; x <= 3; x++) {
					px(voxels, x, y, c, dz);
				}
			}
		}
	}

	// ── 헤어 스타일 (얼굴보다 먼저 그려 z=0 배경 확보) ──────────
	addHairStyle(voxels, avatar.hairStyle, hair, hairDark, skin);

	// ── 얼굴 기본 (8×8, y=5..12) — 항상 피부색, 헤어는 addHairStyle이 담당 ─
	for (let y = 5; y <= 12; y++) {
		for (let x = -4; x <= 3; x++) {
			px(voxels, x, y, skin);
		}
	}

	// ── 귀 ─────────────────────────────────────────────────────
	px(voxels, -5, 7, skin);
	px(voxels, -5, 8, skin);
	px(voxels, 4, 7, skin);
	px(voxels, 4, 8, skin);

	// ── 얼굴 피처 ────────────────────────────────────────────────
	addEyes(voxels, avatar.eyes, skin);
	addEyebrows(voxels, avatar.eyebrows, darken(hair, 0.1));
	addNose(voxels, avatar.nose, skin);
	addMouth(voxels, avatar.mouth);
	addEarrings(voxels, avatar.earrings);
	addMask(voxels, avatar.mask);

	// ── 목 ─────────────────────────────────────────────────────
	for (let x = -1; x <= 1; x++) {
		px(voxels, x, 4, skin);
	}

	// ── 몸통 (8×5, y=-1..3) ─────────────────────────────────────
	for (let x = -4; x <= 3; x++) {
		for (let y = -1; y <= 3; y++) {
			const shade = y >= 2 ? topColor : y === 1 ? topColor : topDark;
			px(voxels, x, y, shade);
		}
	}
	// 옷 기본 솔기 (중앙 세로선)
	px(voxels, 0, 2, topDark);
	px(voxels, 0, 1, topDark);
	px(voxels, 0, 0, topDark);

	// ── 왼팔 ────────────────────────────────────────────────────
	for (let y = 0; y <= 3; y++) {
		px(voxels, -5, y, armColor);
		px(voxels, -6, y, armDark);
	}
	px(voxels, -5, -1, skin);
	px(voxels, -6, -1, skin);

	// ── 오른팔 ──────────────────────────────────────────────────
	for (let y = 0; y <= 3; y++) {
		px(voxels, 4, y, armColor);
		px(voxels, 5, y, armDark);
	}
	px(voxels, 4, -1, skin);
	px(voxels, 5, -1, skin);

	// ── 상의 스타일 디테일 ────────────────────────────────────────
	addTopDetails(voxels, avatar.top, topDark, skin);

	// ── 다리 ────────────────────────────────────────────────────
	for (let y = -5; y <= -2; y++) {
		px(voxels, -3, y, legColor);
		px(voxels, -2, y, darken(legColor, 0.15));
		px(voxels, 1, y, legColor);
		px(voxels, 2, y, darken(legColor, 0.15));
	}

	// ── 발 ──────────────────────────────────────────────────────
	px(voxels, -3, -6, shoeColor);
	px(voxels, -2, -6, shoeColor);
	px(voxels, -4, -6, shoeColor);
	px(voxels, 1, -6, shoeColor);
	px(voxels, 2, -6, shoeColor);
	px(voxels, 3, -6, shoeColor);

	// ── 모자 ────────────────────────────────────────────────────
	addHat(voxels, avatar.hat, hair, hairDark);

	// ── 안경 ────────────────────────────────────────────────────
	addGlasses(voxels, avatar.glasses);

	// ── 볼터치 ──────────────────────────────────────────────────
	addBlush(voxels, avatar.blush);

	// ── 들고 있는 아이템 (z=2: 캐릭터 앞으로 돌출) ─────────────────
	const itemDef = HELD_ITEMS[avatar.heldItem] ?? [];
	const armBaseX = 4;
	const armBaseY = 0;
	for (const { dx, dy, color } of itemDef) {
		// 아이템을 z=2 (앞으로 강하게 돌출)로 배치
		px(voxels, armBaseX + (dx - 5), armBaseY + (dy - 2), color, 2);
		// 아이템 깊이도 추가 (z=1)
		px(voxels, armBaseX + (dx - 5), armBaseY + (dy - 2), darken(color, 0.15), 1);
	}

	// ── 펫 (업스케일 전, 왼쪽 하단에 배치) ─────────────────────────
	addPet(voxels, avatar.pet);

	return upscale2x(voxels);
}

// ─── 볼터치 ────────────────────────────────────────────────────
function addBlush(voxels: VoxelCell[], style: number): void {
	if (style === 0) return;
	const bz = 2; // 얼굴 앞면 위로

	switch (style) {
		case 1: {
			// 분홍 볼터치
			px(voxels, -4, 7, "#FFBBBB", bz);
			px(voxels, -3, 7, "#FFAAAA", bz);
			px(voxels, 3, 7, "#FFBBBB", bz);
			px(voxels, 2, 7, "#FFAAAA", bz);
			break;
		}
		case 2: {
			// 파란 볼터치 (당황)
			px(voxels, -4, 7, "#BBBBFF", bz);
			px(voxels, -3, 7, "#AAAAEE", bz);
			px(voxels, 3, 7, "#BBBBFF", bz);
			px(voxels, 2, 7, "#AAAAEE", bz);
			break;
		}
		case 3: {
			// 주근깨
			px(voxels, -3, 8, "#AA7755", bz);
			px(voxels, -1, 8, "#AA7755", bz);
			px(voxels, -4, 7, "#AA7755", bz);
			px(voxels, -2, 7, "#AA7755", bz);
			px(voxels, 0, 8, "#AA7755", bz);
			px(voxels, 2, 8, "#AA7755", bz);
			px(voxels, 1, 7, "#AA7755", bz);
			px(voxels, 3, 7, "#AA7755", bz);
			break;
		}
		case 4: {
			// 눈물 (볼 위 눈물 자국)
			px(voxels, -3, 8, "#AADDFF", bz);
			px(voxels, -3, 7, "#88CCFF", bz);
			px(voxels, -3, 6, "#66BBFF", bz);
			px(voxels, 2, 8, "#AADDFF", bz);
			px(voxels, 2, 7, "#88CCFF", bz);
			px(voxels, 2, 6, "#66BBFF", bz);
			break;
		}
		case 5: {
			// 별빛 (반짝이는 볼)
			px(voxels, -4, 7, "#FFE0FF", bz);
			px(voxels, -3, 8, "#FFCCFF", bz);
			px(voxels, 3, 7, "#FFE0FF", bz);
			px(voxels, 2, 8, "#FFCCFF", bz);
			// 별 반짝
			px(voxels, -4, 8, "#FFFFFF", bz + 1);
			px(voxels, 3, 8, "#FFFFFF", bz + 1);
			break;
		}
		default:
			break;
	}
}

// ─── 펫 ────────────────────────────────────────────────────────
function addPet(voxels: VoxelCell[], petStyle: number): void {
	if (petStyle === 0) return;
	// 펫은 캐릭터 왼쪽 하단에 위치 (x=-8..-6, y=-4..-1)
	const px2 = (x: number, y: number, c: string, z = 0) =>
		voxels.push({ position: [x, y, z], color: c });

	switch (petStyle) {
		case 1: {
			// 고양이
			const c = "#888888";
			const cd = "#555555";
			const w = "#FFFFFF";
			// 몸통
			px2(-8, -1, c);
			px2(-7, -1, c);
			px2(-6, -1, c);
			px2(-8, -2, c);
			px2(-7, -2, cd);
			px2(-6, -2, c);
			// 머리
			px2(-8, 0, c);
			px2(-7, 0, c);
			px2(-6, 0, c);
			// 귀
			px2(-8, 1, cd);
			px2(-6, 1, cd);
			// 눈
			px2(-8, 0, "#44AA44", 1);
			px2(-6, 0, "#44AA44", 1);
			// 꼬리
			px2(-5, -2, c);
			px2(-5, -1, c);
			px2(-5, 0, cd);
			// 흰 가슴털
			px2(-7, -1, w, 1);
			break;
		}
		case 2: {
			// 강아지
			const c = "#CC8844";
			const cd = "#AA6622";
			const w = "#FFEECC";
			// 몸통
			px2(-8, -2, c);
			px2(-7, -2, c);
			px2(-6, -2, c);
			px2(-8, -1, c);
			px2(-7, -1, w);
			px2(-6, -1, c);
			// 머리
			px2(-8, 0, c);
			px2(-7, 0, c);
			px2(-6, 0, c);
			// 귀 (늘어진)
			px2(-9, -1, cd);
			px2(-9, 0, cd);
			px2(-5, -1, cd);
			px2(-5, 0, cd);
			// 눈과 코
			px2(-8, 0, "#222222", 1);
			px2(-6, 0, "#222222", 1);
			px2(-7, -1, "#884422", 1);
			// 꼬리
			px2(-5, -3, c);
			px2(-4, -2, c);
			break;
		}
		case 3: {
			// 새
			const c = "#FFCC00";
			const w = "#FFFFFF";
			const b = "#FF8800";
			// 몸통
			px2(-7, -1, c);
			px2(-6, -1, c);
			// 날개
			px2(-8, -1, w);
			px2(-5, -1, w);
			// 머리
			px2(-7, 0, c);
			px2(-6, 0, c);
			// 부리
			px2(-5, 0, b);
			// 눈
			px2(-7, 0, "#222222", 1);
			// 볏
			px2(-7, 1, b);
			px2(-6, 1, b);
			break;
		}
		case 4: {
			// 드래곤
			const c = "#44AA44";
			const cd = "#228822";
			const fr = "#FF6600";
			// 몸통
			px2(-8, -2, c);
			px2(-7, -2, c);
			px2(-6, -2, c);
			px2(-8, -1, c);
			px2(-7, -1, cd);
			px2(-6, -1, c);
			// 머리
			px2(-7, 0, c);
			px2(-6, 0, c);
			// 뿔
			px2(-8, 1, cd);
			px2(-6, 1, cd);
			// 눈
			px2(-7, 0, "#FF4400", 1);
			px2(-6, 0, "#FF4400", 1);
			// 불꽃
			px2(-5, 0, fr);
			px2(-4, 0, "#FF8800");
			// 꼬리
			px2(-5, -2, cd);
			px2(-4, -3, cd);
			px2(-3, -4, c);
			break;
		}
		case 5: {
			// 토끼
			const c = "#EEEEEE";
			const p = "#FFAACC";
			// 몸통
			px2(-8, -2, c);
			px2(-7, -2, c);
			px2(-6, -2, c);
			px2(-8, -1, c);
			px2(-7, -1, c);
			px2(-6, -1, c);
			// 머리
			px2(-8, 0, c);
			px2(-7, 0, c);
			px2(-6, 0, c);
			// 귀 (긴 귀)
			px2(-8, 1, c);
			px2(-8, 2, p);
			px2(-6, 1, c);
			px2(-6, 2, p);
			// 눈과 코
			px2(-8, 0, "#FF99CC", 1);
			px2(-6, 0, "#FF99CC", 1);
			px2(-7, -1, p, 1);
			// 꼬리
			px2(-5, -2, c);
			break;
		}
		case 6: {
			// 여우
			const c = "#DD6600";
			const w = "#FFFFFF";
			const b = "#1A1A1A";
			// 몸통
			px2(-8, -2, c);
			px2(-7, -2, c);
			px2(-6, -2, c);
			px2(-8, -1, c);
			px2(-7, -1, w);
			px2(-6, -1, c);
			// 머리
			px2(-8, 0, c);
			px2(-7, 0, c);
			px2(-6, 0, c);
			// 귀 (뾰족)
			px2(-8, 1, c);
			px2(-8, 2, "#CC5500");
			px2(-6, 1, c);
			px2(-6, 2, "#CC5500");
			// 눈과 코
			px2(-8, 0, "#222222", 1);
			px2(-6, 0, "#222222", 1);
			px2(-7, -1, b, 1);
			// 꼬리 (흰 끝)
			px2(-5, -1, c);
			px2(-5, -2, c);
			px2(-4, -2, w);
			break;
		}
		default:
			break;
	}
}

// ─── 2x 업스케일: XY만 각 복셀을 2×2로 확장, z는 그대로 ──────────
// z를 변환하지 않으므로 모든 z값을 정수로 관리해야 빈틈 없는 솔리드 입체가 됨
function upscale2x(voxels: VoxelCell[]): VoxelCell[] {
	const result: VoxelCell[] = [];
	const seen = new Set<string>();
	for (const {
		position: [x, y, z],
		color,
	} of voxels) {
		for (let dy = 0; dy < 2; dy++) {
			for (let dx = 0; dx < 2; dx++) {
				const nx = x * 2 + dx;
				const ny = y * 2 + dy;
				const key = `${nx},${ny},${z}`;
				if (!seen.has(key)) {
					seen.add(key);
					result.push({ position: [nx, ny, z], color });
				}
			}
		}
	}
	return result;
}

// ─── 모자 ──────────────────────────────────────────────────────
function addHat(voxels: VoxelCell[], hatId: number, hair: string, hairDark: string): void {
	switch (hatId) {
		case 0:
			break;
		case 1: {
			// 비니
			for (let x = -4; x <= 3; x++) {
				px(voxels, x, 13, hair);
				px(voxels, x, 14, hairDark);
				// 깊이
				px(voxels, x, 13, darken(hair, 0.15), -1);
				px(voxels, x, 14, darken(hairDark, 0.1), -1);
			}
			px(voxels, -3, 15, hair);
			px(voxels, 2, 15, hair);
			px(voxels, -3, 15, darken(hair, 0.15), -1);
			px(voxels, 2, 15, darken(hair, 0.15), -1);
			break;
		}
		case 2: {
			// 왕관
			const gold = "#FFD700";
			const goldD = "#AA8800";
			for (let x = -4; x <= 3; x++) {
				px(voxels, x, 13, goldD);
				px(voxels, x, 13, darken(goldD, 0.2), -1);
			}
			px(voxels, -4, 14, gold);
			px(voxels, -2, 14, gold);
			px(voxels, -2, 15, gold);
			px(voxels, 0, 14, gold);
			px(voxels, 0, 15, gold);
			px(voxels, 0, 16, gold);
			px(voxels, 2, 14, gold);
			px(voxels, 2, 15, gold);
			px(voxels, 3, 14, gold);
			// 왕관 뾰족부분 깊이
			for (const [x, y] of [
				[-4, 14],
				[-2, 14],
				[-2, 15],
				[0, 14],
				[0, 15],
				[0, 16],
				[2, 14],
				[2, 15],
				[3, 14],
			] as [number, number][]) {
				px(voxels, x, y, darken(gold, 0.25), -1);
			}
			break;
		}
		case 3: {
			// 야구모자
			const cap = "#CC2222";
			const capD = darken(cap, 0.1);
			for (let x = -4; x <= 3; x++) {
				px(voxels, x, 13, cap);
				px(voxels, x, 14, capD);
				px(voxels, x, 13, darken(cap, 0.2), -1);
				px(voxels, x, 14, darken(capD, 0.2), -1);
			}
			for (let x = 4; x <= 6; x++) px(voxels, x, 12, cap); // 챙 (깊이 없음)
			break;
		}
		case 4: {
			// 마녀모자
			const blk = "#1A1A1A";
			for (let x = -5; x <= 4; x++) {
				px(voxels, x, 13, blk);
				px(voxels, x, 13, "#2A2A2A", -1);
			}
			for (let x = -3; x <= 2; x++) {
				px(voxels, x, 14, blk);
				px(voxels, x, 14, "#2A2A2A", -1);
			}
			px(voxels, -1, 15, blk);
			px(voxels, 0, 15, blk);
			px(voxels, 1, 15, blk);
			px(voxels, 0, 16, blk);
			px(voxels, 0, 17, blk);
			// 원뿔 깊이
			for (const [x, y] of [
				[-1, 15],
				[0, 15],
				[1, 15],
				[0, 16],
				[0, 17],
			] as [number, number][]) {
				px(voxels, x, y, "#2A2A2A", -1);
			}
			break;
		}
		case 5: // 헤일로 — 얇은 링이므로 깊이 생략
			for (let x = -5; x <= 4; x++) px(voxels, x, 16, "#FFFFAA");
			px(voxels, -4, 15, "#FFFFAA");
			px(voxels, 3, 15, "#FFFFAA");
			break;
		case 6: {
			// 고깔모자
			const cone1 = "#AA44AA";
			const cone2 = "#BB55BB";
			const cone3 = "#CC66CC";
			px(voxels, -1, 13, cone1);
			px(voxels, 0, 13, cone1);
			px(voxels, 1, 13, cone1);
			px(voxels, 0, 14, cone1);
			px(voxels, 0, 15, cone2);
			px(voxels, 0, 16, cone3);
			// 고깔 깊이
			px(voxels, -1, 13, darken(cone1, 0.2), -1);
			px(voxels, 0, 13, darken(cone1, 0.2), -1);
			px(voxels, 1, 13, darken(cone1, 0.2), -1);
			px(voxels, 0, 14, darken(cone1, 0.2), -1);
			break;
		}
		case 7: {
			// 헬멧
			const hel = "#666666";
			const helD = "#555555";
			const vis = "#88AACC";
			for (let x = -5; x <= 4; x++) {
				px(voxels, x, 13, hel);
				px(voxels, x, 13, darken(hel, 0.2), -1);
				if (x >= -4 && x <= 3) {
					px(voxels, x, 14, helD);
					px(voxels, x, 14, darken(helD, 0.2), -1);
				}
			}
			px(voxels, -5, 12, hel);
			px(voxels, 4, 12, hel);
			px(voxels, -5, 12, darken(hel, 0.2), -1);
			px(voxels, 4, 12, darken(hel, 0.2), -1);
			px(voxels, -2, 14, vis);
			px(voxels, -1, 14, vis);
			px(voxels, 0, 14, vis);
			px(voxels, 1, 14, vis);
			break;
		}
		case 8: {
			// 두건 — 머리 전체 감싼 헝겊
			const cl = "#AA2211";
			const cld = darken(cl, 0.15);
			for (let x = -5; x <= 4; x++) {
				px(voxels, x, 13, cl);
				px(voxels, x, 13, cld, -1);
			}
			for (let x = -4; x <= 3; x++) {
				px(voxels, x, 14, cld);
				px(voxels, x, 14, darken(cld, 0.1), -1);
			}
			// 매듭 (이마 위)
			px(voxels, -1, 14, cl);
			px(voxels, 0, 14, cl);
			break;
		}
		case 9: {
			// 탐정모자 — 중절모 (페도라)
			const fc = "#332211";
			const fcd = darken(fc, 0.15);
			// 챙 (넓은 가장자리)
			for (let x = -6; x <= 5; x++) {
				px(voxels, x, 13, fcd);
				px(voxels, x, 13, darken(fcd, 0.2), -1);
			}
			// 모자 본체 (위로 올라감)
			for (let x = -3; x <= 2; x++) {
				px(voxels, x, 14, fc);
				px(voxels, x, 15, fc);
				px(voxels, x, 14, fcd, -1);
				px(voxels, x, 15, fcd, -1);
			}
			px(voxels, -2, 16, fc);
			px(voxels, -1, 16, fc);
			px(voxels, 0, 16, fc);
			px(voxels, 1, 16, fc);
			// 리본
			px(voxels, -3, 14, "#553311");
			px(voxels, 2, 14, "#553311");
			break;
		}
		case 10: {
			// 화관 — 꽃잎 장식 머리띠
			const stem = "#228822";
			const fl1 = "#FF6688";
			const fl2 = "#FFAACC";
			// 줄기 띠
			for (let x = -4; x <= 3; x++) px(voxels, x, 13, stem);
			// 꽃 장식
			px(voxels, -3, 14, fl1);
			px(voxels, -2, 13, fl2);
			px(voxels, -2, 14, fl1);
			px(voxels, 0, 14, fl2);
			px(voxels, 1, 13, fl1);
			px(voxels, 1, 14, fl2);
			px(voxels, -4, 13, fl1);
			px(voxels, 3, 13, fl2);
			break;
		}
		case 11: {
			// 냥귀 — 고양이 귀 머리띠
			const ec = "#FF88CC";
			const ecd = "#DD44AA";
			// 머리띠
			for (let x = -4; x <= 3; x++) px(voxels, x, 13, "#DDDDDD");
			// 왼쪽 귀
			px(voxels, -4, 14, ecd);
			px(voxels, -3, 15, ecd);
			px(voxels, -3, 16, ec);
			px(voxels, -2, 14, ecd);
			// 오른쪽 귀
			px(voxels, 1, 14, ecd);
			px(voxels, 2, 15, ecd);
			px(voxels, 2, 16, ec);
			px(voxels, 3, 14, ecd);
			break;
		}
		case 12: {
			// 하치마키 — 이마에 두른 헝겊 띠 + 매듭
			const hc = "#FFFFFF";
			const hcd = "#DDDDDD";
			for (let x = -5; x <= 4; x++) {
				px(voxels, x, 12, hcd);
				px(voxels, x, 13, hc);
			}
			// 매듭 (오른쪽)
			px(voxels, 4, 14, hc);
			px(voxels, 5, 13, hc);
			px(voxels, 5, 14, hcd);
			break;
		}
		default:
			break;
	}
}

// ─── 상의 스타일 디테일 ─────────────────────────────────────────
/**
 * 몸통/팔 기본 렌더 후 스타일별 디테일을 추가한다.
 * z=2 레이어를 사용해 기본 의상 위에 시각적으로 표현한다.
 */
function addTopDetails(voxels: VoxelCell[], topStyle: number, topDark: string, skin: string): void {
	const dz = 2; // 의상 디테일은 몸통 앞면(z=1) 위로 돌출
	switch (topStyle) {
		case 0:
			break; // 티셔츠 — 솔기만 (기본)
		case 1: {
			// 후드 — 캥거루 주머니 + 후드끈
			// 주머니 윤곽
			px(voxels, -2, 0, topDark, dz);
			px(voxels, 2, 0, topDark, dz);
			px(voxels, -2, -1, topDark, dz);
			px(voxels, -1, -1, topDark, dz);
			px(voxels, 0, -1, topDark, dz);
			px(voxels, 1, -1, topDark, dz);
			px(voxels, 2, -1, topDark, dz);
			// 후드끈 (목 아래)
			px(voxels, -1, 3, topDark, dz);
			px(voxels, 1, 3, topDark, dz);
			break;
		}
		case 2: {
			// 정장 — 흰 라펠 + 넥타이
			px(voxels, -2, 3, "#FFFFFF", dz);
			px(voxels, 2, 3, "#FFFFFF", dz);
			px(voxels, -1, 2, "#FFFFFF", dz);
			px(voxels, 1, 2, "#FFFFFF", dz);
			// 넥타이
			px(voxels, 0, 3, "#880011", dz);
			px(voxels, 0, 1, "#880011", dz);
			px(voxels, -1, 0, "#880011", dz);
			px(voxels, 0, 0, "#880011", dz);
			px(voxels, 1, 0, "#880011", dz);
			break;
		}
		case 3: {
			// 갑옷 — 흉갑 장식
			const plate = "#AABBCC";
			px(voxels, -1, 2, plate, dz);
			px(voxels, 0, 2, plate, dz);
			px(voxels, 1, 2, plate, dz);
			px(voxels, -2, 1, plate, dz);
			px(voxels, 2, 1, plate, dz);
			px(voxels, -1, 0, plate, dz);
			px(voxels, 1, 0, plate, dz);
			break;
		}
		case 4: {
			// 망토 — 금 클래스프 + 측면 라이닝
			px(voxels, -1, 3, "#CCAA00", dz);
			px(voxels, 0, 3, "#CCAA00", dz);
			px(voxels, -3, 2, topDark, dz);
			px(voxels, 3, 2, topDark, dz);
			px(voxels, -3, 1, topDark, dz);
			px(voxels, 3, 1, topDark, dz);
			break;
		}
		case 5: {
			// 교복 — 흰 칼라 + 빨간 리본
			px(voxels, -2, 3, "#FFFFFF", dz);
			px(voxels, -1, 3, "#FFFFFF", dz);
			px(voxels, 1, 3, "#FFFFFF", dz);
			px(voxels, 2, 3, "#FFFFFF", dz);
			px(voxels, -1, 2, "#CC0000", dz);
			px(voxels, 0, 2, "#CC0000", dz);
			px(voxels, 0, 1, "#CC0000", dz);
			break;
		}
		case 6: {
			// 가죽자켓 — 검은 라펠 + 금속 지퍼
			px(voxels, -3, 3, "#111111", dz);
			px(voxels, -2, 3, "#111111", dz);
			px(voxels, 2, 3, "#111111", dz);
			px(voxels, 3, 3, "#111111", dz);
			px(voxels, 0, 2, "#888888", dz);
			px(voxels, 0, 1, "#888888", dz);
			px(voxels, 0, 0, "#888888", dz);
			break;
		}
		case 7: {
			// 한복 — 대각선 깃 (고름)
			px(voxels, -3, 3, "#FFFFFF", dz);
			px(voxels, -2, 3, "#FFFFFF", dz);
			px(voxels, -1, 2, "#FFFFFF", dz);
			px(voxels, 0, 2, "#FFFFFF", dz);
			// 고름 (리본 매듭)
			px(voxels, -2, 1, "#CC4400", dz);
			px(voxels, -1, 1, "#CC4400", dz);
			break;
		}
		case 8: {
			// 운동복 — 좌우 흰 스트라이프
			for (let y = -1; y <= 3; y++) {
				px(voxels, -4, y, "#FFFFFF", dz);
				px(voxels, 3, y, "#FFFFFF", dz);
			}
			break;
		}
		case 9: {
			// 셔츠 — 흰 칼라 + 버튼
			px(voxels, -1, 3, "#FFFFFF", dz);
			px(voxels, 0, 3, "#FFFFFF", dz);
			px(voxels, 1, 3, "#FFFFFF", dz);
			px(voxels, 0, 2, "#CCCCCC", dz);
			px(voxels, 0, 0, "#CCCCCC", dz);
			break;
		}
		case 10: {
			// 조끼 — V넥 오프닝 (팔은 buildVoxelCharacter에서 피부색 처리)
			px(voxels, -1, 3, skin, dz);
			px(voxels, 1, 3, skin, dz);
			px(voxels, 0, 2, skin, dz);
			break;
		}
		case 11: {
			// 로브 — 측면 장식 라인 + 앞 여밈
			px(voxels, -4, 3, topDark, dz);
			px(voxels, -4, 2, topDark, dz);
			px(voxels, -4, 1, topDark, dz);
			px(voxels, -4, 0, topDark, dz);
			px(voxels, 3, 3, topDark, dz);
			px(voxels, 3, 2, topDark, dz);
			px(voxels, 3, 1, topDark, dz);
			px(voxels, 3, 0, topDark, dz);
			px(voxels, -1, 3, "#CCCCCC", dz);
			px(voxels, 1, 3, "#CCCCCC", dz);
			break;
		}
		case 12: {
			// 기모노 — 대각 깃 + 오비
			// 오비 (허리 띠)
			px(voxels, -4, 0, topDark, dz);
			px(voxels, -3, 0, topDark, dz);
			px(voxels, -2, 0, topDark, dz);
			px(voxels, -1, 0, topDark, dz);
			px(voxels, 0, 0, topDark, dz);
			px(voxels, 1, 0, topDark, dz);
			px(voxels, 2, 0, topDark, dz);
			px(voxels, 3, 0, topDark, dz);
			// 대각 깃 (왼쪽 → 오른쪽 아래)
			px(voxels, -3, 3, "#FFFFFF", dz);
			px(voxels, -2, 3, "#FFFFFF", dz);
			px(voxels, -1, 2, "#FFFFFF", dz);
			px(voxels, 0, 1, "#FFFFFF", dz);
			// 매화 장식 (어깨)
			px(voxels, -3, 2, "#FFAAAA", dz);
			px(voxels, 2, 2, "#FFAAAA", dz);
			break;
		}
		case 13: {
			// 우주복 — 헬멧 조인트 + 패치
			// 어깨 조인트
			px(voxels, -5, 3, topDark, dz);
			px(voxels, -5, 2, topDark, dz);
			px(voxels, 4, 3, topDark, dz);
			px(voxels, 4, 2, topDark, dz);
			// 가슴 패치
			px(voxels, -2, 2, "#FFFFFF", dz);
			px(voxels, -1, 2, "#FFFFFF", dz);
			px(voxels, 0, 2, "#AACCFF", dz);
			px(voxels, 1, 2, "#FFFFFF", dz);
			// 중앙 버튼
			px(voxels, 0, 1, "#FF4400", dz);
			px(voxels, 0, 0, "#FFAA00", dz);
			// 줄 (호스)
			px(voxels, -1, 3, topDark, dz);
			px(voxels, 1, 3, topDark, dz);
			break;
		}
		case 14: {
			// 닌자복 — 어두운 기본 + 복장 라인
			// 가슴 X자 교차 띠
			px(voxels, -3, 3, "#222222", dz);
			px(voxels, 2, 3, "#222222", dz);
			px(voxels, -2, 2, "#222222", dz);
			px(voxels, 1, 2, "#222222", dz);
			px(voxels, -1, 1, "#222222", dz);
			px(voxels, 0, 1, "#222222", dz);
			px(voxels, -1, 0, "#222222", dz);
			px(voxels, 0, 0, "#222222", dz);
			break;
		}
		case 15: {
			// 군복 — 어깨 배지 + 가슴 포켓 + 훈장
			// 어깨 견장
			px(voxels, -5, 3, "#AAAA00", dz);
			px(voxels, -5, 2, "#AAAA00", dz);
			px(voxels, 4, 3, "#AAAA00", dz);
			px(voxels, 4, 2, "#AAAA00", dz);
			// 가슴 포켓
			px(voxels, -2, 1, topDark, dz);
			px(voxels, -1, 1, topDark, dz);
			px(voxels, -2, 0, topDark, dz);
			px(voxels, -1, 0, topDark, dz);
			// 훈장 (별)
			px(voxels, 1, 2, "#FFD700", dz);
			px(voxels, 1, 1, "#FFD700", dz);
			px(voxels, 2, 2, "#FFD700", dz);
			break;
		}
		case 16: {
			// 마법사복 — 별 + 달 장식 로브
			// 별 장식들
			px(voxels, -3, 3, "#FFFF00", dz);
			px(voxels, 1, 2, "#FFFF00", dz);
			px(voxels, -2, 0, "#FFFF00", dz);
			px(voxels, 2, -1, "#FFFF00", dz);
			// 달 장식
			px(voxels, -1, 1, "#CCCCFF", dz);
			px(voxels, 0, 1, "#AAAAEE", dz);
			// 망토 앞 여밈
			px(voxels, -1, 3, topDark, dz);
			px(voxels, 1, 3, topDark, dz);
			px(voxels, 0, 2, topDark, dz);
			break;
		}
		default:
			break;
	}
}

// ─── 안경 ──────────────────────────────────────────────────────
/**
 * 스타일별 안경 프레임 형태:
 *   1 둥근안경: 코너 없는 타원형 (실버)
 *   2 뿔테안경: 채워진 두꺼운 프레임 (검은 거북등)
 *   3 선글라스: 좌우 연결된 일체형 바이저 (블랙)
 *   4 반테안경: 하단 바만 있는 반쪽 프레임 (실버)
 *   5 모노클: 오른쪽 눈만 + 금색 체인
 *   6 스포츠고글: 귀까지 이어지는 넓은 밴드 (주황/네이비)
 *   7 VR헤드셋: y=8..11 크고 넓은 블록 (블랙 프레임 + 파란 스크린)
 */
function addGlasses(voxels: VoxelCell[], glassesId: number): void {
	if (glassesId === 0) return;
	const z = 3; // 안경은 얼굴 앞으로 강하게 돌출
	switch (glassesId) {
		case 1: {
			// 둥근안경 — 실버, 코너 없는 타원형
			const c = "#AAAAAA";
			// 왼쪽 렌즈 (코너 생략 → 둥근 느낌)
			px(voxels, -3, 10, c, z);
			px(voxels, -2, 10, c, z); // 상단 중앙
			px(voxels, -4, 9, c, z);
			px(voxels, -1, 9, c, z); // 좌우 벽
			px(voxels, -3, 8, c, z);
			px(voxels, -2, 8, c, z); // 하단 중앙
			// 오른쪽 렌즈
			px(voxels, 1, 10, c, z);
			px(voxels, 2, 10, c, z);
			px(voxels, 0, 9, c, z);
			px(voxels, 3, 9, c, z);
			px(voxels, 1, 8, c, z);
			px(voxels, 2, 8, c, z);
			// 코받침 + 왼쪽 귀걸이
			px(voxels, -5, 9, c, z);
			break;
		}
		case 2: {
			// 뿔테안경 — 채워진 두꺼운 검은 프레임
			const c = "#1A0800";
			for (let x = -4; x <= -2; x++) {
				for (let y = 8; y <= 10; y++) px(voxels, x, y, c, z);
			}
			for (let x = 0; x <= 2; x++) {
				for (let y = 8; y <= 10; y++) px(voxels, x, y, c, z);
			}
			px(voxels, -1, 9, c, z); // 코받침
			px(voxels, -5, 9, c, z);
			px(voxels, 3, 9, c, z); // 귀걸이
			break;
		}
		case 3: {
			// 선글라스 — 좌우 연결된 일체형 블랙 바이저
			const c = "#0A0A0A";
			for (let x = -4; x <= 2; x++) {
				px(voxels, x, 10, c, z);
				px(voxels, x, 9, c, z);
				px(voxels, x, 8, c, z);
			}
			px(voxels, -5, 9, c, z);
			px(voxels, 3, 9, c, z); // 귀걸이
			break;
		}
		case 4: {
			// 반테안경 — 하단 바 + 짧은 측면만
			const c = "#888888";
			// 왼쪽: 측면 하단 + 하단 바
			px(voxels, -4, 9, c, z);
			px(voxels, -2, 9, c, z);
			px(voxels, -4, 8, c, z);
			px(voxels, -3, 8, c, z);
			px(voxels, -2, 8, c, z);
			// 오른쪽
			px(voxels, 0, 9, c, z);
			px(voxels, 2, 9, c, z);
			px(voxels, 0, 8, c, z);
			px(voxels, 1, 8, c, z);
			px(voxels, 2, 8, c, z);
			px(voxels, -1, 8, c, z); // 코받침 하단
			px(voxels, -5, 9, c, z);
			px(voxels, 3, 9, c, z); // 귀걸이
			break;
		}
		case 5: {
			// 모노클 — 오른쪽 눈만, 금색 + 체인
			const c = "#CCAA00";
			px(voxels, 0, 10, c, z);
			px(voxels, 1, 10, c, z);
			px(voxels, 2, 10, c, z);
			px(voxels, 0, 9, c, z);
			px(voxels, 2, 9, c, z);
			px(voxels, 0, 8, c, z);
			px(voxels, 1, 8, c, z);
			px(voxels, 2, 8, c, z);
			// 체인 (아래로 늘어짐)
			px(voxels, 2, 7, c, z);
			px(voxels, 3, 6, c, z);
			break;
		}
		case 6: {
			// 스포츠고글 — 귀까지 이어지는 넓은 주황/네이비 밴드
			const frame = "#FF6600";
			const lens = "#002244";
			for (let x = -5; x <= 4; x++) {
				px(voxels, x, 10, frame, z);
				px(voxels, x, 8, frame, z);
			}
			for (let x = -4; x <= 2; x++) px(voxels, x, 9, lens, z);
			px(voxels, -5, 9, frame, z);
			px(voxels, 4, 9, frame, z); // 측면 두께
			break;
		}
		case 7: {
			// VR헤드셋 — 크고 넓은 블록 (y=8..11)
			const frame = "#222222";
			const screen = "#001133";
			const led = "#0044FF";
			// 외부 프레임
			for (let x = -4; x <= 3; x++) {
				px(voxels, x, 11, frame, z);
				px(voxels, x, 8, frame, z);
			}
			px(voxels, -4, 9, frame, z);
			px(voxels, -4, 10, frame, z);
			px(voxels, 3, 9, frame, z);
			px(voxels, 3, 10, frame, z);
			// 화면 (파란 스크린)
			for (let x = -3; x <= 2; x++) {
				px(voxels, x, 9, screen, z);
				px(voxels, x, 10, screen, z);
			}
			// LED 포인트
			px(voxels, -2, 11, led, z);
			px(voxels, 1, 11, led, z);
			// 스트랩 (귀까지)
			px(voxels, -5, 9, frame, z);
			px(voxels, -5, 10, frame, z);
			px(voxels, 4, 9, frame, z);
			px(voxels, 4, 10, frame, z);
			break;
		}
		case 8: {
			// 하트안경 — 하트 모양 프레임
			const c = "#FF88CC";
			// 왼쪽 하트 렌즈
			px(voxels, -4, 10, c, z);
			px(voxels, -3, 10, c, z);
			px(voxels, -2, 10, c, z);
			px(voxels, -4, 9, c, z);
			px(voxels, -2, 9, c, z);
			px(voxels, -3, 8, c, z);
			// 오른쪽 하트 렌즈
			px(voxels, 1, 10, c, z);
			px(voxels, 2, 10, c, z);
			px(voxels, 3, 10, c, z);
			px(voxels, 1, 9, c, z);
			px(voxels, 3, 9, c, z);
			px(voxels, 2, 8, c, z);
			px(voxels, -5, 9, c, z); // 귀걸이
			break;
		}
		case 9: {
			// 별모양안경 — 별 모양 프레임
			const c = "#FFDD00";
			// 왼쪽 별 렌즈
			px(voxels, -3, 10, c, z);
			px(voxels, -2, 10, c, z);
			px(voxels, -4, 9, c, z);
			px(voxels, -3, 9, c, z);
			px(voxels, -2, 9, c, z);
			px(voxels, -1, 9, c, z);
			px(voxels, -3, 8, c, z);
			px(voxels, -2, 8, c, z);
			// 오른쪽 별 렌즈
			px(voxels, 1, 10, c, z);
			px(voxels, 2, 10, c, z);
			px(voxels, 0, 9, c, z);
			px(voxels, 1, 9, c, z);
			px(voxels, 2, 9, c, z);
			px(voxels, 3, 9, c, z);
			px(voxels, 1, 8, c, z);
			px(voxels, 2, 8, c, z);
			px(voxels, -5, 9, c, z);
			break;
		}
		case 10: {
			// 오버사이즈 — 커다란 정사각 프레임
			const c = "#333333";
			for (let y = 8; y <= 11; y++) {
				px(voxels, -5, y, c, z);
				px(voxels, -1, y, c, z);
				px(voxels, 0, y, c, z);
				px(voxels, 4, y, c, z);
			}
			for (let x = -4; x <= -2; x++) {
				px(voxels, x, 11, c, z);
				px(voxels, x, 8, c, z);
			}
			for (let x = 1; x <= 3; x++) {
				px(voxels, x, 11, c, z);
				px(voxels, x, 8, c, z);
			}
			break;
		}
		case 11: {
			// 팔각형 — 빈티지 팔각 렌즈
			const c = "#887733";
			px(voxels, -3, 10, c, z);
			px(voxels, -2, 10, c, z);
			px(voxels, -4, 9, c, z);
			px(voxels, -1, 9, c, z);
			px(voxels, -3, 8, c, z);
			px(voxels, -2, 8, c, z);
			px(voxels, 1, 10, c, z);
			px(voxels, 2, 10, c, z);
			px(voxels, 0, 9, c, z);
			px(voxels, 3, 9, c, z);
			px(voxels, 1, 8, c, z);
			px(voxels, 2, 8, c, z);
			px(voxels, -5, 9, c, z);
			px(voxels, 4, 9, c, z);
			break;
		}
		default:
			break;
	}
}
