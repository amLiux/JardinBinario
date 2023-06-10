import { SyntheticEvent, useState } from 'react';
import tagInputStyles from './TagInput.module.css';
import { Flexbox } from '@/components/lib/Flexbox';

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

		if (target.value !== '') {
			setTags([...tags, target.value]);
			props.selectedTags([...tags, target.value]);
			target.value = '';
		}
	};

	return (
		<Flexbox
			wrap
			alignItems='center'
			extraClass={`${tagInputStyles.tagsInput} ${tags.length > MAX_TAGS ? tagInputStyles.tagsInputMaxed : ''}`}
		>
			<Flexbox html='ul' id='tags' extraClass={tagInputStyles.tags}>
				{tags.map((tag: string, index: number) => (
					<Flexbox alignItems='center' justifyContent='center' key={index} extraClass={tagInputStyles.tag}>
						<span className={tagInputStyles.tagTitle}>{tag}</span>
						<Flexbox
							justifyContent='center'
							html='span'
							extraClass={tagInputStyles.tagCloseIcon}
							onClick={() => removeTags(index)}
						>
							x
						</Flexbox>
					</Flexbox>
				))}
				
			</Flexbox>
			{
				tags.length <= MAX_TAGS &&
					<input
						type='text'
						onKeyUp={event => event.key === 'Enter' ? addTags(event) : null}
						placeholder='Press Enter'
					/>	
			}
		</Flexbox>
	);
};
