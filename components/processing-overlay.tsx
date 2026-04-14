"use client";

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export function ProcessingOverlay() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setVisible(false);
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, [pathname]);

  useEffect(() => {
    const showOverlay = () => {
      setVisible(true);
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        setVisible(false);
        timerRef.current = null;
      }, 1400);
    };

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        'a[href], button, [role="button"], input[type="submit"], input[type="button"], summary'
      );
      if (!interactive) return;
      showOverlay();
    };

    const onSubmit = () => showOverlay();

    document.addEventListener('click', onPointerDown, true);
    document.addEventListener('submit', onSubmit, true);
    return () => {
      document.removeEventListener('click', onPointerDown, true);
      document.removeEventListener('submit', onSubmit, true);
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden px-4"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.92)_0%,rgba(248,241,231,0.82)_34%,rgba(101,31,45,0.36)_100%)]" />
          <div className="absolute inset-0 bg-brand-maroonDeep/20 backdrop-blur-sm" />
          <motion.div
            className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-brand-gold/12 blur-3xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.45, 0.65, 0.45] }}
            transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-brand-maroon/18 blur-3xl"
            animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.5, 0.35] }}
            transition={{ repeat: Infinity, duration: 6.2, ease: 'easeInOut' }}
          />

          <motion.div
            initial={{ scale: 0.92, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 8 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            className="relative flex w-full max-w-md flex-col items-center gap-5 rounded-[32px] border border-white/55 bg-white/55 px-8 py-10 shadow-[0_30px_80px_rgba(61,17,25,0.16)] backdrop-blur-2xl"
          >
            <div className="relative flex h-28 w-28 items-center justify-center">
              <motion.div
                className="absolute inset-0 rounded-full border border-brand-gold/25"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-4 rounded-full bg-brand-gold/10 blur-sm"
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
              />

              <div className="relative z-10 flex h-22 w-22 items-center justify-center rounded-[26px] border border-white/80 bg-white/95 p-3 shadow-soft">
                <Image src="/logo.png" alt="ELANTRAA logo" width={72} height={72} className="h-14 w-14 object-contain" />
              </div>
            </div>

            <div className="text-center">
              <p className="font-serif text-2xl text-brand-maroonDeep">Processing your request</p>
              <p className="mt-1 text-sm text-stone-600">Please wait while ELANTRAA prepares the next step.</p>
            </div>

            <div className="flex items-center gap-2">
              <motion.span
                className="h-2.5 w-2.5 rounded-full bg-brand-maroon"
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut' }}
              />
              <motion.span
                className="h-2.5 w-2.5 rounded-full bg-brand-gold"
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 0.9, delay: 0.15, ease: 'easeInOut' }}
              />
              <motion.span
                className="h-2.5 w-2.5 rounded-full bg-brand-maroon"
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 0.9, delay: 0.3, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
