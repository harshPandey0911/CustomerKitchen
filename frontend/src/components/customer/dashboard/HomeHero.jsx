export default function HomeHero({ userName }) {
  return (
    <section className="overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,#A9745B_0%,#6E4B2A_100%)] p-5 text-white !shadow-[0_18px_42px_rgba(139,94,60,0.22)]">
      <h1 className="text-[1.5rem] font-semibold tracking-[-0.04em] text-white">
        Hello,{` `}
        <span className="font-extrabold">{userName}</span>
      </h1>
    </section>
  );
}
