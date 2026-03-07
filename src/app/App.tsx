import { MainLayout } from "../components/layout/MainLayout";
import { useHashSync } from "../hooks/useHashSync";

export function App() {
	useHashSync();

	return <MainLayout />;
}
