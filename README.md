# 3D Figure — 인터랙티브 3D 피규어 명함

나만의 3D 복셀 캐릭터를 만들고 URL 하나로 공유하는 인터랙티브 명함 플랫폼.

카카오톡 오픈채팅, 디스코드 등 커뮤니티에서 자신을 개성 있게 소개하는 바이럴 카드를 만들 수 있다.

---

## 주요 기능

- **3D 피규어 에디터** — 16개 카테고리, 200+ 파츠 조합으로 나만의 복셀 캐릭터 제작
- **홀로그램 피규어 케이스** — 재질(포일 / 네온 / 글래스 / 메탈)별 홀로그램 와이어프레임 케이스
- **OrbitControls** — 360° 자유 회전, 줌, 자동 회전 지원
- **배경 이펙트 13종** — 불꽃·벚꽃·매트릭스·번개·하트·별·버블·음표·마법진·크리스탈·슬라임 등
- **URL 공유** — 카드 전체 상태를 URL 쿼리파라미터로 직렬화, 서버 없이 공유
- **PNG 다운로드** — 캔버스 스냅샷을 이미지로 저장
- **뷰어 전용 모드** — `?view` 파라미터로 에디터 없이 카드만 감상 + 에디터 유도 CTA

## 아바타 파츠 카테고리 (16개)

| 그룹 | 카테고리 | 옵션 수 |
|------|----------|---------|
| 얼굴 기본 | 피부톤 | 8 |
| 얼굴 기본 | 눈 | 16 |
| 얼굴 기본 | 눈썹 | 12 |
| 얼굴 기본 | 코 | 8 |
| 얼굴 기본 | 입 | 14 |
| 얼굴 기본 | 볼터치 | 6 |
| 헤어 | 헤어스타일 | 26 |
| 헤어 | 헤어컬러 | 18 |
| 악세사리 | 안경 | 12 |
| 악세사리 | 귀걸이 | 10 |
| 악세사리 | 모자 | 13 |
| 악세사리 | 마스크 | 9 |
| 의상 | 상의 | 17 |
| 의상 | 들고 있는 아이템 | 18 |
| 이펙트 | 배경 이펙트 | 13 |
| 이펙트 | 동반 펫 | 7 |

## 기술 스택

| 역할 | 기술 |
|------|------|
| 프론트엔드 | Vite + React 19 + TypeScript (strict) |
| 3D 렌더링 | React Three Fiber (Three.js 0.183) |
| 상태 관리 | Zustand 5 |
| CSS | Tailwind CSS 4 |
| 백엔드(BaaS) | Supabase (현재 미활성 — URL 직렬화로 대체) |
| 린트/포매팅 | Biome 2 |
| 테스트 | Vitest 4 |
| 배포 | Vercel |

## 시작하기

### 필요 조건

- Node.js 20+
- pnpm / npm / yarn

### 로컬 개발

```bash
# 저장소 클론
git clone https://github.com/your-org/url-avatar-craft.git
cd url-avatar-craft

# 의존성 설치
npm install

# 환경변수 설정 (Supabase 기능 사용 시)
cp .env.example .env.local
# .env.local에 VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY 입력

# 개발 서버 시작
npm run dev
```

개발 서버: `http://localhost:5173`

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

### 테스트

```bash
# 단위 테스트 실행
npm test

# 커버리지 포함
npm run test:coverage
```

### 린트 / 포매팅

```bash
# Biome 검사 + 자동 수정
npm run lint
```

## 프로젝트 구조

```
src/
├── app/                         # 앱 진입점 (App.tsx)
├── components/
│   ├── ui/                      # 기본 UI (Button, Input, Tabs)
│   ├── layout/                  # MainLayout (에디터/뷰어 분기)
│   └── feature/
│       ├── card/                # 3D 피규어 뷰어 (CardScene, FigureCase, VoxelCharacter 등)
│       ├── editor/              # 에디터 UI (EditorPanel, AvatarEditor 등)
│       └── viewer/              # 뷰어 전용 모드 (ViewerCTA)
├── constants/                   # avatarParts.ts (파츠 메타데이터)
├── hooks/                       # useHashSync, useAutoRandom
├── lib/                         # supabase.ts (클라이언트 인스턴스)
├── stores/                      # useCardStore (Zustand)
├── types/                       # avatar.ts, card.ts
└── utils/
    ├── avatarSerializer.ts      # Base36 16자 직렬화/역직렬화
    ├── cardSerializer.ts        # URL 전체 상태 직렬화
    ├── randomAvatar.ts          # 랜덤 아바타 생성
    └── three/
        ├── voxelData.ts         # 복셀 캐릭터 빌더 + upscale2x
        ├── cardMaterials.ts     # 재질별 Three.js 머티리얼
        ├── holographicShader.ts # 포일 셰이더
        └── neonShader.ts        # 네온 셰이더
```

## URL 직렬화 규격

카드 전체 상태는 URL 쿼리파라미터로 직렬화하여 서버 없이 공유한다.

| 파라미터 | 형식 | 설명 |
|----------|------|------|
| `av` | Base36 16자 | 아바타 16개 카테고리 각 1자 |
| `m` | `f`/`n`/`g`/`e` | 재질 (foil/neon/glass/metal) |
| `n` | 문자열 | 닉네임 |
| `t` | 문자열 | 타이틀 |

뷰어 전용 모드: `?view` 파라미터 추가

### 하위 호환

| 길이 | 버전 | 처리 |
|------|------|------|
| 16자 | 현재 | 그대로 사용 |
| 14자 | 구버전 (blush/pet 없음) | 끝에 `00` 추가 |
| 15자 | 최구버전 (faceShape 포함) | position 1 제거 → 14자 → `00` 추가 |

## 브랜치 전략

GitHub Flow 기반:

- `main` — 항상 배포 가능한 상태 유지
- `feature/*` — 기능 개발
- `fix/*` — 버그 수정
- `hotfix/*` — 긴급 수정

`main` 직접 푸시 금지. 반드시 PR로 머지한다.

## 커밋 컨벤션

Gitmoji + Conventional Commits 형식을 따른다.

```
✨ feat: 볼터치/펫 카테고리 추가
🐛 fix: InstancedMesh vertexColors 검정 오류 수정
♻️ refactor: 아바타 직렬화 16자로 확장
📝 docs: README 현행화
```

## 상세 문서

| 문서 | 설명 |
|------|------|
| [docs/prd.md](docs/prd.md) | 제품 요구사항 문서 (PRD) |
| [docs/project-structure.md](docs/project-structure.md) | 프로젝트 폴더 구조 |
| [docs/state-management.md](docs/state-management.md) | 상태 관리 전략 |
| [docs/design-guide.md](docs/design-guide.md) | 디자인 가이드 |
| [docs/git-workflow.md](docs/git-workflow.md) | Git 워크플로우 |
| [docs/commit-convention.md](docs/commit-convention.md) | 커밋 메시지 컨벤션 |
| [docs/testing-guide.md](docs/testing-guide.md) | 테스트 코드 가이드 |
| [docs/security-guide.md](docs/security-guide.md) | 보안 가이드 |
| [docs/cicd-guide.md](docs/cicd-guide.md) | CI/CD 설정 |
| [CLAUDE.md](CLAUDE.md) | Claude Code 프로젝트 규칙 |

## 라이선스

Private repository. All rights reserved.
