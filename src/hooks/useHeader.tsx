import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import editorContext from '@/context/editorContext';

export const useHeader = () => {
	const { tags, setTags, setPreview, storeMarkdown } = useContext(editorContext);
	
	const [completion, setCompletion] = useState<number>(0);
	const [showTags, setShowTags] = useState<boolean>(false);
	const selectedTags = (tags: string[]) => {
		setTags('tags', tags);
	};

    // const [width, setWidth] = useState<number>(0);
	useEffect(() => {
		// function handleResize() {
		// 	setWidth(window.innerWidth);
		// }

		// window.addEventListener('resize', handleResize);
		// handleResize();

		window.addEventListener('scroll', handleScroll as any);
		return () => {
			window.removeEventListener('scroll', handleScroll as any);
			// window.removeEventListener('resize', handleResize);
		};
	});

    // TODO we might need to truncate titles on header later on... or we might need to truncate something later, keep here just in case
	// const truncatedText = (text: string): string => {
	// 	const truncateText = (toTruncate: string, toRemove: number): string =>
	// 	  `${toTruncate.substring(0, toRemove)}...`
	// 	if (width < parseInt(theme.breakpoints.smallMobile.replace('px', '')))
	// 	  return truncateText(text, 60)
	// 	if (width < parseInt(theme.breakpoints.mobile.replace('px', '')))
	// 	  return truncateText(text, 130)
	// 	return text
	//   }

	const handleScroll = (e: SyntheticEvent) => {
		const header = document.querySelector('.scroll');
		const currentProgress = window.scrollY;
		currentProgress >= 70 ? header?.classList.add('isSticky') : header?.classList.remove('isSticky');
		const scrollHeight = document.body.scrollHeight - window.innerHeight;
		setCompletion(Number((currentProgress / scrollHeight).toFixed(2)) * 100);
	};

    return {
        showTags,
        setShowTags,
        tags,
        selectedTags,
        storeMarkdown,
        setPreview,
        completion
    };

};