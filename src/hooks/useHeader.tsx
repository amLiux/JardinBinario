import { useContext, useState } from 'react';
import editorContext from '@/context/editorContext';

export const useHeader = () => {
	const { tags, setTags, setPreview, storeMarkdown, setShowSneakpeak } = useContext(editorContext);
	
	const [showTags, setShowTags] = useState<boolean>(false);
	const selectedTags = (tags: string[]) => {
		setTags('tags', tags);
	};

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

    return {
        showTags,
        setShowTags,
        tags,
        selectedTags,
        storeMarkdown,
        setPreview,
		setShowSneakpeak
    };

};