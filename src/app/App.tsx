import { MainLayout } from "../components/layout/MainLayout";
import { useAutoRandom } from "../hooks/useAutoRandom";
import { useHashSync } from "../hooks/useHashSync";

export function App() {
	useHashSync();
	useAutoRandom();

	return <MainLayout />;
}
