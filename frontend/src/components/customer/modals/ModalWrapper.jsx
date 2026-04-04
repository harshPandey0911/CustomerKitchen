import { useEffect, useState } from 'react';
import { LuX } from 'react-icons/lu';

const animationDurationMs = 300;

export default function ModalWrapper({ open, title, onClose, children }) {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);

      const frameId = window.requestAnimationFrame(() => {
        setVisible(true);
      });

      return () => window.cancelAnimationFrame(frameId);
    }

    setVisible(false);

    const timeoutId = window.setTimeout(() => {
      setMounted(false);
    }, animationDurationMs);

    return () => window.clearTimeout(timeoutId);
  }, [open]);

  useEffect(() => {
    if (!mounted) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mounted, onClose]);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[70] bg-[rgba(0,0,0,0.3)] backdrop-blur-[8px] transition-opacity duration-300 ease-out ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onClose}
    >
      <div
        className={`fixed inset-x-0 top-0 mx-auto flex h-[90vh] w-full max-w-[420px] flex-col overflow-hidden rounded-b-[20px] bg-[#F8F6F4] shadow-[0_24px_60px_rgba(30,30,30,0.18)] transition-transform duration-300 ease-out ${
          visible ? 'translate-y-0' : '-translate-y-full'
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#ECE4DD] bg-white px-4 py-4">
          <h2 className="text-[1.05rem] font-bold tracking-[-0.03em] text-[#1E1E1E]">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${title}`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F4ECE7] text-[#8B5E3C] transition-all duration-300 ease-out active:scale-95"
          >
            <LuX className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
