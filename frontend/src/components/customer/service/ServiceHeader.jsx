export default function ServiceHeader({ disabled, onRaiseRequest }) {
  return (
    <section className="rounded-[24px] bg-white p-4 !shadow-[0_14px_34px_rgba(30,30,30,0.08)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-[1.2rem] font-bold tracking-[-0.03em] text-[#1E1E1E]">Service Requests</h1>
          <p className="mt-1 truncate text-sm text-[#6B7280]">
            Track every support issue from request creation to completion.
          </p>
        </div>

        <button
          type="button"
          onClick={onRaiseRequest}
          disabled={disabled}
          className="flex-none rounded-xl px-3.5 py-2.5 text-[12px] font-semibold text-white !shadow-[0_10px_24px_rgba(139,94,60,0.24)] transition-all duration-300 ease-out active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, #A9745B, #6E4B2A)' }}
        >
          Raise Request
        </button>
      </div>
    </section>
  );
}
