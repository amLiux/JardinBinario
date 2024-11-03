import React, { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTransition } from '@/hooks/useTransition';
import { Message } from '@/components/Message';
import layoutStyles from '@/layouts/Layout/Layout.module.css';
import { LoadingSplash } from '../LoadingSplash';
import { Flexbox } from '../lib/Flexbox';

interface TransitionProps {
  children: ReactNode | ReactNode[];
  fancyTransition?: boolean;
}

export const Transition = ({ children, fancyTransition = false }: TransitionProps) => {
  const { showMessage, asPath, variants, handleClose, message, loading } =
    useTransition();

  return (
    <Flexbox
      extraClass={`
				min-h-screen
				bg-slate-900
        min-w-screen
			`}
      justifyContent="center"
      flexDirection="column"
    >
      <div
        // TODO check this logic? sort of unreadable
        className={`
						${
              showMessage !== ''
                ? layoutStyles.smoothRender
                : message !== ''
                  ? layoutStyles.smoothRemove
                  : ''
            }
					`}
      >
        {message?.msg !== '' && (
          <Message
            index={asPath === '/'}
            handleClose={handleClose}
            warning={message?.warning}
            error={message?.error}
            message={message?.msg}
          />
        )}
      </div>
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={asPath}
          variants={variants}
          initial="in"
          animate="inactive"
          exit="out"
        >
          {fancyTransition ? children : loading ? <LoadingSplash /> : children}
        </motion.div>
      </AnimatePresence>
    </Flexbox>
  );
};
