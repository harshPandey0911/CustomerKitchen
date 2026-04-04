import { useEffect, useState } from 'react';
import { LuX } from 'react-icons/lu';

const animationDurationMs = 300;

export default function InlineFormSection({ open, title, onClose, children }) {
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

  if (!mounted) {
    return null;
  }

  return (
    <section
      className={`overflow-hidden transition-all duration-300 ease-out ${
        visible ? 'mb-5 max-h-[2200px] opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-[24px] bg-white p-4 !shadow-[0_14px_34px_rgba(30,30,30,0.08)]">
          <div className="min-w-0">
            <h2 className="text-[1.05rem] font-bold tracking-[-0.03em] text-[#1E1E1E]">{title}</h2>
            <p className="mt-1 text-sm leading-6 text-[#6B6B6B]">Complete the form below and continue on the same page.</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${title}`}
            className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#F4ECE7] text-[#8B5E3C] transition-all duration-300 ease-out active:scale-95"
          >
            <LuX className="h-5 w-5" />
          </button>
        </div>

        {children}
      </div>
    </section>
  );
}
