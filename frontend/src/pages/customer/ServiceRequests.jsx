import { useMemo } from 'react';
import ServiceHeader from '../../components/customer/service/ServiceHeader';
import StatsCards from '../../components/customer/service/StatsCards';
import RequestList from '../../components/customer/service/RequestList';

export default function ServiceRequests({ products, serviceRequests, onNavigate, onOpenServiceForm }) {
  const sortedRequests = useMemo(
    () =>
      [...serviceRequests].sort(
        (left, right) => new Date(right.updatedAt || right.createdAt).getTime() - new Date(left.updatedAt || left.createdAt).getTime(),
      ),
    [serviceRequests],
  );

  const openRequests = serviceRequests.filter((request) => request.status !== 'Completed').length;
  const stats = [
    { label: 'Total Requests', value: serviceRequests.length },
    { label: 'Open Requests', value: openRequests },
    { label: 'Completed', value: serviceRequests.filter((request) => request.status === 'Completed').length },
  ];

  return (
    <div className="space-y-4">
      <ServiceHeader disabled={products.length === 0} onRaiseRequest={onOpenServiceForm} />

      {products.length === 0 ? (
        <div className="rounded-[24px] bg-white p-5 text-center !shadow-[0_14px_34px_rgba(30,30,30,0.08)]">
          <p className="text-lg font-bold text-[#1E1E1E]">Register a product before requesting service</p>
          <p className="mt-3 text-sm leading-6 text-[#6B7280]">
            Service requests are tied to owned appliances, so start by adding at least one registered product to your dashboard.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('/customer/register-product')}
            className="mt-4 rounded-xl bg-[#8B5E3C] px-4 py-2.5 text-sm font-semibold text-white !shadow-[0_10px_24px_rgba(139,94,60,0.24)] transition-all duration-300 ease-out active:scale-95"
          >
            Register Product
          </button>
        </div>
      ) : null}

      <StatsCards stats={stats} />
      <RequestList requests={sortedRequests} />
    </div>
  );
}
