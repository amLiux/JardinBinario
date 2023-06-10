import { FormikHandlers } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

interface SneakpeakProps {
    showSneakpeak: boolean;
    sneakpeak: string;
    setSneakpeak: FormikHandlers['handleChange'];
}

export const Sneakpeak = ({ showSneakpeak, sneakpeak, setSneakpeak }: SneakpeakProps) => {
    return (
        <AnimatePresence>
            {showSneakpeak &&
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* TODO not sure if styling wise is the best, maybe change styling later */}
                    <div className='bg-white p-3 border-t-2 border-b-2 border-purple-500 mb-3'>
                        <input
                            id='sneakpeak'
                            className='text-black w-full outline-none'
                            value={sneakpeak}
                            onChange={setSneakpeak}
                        />
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    );
};
