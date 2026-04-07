export default function HomeHero({ userName }) {
  return (
    <section className="overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,#A9745B_0%,#6E4B2A_100%)] relative p-8 text-white !shadow-[0_18px_42px_rgba(139,94,60,0.22)] border border-white/10">
      {/* Decorative elements */}
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        <p className="text-sm font-medium text-white/70 mb-2 tracking-wider uppercase">Welcome back</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.04em] text-white">
          Hello,{` `}
          <span className="bg-gradient-to-r from-amber-100 to-amber-50 bg-clip-text text-transparent font-extrabold">
            {userName}
          </span>
        </h1>
        <p className="mt-4 text-white/80 text-base font-medium">Your kitchen is ready to serve delicious meals 🍳</p>
      </div>
    </section>
  );
}
