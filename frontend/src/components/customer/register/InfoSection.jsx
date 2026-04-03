import { LuCheck } from 'react-icons/lu';

export default function InfoSection() {
  const bullets = ['Track warranty', 'Service history', 'Easy support'];

  return (
    <section className="rounded-[24px] bg-white p-4 !shadow-[0_14px_34px_rgba(30,30,30,0.08)]">
      <h2 className="text-[1rem] font-bold tracking-[-0.02em] text-[#1E1E1E]">Why register</h2>
      <div className="mt-4 space-y-3">
        {bullets.map((bullet) => (
          <div key={bullet} className="flex items-center gap-3 rounded-[18px] bg-[#FBF8F5] px-3.5 py-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F4ECE7] text-[#8B5E3C]">
              <LuCheck className="h-4 w-4" />
            </span>
            <span className="text-sm font-medium text-[#1E1E1E]">{bullet}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
