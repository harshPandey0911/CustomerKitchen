import { LuChevronRight, LuCircleHelp, LuInfo } from 'react-icons/lu';

const iconMap = {
  support: LuCircleHelp,
  about: LuInfo,
};

function SupportCard({ action, onNavigate }) {
  const Icon = iconMap[action.icon] || LuCircleHelp;

  return (
    <button
      type="button"
      onClick={() => onNavigate(action.path)}
      className="flex w-full items-center gap-3 rounded-[20px] bg-white p-4 text-left !shadow-[0_14px_34px_rgba(30,30,30,0.08)] transition-all duration-300 ease-out active:scale-[0.97]"
    >
      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-[#F4ECE7] text-[#8B5E3C]">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-[#1E1E1E]">{action.label}</p>
        <p className="mt-1 text-sm leading-6 text-[#6B7280]">{action.meta}</p>
      </div>
      <span className="flex-none text-[#A9745B]">
        <LuChevronRight className="h-5 w-5" />
      </span>
    </button>
  );
}

export default function SupportSection({ actions, onNavigate }) {
  return (
    <section className="space-y-3">
      <div className="px-1">
        <h2 className="text-[1rem] font-bold tracking-[-0.02em] text-[#1E1E1E]">Support</h2>
        <p className="mt-1 text-sm text-[#6B7280]">Quick access to help and product dashboard details.</p>
      </div>
      <div className="space-y-3">
        {actions.map((action) => (
          <SupportCard key={action.label} action={action} onNavigate={onNavigate} />
        ))}
      </div>
    </section>
  );
}
