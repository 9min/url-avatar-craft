# CLAUDE.md - HoloID 프로젝트 규칙

## 프로젝트 개요
인터랙티브 3D 디지털 명함(ID 카드) 제작 및 공유 플랫폼. 카카오톡 오픈채팅방 등에서 자신을 화려한 홀로그램 카드로 소개할 수 있다.

## 기술 스택

- **프론트엔드**: Vite + React + TypeScript
- **3D 렌더링**: React Three Fiber (Three.js)
- **상태 관리**: Zustand
- **CSS**: Tailwind CSS
- **백엔드(BaaS)**: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **린트/포매팅**: Biome
- **테스트**: Vitest
- **배포**: Vercel (프론트엔드), Supabase (백엔드)
- **버전 관리**: Git (GitHub Flow)

## 핵심 규칙

### 언어

- 코드 내 주석, 커밋 메시지, PR 설명 등 모든 문서는 **한국어**로 작성한다.

### 코드 스타일

- Biome 설정을 따른다. (`biome.json` 참조)
- TypeScript strict 모드를 사용한다.
- `any` 타입 사용을 금지한다. 불가피한 경우 `unknown`을 사용하고 타입 가드를 적용한다.
- 함수형 컴포넌트와 훅을 사용한다. 클래스 컴포넌트는 사용하지 않는다.
- 네이밍 컨벤션:
  - 컴포넌트: `PascalCase`
  - 함수/변수: `camelCase`
  - 상수: `UPPER_SNAKE_CASE`
  - 타입/인터페이스: `PascalCase`
  - 파일명: 컴포넌트는 `PascalCase.tsx`, 그 외는 `camelCase.ts`

### 브랜치 전략

- GitHub Flow 기반: `main` → `feature/*`, `fix/*`, `hotfix/*`
- 직접 `main` 푸시 금지. 반드시 PR을 통해 머지한다.

### 커밋 컨벤션

- Gitmoji + Conventional Commits 형식
- 예: `✨ feat: 사용자 로그인 기능 추가`
- 예: `🐛 fix: 토큰 만료 시 리다이렉트 오류 수정`

### 테스트

- 새로운 기능에는 반드시 테스트 코드를 포함한다.
- Vitest를 사용하며, 테스트 파일은 `*.test.ts` 또는 `*.test.tsx` 형식을 따른다.

### Supabase 사용 규칙

- Supabase 클라이언트는 `lib/supabase.ts`에서 단일 인스턴스로 생성하여 사용한다.
- SPA에서는 `createClient`를 사용한다. SSR 도입 시 클라이언트 구분은 [project-structure.md](docs/project-structure.md)를 참조한다.
- 데이터베이스 접근은 반드시 RLS(Row Level Security) 정책을 통해 보호한다.
- 직접 SQL보다 Supabase Client 메서드(`.from().select()` 등)를 우선 사용한다.
- 복잡한 비즈니스 로직은 Edge Functions 또는 Database Functions(RPC)로 처리한다.

### 보안

- 환경변수로 시크릿을 관리한다. 코드에 하드코딩 금지.
- `SUPABASE_URL`과 `SUPABASE_ANON_KEY`는 클라이언트에 노출 가능하지만, `SERVICE_ROLE_KEY`는 서버 측에서만 사용한다.
- 사용자 입력은 반드시 검증하고 새니타이즈한다.
- OWASP Top 10을 준수한다.
- 모든 테이블에 RLS 정책을 활성화한다.

### 에러 처리

- 프론트엔드: Error Boundary + try-catch 패턴
- Supabase: `{ data, error }` 패턴으로 에러를 처리한다. `error`를 항상 확인한다.

### 프로젝트 고유 규칙

- 카드 상태(재질, 텍스트, 아바타, 이펙트 등)는 Zustand 스토어(`useCardStore`)로 관리한다.
- 카드 상태는 URL 해시로 직렬화/역직렬화하여 서버 없이 공유 가능하게 한다.
- React Three Fiber 컴포넌트는 `src/components/feature/card/` 하위에 배치한다.
- 3D 관련 유틸리티(셰이더, 머티리얼 등)는 `src/utils/three/`에 배치한다.
- 카드 에디터 UI와 3D 뷰어는 명확히 분리한다. 에디터는 2D UI, 뷰어는 R3F Canvas.

## 상세 문서 참조

각 항목에 대한 상세 내용은 아래 문서를 참조한다.

| 문서 | 설명 |
|------|------|
| [docs/git-workflow.md](docs/git-workflow.md) | Git 워크플로우 및 브랜치 전략 |
| [docs/commit-convention.md](docs/commit-convention.md) | 커밋 메시지 컨벤션 |
| [docs/project-structure.md](docs/project-structure.md) | 프로젝트 폴더 구조 가이드 |
| [docs/lint-config.md](docs/lint-config.md) | Biome 린트/포매팅 설정 |
| [docs/design-guide.md](docs/design-guide.md) | 디자인 가이드 (UI 컨벤션 + 디자인 시스템) |
| [docs/testing-guide.md](docs/testing-guide.md) | 테스트 코드 가이드 |
| [docs/security-guide.md](docs/security-guide.md) | 보안 가이드 |
| [docs/cicd-guide.md](docs/cicd-guide.md) | CI/CD 설정 가이드 |
| [docs/code-review-checklist.md](docs/code-review-checklist.md) | 코드 리뷰 체크리스트 |
| [docs/error-handling.md](docs/error-handling.md) | 에러 핸들링 가이드 |
| [docs/dev-environment.md](docs/dev-environment.md) | 개발 환경 셋업 가이드 |
| [docs/state-management.md](docs/state-management.md) | 상태 관리 전략 |
| [docs/performance-guide.md](docs/performance-guide.md) | 성능 최적화 가이드 |
| [docs/data-modeling.md](docs/data-modeling.md) | 데이터 모델링 가이드 |
| [docs/prd.md](docs/prd.md) | 제품 요구사항 문서 (PRD) |
