# 프로젝트 구조 가이드

## 프로젝트 루트 구조

현재는 서버리스 구조다. 카드 상태를 URL 쿼리파라미터로 직렬화하므로 Supabase DB를 아직 사용하지 않는다. 향후 저장/인증 기능 추가 시 Supabase가 활성화된다.

```
프로젝트-루트/
├── .vscode/                    # VSCode 설정 (settings.json, extensions.json 등)
├── .github/                    # GitHub Actions 워크플로우
│   └── workflows/
├── src/
│   ├── app/                    # 앱 진입점 (App.tsx)
│   ├── components/             # 컴포넌트
│   │   ├── ui/                 # 기본 UI 컴포넌트 (Button, Input, Tabs)
│   │   ├── layout/             # 레이아웃 컴포넌트 (MainLayout)
│   │   └── feature/            # 기능별 컴포넌트
│   │       ├── card/           # 3D 피규어 뷰어 관련
│   │       ├── editor/         # 에디터 UI 관련
│   │       └── viewer/         # 뷰어 전용 모드 관련
│   ├── hooks/                  # 커스텀 훅
│   ├── lib/                    # 외부 라이브러리 설정 (Supabase 클라이언트 등)
│   ├── stores/                 # 상태 관리 (상세: state-management.md 참조)
│   ├── types/                  # TypeScript 타입 정의
│   ├── utils/                  # 유틸리티 함수
│   └── constants/              # 상수 정의
├── supabase/
│   ├── migrations/             # 데이터베이스 마이그레이션 (미사용, 향후 활성화)
│   ├── functions/              # Edge Functions (미사용, 향후 활성화)
│   └── config.toml             # Supabase 로컬 설정
├── docs/                       # 프로젝트 문서
├── public/                     # 정적 파일
├── .env.example                # 환경변수 키 목록 (Git 추적)
├── .env.local                  # 로컬 환경변수 (Git 미추적)
├── index.html
├── biome.json                  # Biome 설정
├── package.json
├── tsconfig.json
├── vite.config.ts
└── CLAUDE.md                   # Claude Code 규칙
```

## 주요 디렉토리 설명

### `src/app/` — 앱 진입점

`App.tsx`가 위치한다. `useHashSync`(URL↔상태 동기화)와 `useAutoRandom`(최초 랜덤 아바타 생성) 훅을 초기화하고 `MainLayout`을 렌더링한다.

### `src/components/feature/card/` — 3D 피규어 뷰어

R3F(React Three Fiber) 기반 3D 렌더링 컴포넌트를 배치한다.

| 파일 | 역할 |
|------|------|
| `CardScene.tsx` | R3F Canvas 루트. OrbitControls, FigureCase, CardAvatar, CardParticles 조합 |
| `FigureCase.tsx` | 홀로그램 와이어프레임 케이스 + 받침대. 재질별 셰이더 적용 |
| `VoxelCharacter.tsx` | InstancedMesh 기반 복셀 렌더러 |
| `CardAvatar.tsx` | VoxelCharacter 래퍼. buildVoxelCharacter 호출, scale/position 설정 |
| `CardText.tsx` | 받침대 네임플레이트 (닉네임/타이틀) |
| `CardParticles.tsx` | 배경 이펙트 13종 파티클 시스템 |
| `CaptureHelper.tsx` | PNG 다운로드 (captureRequested 감지 → canvas.toDataURL) |

### `src/components/feature/editor/` — 에디터 UI

2D 에디터 패널 컴포넌트를 배치한다. R3F Canvas와 완전히 분리된다.

| 파일 | 역할 |
|------|------|
| `EditorPanel.tsx` | 3탭(재질 \| 아바타 \| 기본정보) 에디터 컨테이너 |
| `AvatarEditor.tsx` | 16개 카테고리 아코디언 파츠 선택기 |
| `MaterialSelector.tsx` | 재질 4종 선택 UI |
| `TextInputGroup.tsx` | 닉네임/타이틀 입력 |
| `ShareButton.tsx` | URL 클립보드 복사 |
| `DownloadButton.tsx` | PNG 다운로드 요청 트리거 |

### `src/components/feature/viewer/` — 뷰어 전용 모드

`?view` 파라미터 접속 시 표시되는 컴포넌트.

| 파일 | 역할 |
|------|------|
| `ViewerCTA.tsx` | "나도 만들기" CTA 버튼 오버레이 |

### `src/stores/` — 상태 관리

`useCardStore.ts` 하나로 전체 카드 상태를 관리한다.

```ts
// 카드 상태 구조
interface CardState {
  material: CardMaterial;        // 'foil' | 'neon' | 'glass' | 'metal'
  nickname: string;
  title: string;
  particleEffect: string | null;
  avatar: AvatarState;           // 16개 카테고리
  autoRotate: boolean;
  captureRequested: boolean;
  // ... 액션들
}
```

### `src/utils/` — 유틸리티

| 파일 | 역할 |
|------|------|
| `avatarSerializer.ts` | 아바타 상태 ↔ Base36 16자 문자열 직렬화/역직렬화 (14자·15자 하위호환) |
| `cardSerializer.ts` | 카드 전체 상태 ↔ URL 쿼리파라미터 직렬화/역직렬화 |
| `randomAvatar.ts` | `generateRandomAvatar()` — 16개 카테고리 무작위 조합 |
| `cn.ts` | `clsx` + `tailwind-merge` 조합 유틸리티 |

### `src/utils/three/` — 3D 유틸리티

