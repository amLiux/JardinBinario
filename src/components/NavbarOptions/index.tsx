import { Fragment } from 'react';
import { Tooltip } from '@/components/Tooltip';
import navbarOptionsStyles from './NavbarOptions.module.css';
import { ButtonProps, NavbarOptionsProps, OptionProps } from '@/types/sharedTypes';
import { useNavbarOptions } from '@/hooks/useNavbarOptions';
import { Flexbox } from '../lib/Flexbox';

const Option = ({ option, buttonParams }: OptionProps) => (
    <Fragment>
        <Tooltip tooltipText={option.tooltipText}>
            <button
                {...buttonParams}
                className={navbarOptionsStyles.editorNavbarButton}
            >
                {option.icon}
                {option.text && option.text}
            </button>
        </Tooltip>
    </Fragment>
);

export const NavbarOptions = ({ setShowTags, setPreview, storeMarkdown, setShowSneakpeak, read = false, editor = false }: NavbarOptionsProps) => {

    const { options, shouldRender } = useNavbarOptions(
        setShowTags,
        setPreview,
        storeMarkdown,
        setShowSneakpeak,
        read,
        editor,
    );

    return shouldRender ? (
        <Flexbox justifyContent='end' alignItems='center' extraClass={navbarOptionsStyles.container}>
            {
                options.map((option, key) => {
                    const buttonParams: ButtonProps = option.submitButton
                        ?
                        {
                            form: 'newBlogEntryForm',
                            type: 'submit'
                        }
                        :
                        {
                            onClick: option.onClick
                        };

                    return <Option key={`editor-option-${key}`} buttonParams={buttonParams} option={option} />;
                })
            }
        </Flexbox>
    ) : null;
};