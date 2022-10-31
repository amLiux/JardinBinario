import { useRouter } from 'next/router';
import React, { Children, ReactNode, useState } from 'react';
import { useAuth } from '@/apollo/AuthClient';
import { HelpMessage } from './HelpMessage';
import { Form } from './Form';

export const Stepper = ({ children }: any) => {
    const [step, setStep] = useState<number>(0);
    const childrenArray = Children.toArray(children as ReactNode);
    const totalSteps = childrenArray.length;
    const isLastStep = step === totalSteps - 1;
    const { setMessage, removeMessage } = useAuth();
	const router = useRouter();

    const next = () => setStep(Math.min(step + 1, totalSteps - 1));

    const currentChild = childrenArray[step];

    if (!React.isValidElement(currentChild)) return null;

    const handleSubmit = async () => {
        if (currentChild.props.onSubmit) {
            const response = await currentChild.props.onSubmit();
            // TODO check why new password message is not getting here;
            if(response) {
                setMessage({
                    msg: response,
                    error: false,
                });
            } else removeMessage();
        }
        !isLastStep && next(); 
    };

    return <Form handleSubmit={handleSubmit}>
        {currentChild}
        <HelpMessage text='Go back to login' onClick={() => router.push('/login')} />
    </Form>;
};

export const Step = ({ children }: any) => children;
