import { FormikHandlers } from 'formik';
import { ReactNode } from 'react';
import terminalFormStyles from './Form.module.css';
import newsletterStyles from '../Newsletter/Newsletter.module.css';
import layoutStyles from '../Layout/Layout.module.css';

type FormProps = {
  children: ReactNode | ReactNode[];
  handleSubmit?: FormikHandlers['handleSubmit'];
  terminal?: boolean;
  newsletter?: boolean;
};

export const Form = ({
  children,
  handleSubmit,
  terminal = false,
  newsletter = false,
}: FormProps) => {
  const className = `
		${terminal ? terminalFormStyles.terminalForm : ''}
		${newsletter ? layoutStyles.bg404Pattern : ''}
		${newsletter ? newsletterStyles.container : ''}
	`;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (handleSubmit) handleSubmit(e);
      }}
      autoComplete="off"
      className={className.trim().length > 0 ? className : 'w-full'}
    >
      {children}
    </form>
  );
};
