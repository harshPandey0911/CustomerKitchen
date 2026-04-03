export default function ProfileCard({ avatarInitial = 'H', fullName, email }) {
  return (
    <section className="rounded-[24px] bg-white px-5 py-6 text-center !shadow-[0_14px_34px_rgba(30,30,30,0.08)]">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#8B5E3C] text-2xl font-bold text-white !shadow-[0_12px_28px_rgba(139,94,60,0.24)]">
        {avatarInitial}
      </div>
      <h1 className="mt-4 text-[1.15rem] font-bold tracking-[-0.03em] text-[#1E1E1E]">{fullName}</h1>
      <p className="mt-1 text-sm text-[#6B7280]">{email}</p>
    </section>
  );
}
