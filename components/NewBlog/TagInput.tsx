import { SyntheticEvent, useContext, useEffect, useState } from "react";

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
		<div className={`tagsInput ${tags.length > MAX_TAGS ? 'tagsInputMaxed' : ''} ml-auto`}>
			<ul id="tags">
				{tags.map((tag: string, index: number) => (
					<li key={index} className="tag">
						<span className='tagTitle'>{tag}</span>
						<span className='tagCloseIcon'
							onClick={() => removeTags(index)}
						>
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
