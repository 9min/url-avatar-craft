import { useCardStore } from "../../../stores/useCardStore";
import { Input } from "../../ui/Input";

function TextInputGroup() {
	const nickname = useCardStore((s) => s.nickname);
	const title = useCardStore((s) => s.title);
	const setNickname = useCardStore((s) => s.setNickname);
	const setTitle = useCardStore((s) => s.setTitle);

	return (
		<div className="flex flex-col gap-4">
			<Input
				label="닉네임"
				value={nickname}
				onChange={(e) => setNickname(e.target.value.slice(0, 12))}
				maxLength={12}
				placeholder="최대 12자"
			/>
			<Input
				label="칭호"
				value={title}
				onChange={(e) => setTitle(e.target.value.slice(0, 20))}
				maxLength={20}
				placeholder="최대 20자"
			/>
		</div>
	);
}

export { TextInputGroup };
