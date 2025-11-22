'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Achievement {
  id: string;
  code: string;
  nameEn: string;
  nameRu: string;
  descriptionEn: string;
  descriptionRu: string;
  icon: string;
}

interface AchievementAnimationProps {
  show: boolean;
  achievement: Achievement;
  onComplete?: () => void;
}

const AchievementAnimation: React.FC<AchievementAnimationProps> = ({
  show,
  achievement,
  onComplete,
}) => {
  // авто-закрытие по таймеру (через 2.5с)
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => onComplete?.(), 2500);
    return () => clearTimeout(timer);
  }, [show, onComplete]);

  // закрытие при клике на фон
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onComplete?.();
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center text-center max-w-sm mx-auto relative"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
          >
            <div className="text-7xl mb-4">{achievement.icon}</div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {achievement.nameEn}
            </h2>

            <p className="text-gray-600 mb-4">{achievement.descriptionEn}</p>

            <motion.div
              className="text-5xl text-yellow-400"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: [0, 1.25, 1], rotate: [0, 8, -8, 0] }}
              transition={{ duration: 0.9 }}
            >
              ✨
            </motion.div>

            <button
              onClick={() => onComplete?.()}
              className="mt-6 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-sm text-gray-700"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AchievementAnimation;
