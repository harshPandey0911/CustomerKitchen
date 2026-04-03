import { formatDisplayDate } from '../../../data/customerOwnership';

const badgeStyles = {
  Pending: 'bg-[#FFF2E8] text-[#D97706]',
  'In Progress': 'bg-[#EAF2FF] text-[#2563EB]',
  Completed: 'bg-[#EAF7EF] text-[#1F8A4D]',
};

const getStepState = (status) => ({
  requested: true,
  assigned: status === 'In Progress' || status === 'Completed',
  completed: status === 'Completed',
});

function TimelineStep({ label, active }) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <span className={`h-2.5 w-2.5 flex-none rounded-full ${active ? 'bg-[#8B5E3C]' : 'bg-[#E5DDD5]'}`} />
      <span className={`truncate text-[11px] ${active ? 'font-semibold text-[#8B5E3C]' : 'text-[#9A938D]'}`}>{label}</span>
    </div>
  );
}

export default function RequestCard({ request }) {
  const badgeClass = badgeStyles[request.status] || badgeStyles.Pending;
  const steps = getStepState(request.status);

  return (
    <article className="rounded-[22px] bg-white p-4 !shadow-[0_14px_34px_rgba(30,30,30,0.08)] transition-all duration-300 ease-out active:scale-[0.97]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-[1rem] font-bold leading-6 text-[#1E1E1E]">{request.productName}</h2>
          <p className="mt-1 text-sm text-[#6B7280]">{request.issueType}</p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[#A1A1AA]">{request.id}</p>
        </div>

        <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${badgeClass}`}>
          {request.status}
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-[#6B7280]">{request.description}</p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-[18px] bg-[#FBF8F5] p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A9745B]">Requested</p>
          <p className="mt-2 text-sm font-medium text-[#1E1E1E]">{formatDisplayDate(request.createdAt)}</p>
        </div>
        <div className="rounded-[18px] bg-[#FBF8F5] p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A9745B]">Assigned</p>
          <p className="mt-2 text-sm font-medium text-[#1E1E1E]">{request.assignedTechnician}</p>
        </div>
      </div>

      <div className="mt-4 rounded-[18px] bg-[#FBF8F5] p-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A9745B]">Timeline</p>
        <div className="mt-3 flex items-center justify-between gap-2">
          <TimelineStep label="Requested" active={steps.requested} />
          <span className={`h-px flex-1 ${steps.assigned ? 'bg-[#8B5E3C]' : 'bg-[#E5DDD5]'}`} />
          <TimelineStep label="Assigned" active={steps.assigned} />
          <span className={`h-px flex-1 ${steps.completed ? 'bg-[#8B5E3C]' : 'bg-[#E5DDD5]'}`} />
          <TimelineStep label="Completed" active={steps.completed} />
        </div>
      </div>

      {request.imageName ? (
        <p className="mt-4 inline-flex rounded-full bg-[#F4ECE7] px-3 py-1 text-[11px] font-medium text-[#8B5E3C]">
          Attachment: {request.imageName}
        </p>
      ) : null}
    </article>
  );
}
