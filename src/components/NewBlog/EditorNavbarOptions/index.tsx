import { ReactNode, SyntheticEvent, useMemo, Fragment } from 'react';
import { Icons } from '@/components/Icons';
import { Tooltip } from '@/components/Tooltip';
import editorNavbarOptionsStyles from './EditorNavbarOptions.module.css';

type EditorNavbarOptionsProps = {
    showTags: any;
    setPreview: any;
    storeMarkdown: any;
    showSneakpeak: any;
}

type Options = {
    tooltipText: string;
    icon: ReactNode;
    submitButton?: boolean;
    onClick?: (e: SyntheticEvent) => void;
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: (e:SyntheticEvent) => void;
    form?: string;
    type?: 'submit';
}

export const EditorNavbarOptions = ({ showTags, setPreview, storeMarkdown, showSneakpeak }: EditorNavbarOptionsProps) => {

    const options: Options[] = useMemo(() => [
        {
            tooltipText: 'Save your work? This will override any saved progress!',
            onClick: () => storeMarkdown(),
            icon: Icons.SAVE,
        },
        {
            tooltipText: 'Add some tags to your blog for us to filter it better!',
            onClick: showTags,
            icon: Icons.TAG,
        },
        {
            tooltipText: 'Add a cool sneakpeak for users to engage with your blog',
            onClick: () => showSneakpeak((preview: boolean) => !preview),
            icon: Icons.SNEAKPEAK,
        },
        {
            tooltipText: 'Preview what you got so far',
            onClick: () => setPreview((preview: boolean) => !preview),
            icon: Icons.PREVIEW,
        },
        {
            tooltipText: "You ready? Let's publish it!",
            submitButton: true,
            icon: Icons.PUBLISH,
        }
    ], [showTags, setPreview, storeMarkdown, showSneakpeak]);

    return (
        <div className={editorNavbarOptionsStyles.container}>
            {
                options.map((option, key) => {
                    const buttonParams:ButtonProps = option.submitButton
                        ?
                        {
                            form: 'newBlogEntryForm',
                            type: 'submit'
                        }
                        :
                        {
                            onClick: option.onClick
                        };

                    return (
                        <Fragment key={`editor-option-${key}`}>
                            <Tooltip tooltipText={option.tooltipText}>
                                <button
                                    {...buttonParams}
                                    className={editorNavbarOptionsStyles.editorNavbarButton}
                                >
                                    {option.icon}
                                </button>
                            </Tooltip>
                        </Fragment>
                    );
                })
            }
        </div>
    );
};