| 파일 | 역할 |
|------|------|
| `voxelData.ts` | `buildVoxelCharacter(avatar)` + `upscale2x()` — 복셀 좌표 배열 생성 |
| `cardMaterials.ts` | 재질별 Three.js MeshStandardMaterial / ShaderMaterial |
| `holographicShader.ts` | 포일(foil) GLSL 셰이더 |
| `neonShader.ts` | 네온(neon) GLSL 셰이더 |

### `src/types/` — 타입 정의

| 파일 | 내용 |
|------|------|
| `avatar.ts` | `AvatarState` (16개 카테고리), `AvatarPartId`, `AvatarPartCategory` |
| `card.ts` | `CardMaterial` 등 카드 관련 타입 |

### `src/constants/` — 상수 정의

`avatarParts.ts` — 16개 카테고리별 파츠 메타데이터(`AVATAR_CATEGORIES`), 고정 직렬화 순서(`AVATAR_KEYS`), 기본값(`DEFAULT_AVATAR`).

### `src/hooks/` — 커스텀 훅

| 파일 | 역할 |
|------|------|
| `useHashSync.ts` | URL 쿼리파라미터 ↔ `useCardStore` 양방향 동기화 |
| `useAutoRandom.ts` | 최초 진입(URL 파라미터 없을 때) 랜덤 아바타 자동 생성 |

### `src/lib/` — 외부 라이브러리 설정

`supabase.ts` — Supabase 클라이언트 단일 인스턴스. 현재 환경변수가 설정된 경우에만 활성화된다.

```ts
// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Supabase 클라이언트 종류 (향후 참조)

| 함수 | 패키지 | 용도 |
|------|--------|------|
| `createClient` | `@supabase/supabase-js` | SPA 기본 클라이언트 |
| `createBrowserClient` | `@supabase/ssr` | SSR 프레임워크 브라우저 측 |
| `createServerClient` | `@supabase/ssr` | SSR 프레임워크 서버 측 |

**현재 SPA이므로 `createClient`만 사용한다.**

## 경로 Alias 설정

`@/` 경로 alias를 설정하여 상대 경로 대신 절대 경로를 사용한다.

### tsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### vite.config.ts

```ts
import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
```

사용 예시:

```ts
// 좋은 예: alias 사용
import { supabase } from "@/lib/supabase";

// 나쁜 예: 상대 경로
import { supabase } from "../../../lib/supabase";
```

## 환경변수 파일 구조

| 파일 | 역할 | Git 추적 | 비고 |
|------|------|----------|------|
| `.env.example` | 환경변수 키 목록 (값 없음) | O | 팀원 온보딩용 |
| `.env.local` | 로컬 개발용 실제 값 | X | 각 개발자가 생성 |
| `.env` | 빌드/배포 시 사용 | X | CI/CD에서 주입 |

Vite 프로젝트에서는 클라이언트에서 접근할 환경변수에 `VITE_` 접두사를 붙인다.

상세 설정은 [개발 환경 셋업 가이드](dev-environment.md)를 참조한다.

## 네이밍 컨벤션

### 파일/폴더 이름

| 대상 | 규칙 | 예시 |
|------|------|------|
| React 컴포넌트 파일 | `PascalCase.tsx` | `LoginForm.tsx` |
| 훅 파일 | `camelCase.ts` | `useAuth.ts` |
| 서비스 파일 | `camelCase.ts` | `todoService.ts` |
| 유틸리티 파일 | `camelCase.ts` | `formatDate.ts` |
| 타입 파일 | `camelCase.ts` | `user.ts` |
| 테스트 파일 | `*.test.ts(x)` | `LoginForm.test.tsx` |
| 상수 파일 | `camelCase.ts` | `apiEndpoints.ts` |
| DB 마이그레이션 | 자동 생성 (타임스탬프) | `20240101000000_create_todos.sql` |
| Edge Functions | `kebab-case` 폴더 | `send-notification/index.ts` |

### 코드 네이밍

| 대상 | 규칙 | 예시 |
|------|------|------|
| 컴포넌트 | `PascalCase` | `LoginForm`, `UserProfile` |
| 함수 | `camelCase` | `getUserById`, `formatDate` |
| 변수 | `camelCase` | `userName`, `isLoading` |
| 상수 | `UPPER_SNAKE_CASE` | `API_BASE_URL`, `MAX_RETRY` |
| 타입/인터페이스 | `PascalCase` | `User`, `ApiResponse` |
| Enum | `PascalCase` (멤버도) | `UserRole.Admin` |
| 커스텀 훅 | `use` 접두사 + `camelCase` | `useAuth`, `useFetch` |
| 이벤트 핸들러 | `handle` 접두사 | `handleSubmit`, `handleClick` |
| Boolean 변수 | `is`/`has`/`should` 접두사 | `isLoading`, `hasError` |
| DB 테이블 | `snake_case` (복수형) | `todos`, `user_profiles` |
| DB 컬럼 | `snake_case` | `created_at`, `user_id` |
| RLS 정책 | 한국어 서술형 | `사용자 본인 조회` |

### 컴포넌트 구조

하나의 컴포넌트 파일은 다음 순서로 구성한다:

```tsx
// 1. import 문
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { User } from "@/types/user";

// 2. 타입 정의
interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  isLoading: boolean;
}

// 3. 컴포넌트 함수
export function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
  // 3-1. 훅
  const [email, setEmail] = useState("");

  // 3-2. 이벤트 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  // 3-3. 렌더링
  return <form onSubmit={handleSubmit}>{/* ... */}</form>;
}
```

## 관련 문서

- [디자인 가이드](design-guide.md)
- [린트 설정](lint-config.md)
- [보안 가이드](security-guide.md)
- [개발 환경 셋업](dev-environment.md)
- [상태 관리 전략](state-management.md)
