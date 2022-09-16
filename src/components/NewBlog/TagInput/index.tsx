import { SyntheticEvent, useState } from "react";
import tagInputStyles from './TagInput.module.css';

type TagsInputType = {
	selectedTags: (tags: string[]) => void;
	tags: string[];
};

export const TagsInput = (props: TagsInputType) => {
	const MAX_TAGS = 3;
	const [tags, setTags] = useState(props.tags);

	const removeTags = (indexToRemove: number) => {
		const newTags = [...tags.filter((_: string, index: number) => index !== indexToRemove)];
		setTags(newTags);
		props.selectedTags(newTags);
	};

	const addTags = (e: SyntheticEvent) => {
		let target = (e.target as HTMLInputElement);

		if (target.value !== "") {
			setTags([...tags, target.value]);
			props.selectedTags([...tags, target.value]);
			target.value = "";
		}
	};

	return (
		<div className={`${tagInputStyles.tagsInput} ${tags.length > MAX_TAGS ? tagInputStyles.tagsInputMaxed : ''}`}>
			<ul id="tags" className={tagInputStyles.tags}>
				{tags.map((tag: string, index: number) => (
					<li key={index} className={tagInputStyles.tag}>
						<span className={tagInputStyles.tagTitle}>{tag}</span>
						<span className={tagInputStyles.tagCloseIcon} onClick={() => removeTags(index)}>
							x
						</span>
					</li>
				))}
			</ul>
			{
				tags.length <= MAX_TAGS &&
					<input
						type="text"
						onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
						placeholder="Press Enter"
					/>	
			}
		</div>
	);
};
