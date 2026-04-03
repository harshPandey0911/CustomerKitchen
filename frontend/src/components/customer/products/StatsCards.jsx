function StatsCard({ label, value }) {
  return (
    <article className="rounded-[20px] bg-white px-3 py-4 text-center !shadow-[0_14px_34px_rgba(30,30,30,0.08)] transition-all duration-300 ease-out active:scale-95">
      <p className="text-[1.55rem] font-extrabold leading-none tracking-[-0.05em] text-[#1E1E1E]">{value}</p>
      <p className="mt-2 text-[11px] font-semibold leading-5 text-[#6B6B6B]">{label}</p>
    </article>
  );
}

export default function StatsCards({ stats }) {
  return (
    <section className="grid grid-cols-3 gap-3">
      {stats.map((stat) => (
        <StatsCard key={stat.label} label={stat.label} value={stat.value} />
      ))}
    </section>
  );
}
