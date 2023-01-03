import { Icons } from '@/components/Icons';
import { NavbarOptionsProps, Options } from '@/types/sharedTypes';
import { useMemo, useState } from 'react';

export const useNavbarOptions = (
    setShowTags: NavbarOptionsProps['setShowTags'],
    setPreview: NavbarOptionsProps['setPreview'],
    storeMarkdown: NavbarOptionsProps['storeMarkdown'],
    setShowSneakpeak: NavbarOptionsProps['setShowSneakpeak'],
    read: NavbarOptionsProps['read'],
    editor: NavbarOptionsProps['editor']
) => {

    const [copied, setCopied] = useState<boolean>(false);

    const copyToClipboard = () => {
        const { href } = window.location;
        const queryParam = '?shared=true';
        const toCopy = href.includes(queryParam) ? href : `${href}${queryParam}`;
        navigator.clipboard.writeText(toCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };


    const editorNavbarOptions: Options[] = useMemo(() => [
        {
            tooltipText: 'Save your work? This will override any saved progress!',
            onClick: () => storeMarkdown(),
            icon: Icons.SAVE,
        },
        {
            tooltipText: 'Add some tags to your blog for us to filter it better!',
            onClick: setShowTags,
            icon: Icons.TAG,
        },
        {
            tooltipText: 'Add a cool sneakpeak for users to engage with your blog',
            onClick: () => setShowSneakpeak((preview: boolean) => !preview),
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
    ], [setShowTags, setPreview, storeMarkdown, setShowSneakpeak]);

    const readNavbarOptions: Options[] = useMemo(() => [
        {
            tooltipText: 'Share this blog with someone that might find it useful!',
            onClick: () => copyToClipboard(),
            icon: Icons.SHARE,
            text: copied ? 'Copied' : 'Share This',
        },
    ], [copied]);

    const options = read ? readNavbarOptions : editorNavbarOptions;

    return {
        options,
        shouldRender: (editor || read),
    };
};