import React, { SyntheticEvent, useContext } from 'react';
import editorContext from '../context/editorContext';

type Props = {}

export const Editor = (props: Props) => {

	const {setMarkdownText} = useContext(editorContext);

	const onInputChange = (e:SyntheticEvent) => {
        const newValue = (e.target as HTMLInputElement).value;
		setMarkdownText(newValue);
    }

	return (
		<textarea 
			onChange={onInputChange} 
			className="h-[49rem] font-mono outline outline-offset-1 outline-3 outline-transparent focus:outline-purple-500 w-4/12 rounded-md resize-none text-xl text-white bg-slate-800 outline-none p-5 pl-10" />
	)
}