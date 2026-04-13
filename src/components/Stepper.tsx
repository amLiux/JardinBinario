import { useRouter } from 'next/router';
import React, { Children, ReactElement, ReactNode, useState } from 'react';
import { useAuth } from '@/apollo/AuthClient';
import { HelpMessage } from './HelpMessage';
import { Form } from './Form';

interface StepChildProps {
    onSubmit?: () => Promise<string | boolean | null>;
    children?: ReactNode;
}

interface StepperProps {
    children: ReactNode;
}

export const Stepper = ({ children }: StepperProps) => {
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
        const child = currentChild as ReactElement<StepChildProps>;
        if (child.props.onSubmit) {
            const response = await child.props.onSubmit();
            if (response) {
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
        <HelpMessage stepper text='Go back to login' onClick={() => router.push('/admin/login')} />
    </Form>;
};

export const Step = ({ children }: any) => children;
