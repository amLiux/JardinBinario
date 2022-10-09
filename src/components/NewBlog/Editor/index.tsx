import { useEditor } from '../../../hooks/useEditor';
import editorStyles from './Editor.module.css';

export const Editor = () => {

	const {
		defaultValue,
		onInputChange
	} = useEditor();

	return (
		<textarea
			defaultValue={defaultValue}
			onChange={onInputChange}
			className={editorStyles.editor}
		/>
	);
};