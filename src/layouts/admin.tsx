import { ReactNode, useEffect, useState } from 'react';

import { Layout } from '@/layouts/Layout';
import { Sidebar } from '@/components/Sidebar';
import { Flexbox } from '@/components/lib/Flexbox';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';

interface AdminLayoutProps {
  children: ReactNode | ReactNode[];
}

const transitionVariants = {
  initial: { y: '100%', opacity: 0 },
  enter: { y: '0%', opacity: 1 },
  exit: { y: '100%', opacity: 0 },
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { asPath } = useRouter();
  const [key, setKey] = useState(asPath);

  useEffect(() => {
    setKey(asPath);
  }, [asPath]);

  return (
    <Layout admin>
      <Flexbox alignItems="center">
        <Sidebar />
        <AnimatePresence mode="wait">
          <motion.div
            className='w-full'
            key={key}
            variants={transitionVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            transition={{ duration: 1.4 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </Flexbox>
    </Layout>
  );
}
