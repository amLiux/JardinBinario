import { SyntheticEvent } from 'react';
import { Icons } from '../../Icons';
import { Tooltip } from '../../Tooltip';
import editorNavbarOptionsStyles from './EditorNavbarOptions.module.css';

type EditorNavbarOptionsProps = {
    showTags: any;
    setPreview: any;
    storeMarkdown: any;
}


export const EditorNavbarOptions = ({ showTags, setPreview, storeMarkdown }: EditorNavbarOptionsProps) => {

    const handleTagToggle = (e: SyntheticEvent) => {
        const target = (e.target as HTMLInputElement);
        showTags((show: boolean) => !show);
        target.focus();
    };

    return (
        <div className={editorNavbarOptionsStyles.container}>
            <Tooltip tooltipText='Add some tags to your blog for us to categorize and filter it better!'>
                <button
                    onClick={handleTagToggle}
                    className={editorNavbarOptionsStyles.editorNavbarButton}
                >
                    {Icons.TAG}
                </button>
            </Tooltip>
            <Tooltip tooltipText='Save your work? This will override any saved in-progress blog entry!'>
                <button
                    onClick={() => storeMarkdown()}
                    className={editorNavbarOptionsStyles.editorNavbarButton}
                >
                    {Icons.SAVE}
                </button>
            </Tooltip>
            <Tooltip tooltipText='Preview what you got so far, Note: it will look exacly like this for users!'>
                <button
                    onClick={() => setPreview((preview: boolean) => !preview)}
                    className={editorNavbarOptionsStyles.editorNavbarButton}
                >
                    {Icons.PREVIEW}
                </button>
            </Tooltip>
            <Tooltip tooltipText="You ready? Let's publish it!">
                <button
                    form='newBlogEntryForm'
                    type='submit'
                    className={editorNavbarOptionsStyles.editorNavbarButton}
                >
                    {Icons.PUBLISH}
                </button>
            </Tooltip>
        </div>
    );
};