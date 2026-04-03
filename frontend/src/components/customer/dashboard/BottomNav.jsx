export default function BottomNav({ items, activeId, onNavigate }) {
  return (
    <div className="pointer-events-none fixed bottom-4 left-1/2 z-40 w-[calc(100%-24px)] max-w-[392px] -translate-x-1/2">
      <nav className="pointer-events-auto grid w-full grid-cols-5 items-end rounded-full bg-white px-3 pb-3 pt-3 !shadow-[0_18px_40px_rgba(30,30,30,0.12)]">
        {items.map((item) => {
          const Icon = item.icon;
          const active = item.id === activeId;

          if (item.isCenter) {
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.path)}
                className="flex flex-col items-center justify-end text-center transition-all duration-300 ease-out active:scale-95"
                aria-current={active ? 'page' : undefined}
              >
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-full bg-[#8B5E3C] text-white transition-all duration-300 ease-out ${
                    active
                      ? 'scale-105 -translate-y-[20%] !shadow-[0_0_0_4px_#F8F6F4,0_14px_30px_rgba(139,94,60,0.34)]'
                      : '-translate-y-[20%] !shadow-[0_14px_30px_rgba(139,94,60,0.34)]'
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <span className={`-mt-1 text-[11px] font-semibold ${active ? 'text-[#8B5E3C]' : 'text-[#6B6B6B]'}`}>
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.path)}
              className="flex flex-col items-center justify-end gap-1 text-center transition-all duration-300 ease-out active:scale-95"
              aria-current={active ? 'page' : undefined}
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 ease-out ${
                  active
                    ? 'scale-105 bg-[#8B5E3C] text-white !shadow-[0_10px_24px_rgba(139,94,60,0.28)]'
                    : 'bg-transparent text-[#8A8A8A]'
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className={`text-[11px] font-medium ${active ? 'text-[#8B5E3C]' : 'text-[#6B6B6B]'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
