function DashboardCard({ title, value, subtitle }) {
  return (
    <article className="min-h-[132px] rounded-[22px] bg-white p-4 !shadow-[0_14px_34px_rgba(30,30,30,0.08)] transition-all duration-300 ease-out active:scale-95">
      <div className="flex items-start justify-between gap-3">
        <p className="max-w-[7rem] text-[13px] font-semibold leading-5 text-[#1E1E1E]">{title}</p>
        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#8B5E3C]" />
      </div>
      <p className="mt-5 text-[2rem] font-extrabold leading-none tracking-[-0.05em] text-[#1E1E1E]">{value}</p>
      <p className="mt-3 text-xs leading-5 text-[#6B6B6B]">{subtitle}</p>
    </article>
  );
}

export default function DashboardCards({ cards }) {
  return (
    <section className="grid grid-cols-2 gap-4">
      {cards.map((card) => (
        <DashboardCard
          key={card.title}
          title={card.title}
          value={card.value}
          subtitle={card.subtitle}
        />
      ))}
    </section>
  );
}
