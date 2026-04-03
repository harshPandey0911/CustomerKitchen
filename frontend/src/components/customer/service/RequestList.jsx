import RequestCard from './RequestCard';

export default function RequestList({ requests }) {
  if (requests.length === 0) {
    return (
      <section className="rounded-[24px] bg-white p-5 text-center !shadow-[0_14px_34px_rgba(30,30,30,0.08)]">
        <h2 className="text-lg font-bold text-[#1E1E1E]">No service requests yet</h2>
        <p className="mt-2 text-sm leading-6 text-[#6B7280]">
          Raise your first request to start tracking support updates here.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      {requests.map((request) => (
        <RequestCard key={request.id} request={request} />
      ))}
    </section>
  );
}
