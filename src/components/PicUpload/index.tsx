import { Flexbox } from '../lib/Flexbox';
import picUploadStyles from './PicUpload.module.css';

export const PicUpload = ({ selectedFile }: any) => {
    return (
        <div className={picUploadStyles.container}>
            <div className={picUploadStyles.relativeContainer}>
                {/* eslint-disable @next/next/no-img-element */}
                <img
                    className={picUploadStyles.previewImage}
                    src={`${selectedFile ? selectedFile : process.env.NEXT_PUBLIC_PLACEHOLDER_IMAGE}`}
                    alt='profile picutre' 
                />
                <Flexbox alignItems='center' justifyContent='center' extraClass={`group ${picUploadStyles.fileInput}`}>
                    <img
                        className={`${picUploadStyles.uploadLogo} group-hover:block`}
                        src={process.env.NEXT_PUBLIC_UPLOAD_IMAGE}
                        alt='upload logo'
                    />
                </Flexbox>
            </div>
        </div>
    );
};
