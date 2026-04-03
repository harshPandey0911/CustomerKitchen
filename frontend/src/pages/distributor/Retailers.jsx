import React, { useMemo, useState } from 'react';
import toast from 'react-hot-toast';

const initialRetailers = [
  { id: 1, name: 'Rajesh Kumar', email: 'rajesh@shop.com', phone: '9876543210', location: 'Mumbai', status: 'Active' },
  { id: 2, name: 'Priya Sharma', email: 'priya@shop.com', phone: '9876543211', location: 'Delhi', status: 'Active' },
  { id: 3, name: 'Aman Verma', email: 'aman@shop.com', phone: '9876543212', location: 'Pune', status: 'Inactive' },
];

const initialRetailerForm = {
  name: '',
  email: '',
  phone: '',
  location: '',
  status: 'Active',
};

const cardClass = 'rounded-xl border border-gray-200 bg-white p-5 shadow-sm';
const panelClass = 'overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm';
const inputClass = 'w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200';
const selectClass = 'w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200';
const tableHeadClass = 'px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500';
const tableCellClass = 'px-5 py-4 text-sm text-gray-600';
const primaryButtonClass = 'rounded-lg bg-black px-4 py-2 text-sm text-white transition hover:bg-gray-900';
const secondaryButtonClass = 'rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100';

const getStatusClass = (status) => (status === 'Active'
  ? 'inline-flex rounded-full bg-gray-900 px-3 py-1 text-xs font-medium text-white'
  : 'inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600');

export default function Retailers({ searchQuery = '' }) {
  const [retailers, setRetailers] = useState(initialRetailers);
  const [showRetailerModal, setShowRetailerModal] = useState(false);
  const [editingRetailerId, setEditingRetailerId] = useState(null);
  const [retailerForm, setRetailerForm] = useState(initialRetailerForm);

  const query = searchQuery.trim().toLowerCase();
  const filteredRetailers = useMemo(
    () => retailers.filter((retailer) => (
      !query || [retailer.name, retailer.email, retailer.phone, retailer.location, retailer.status]
        .some((value) => String(value).toLowerCase().includes(query))
    )),
    [retailers, query]
  );

  const activeRetailers = retailers.filter((retailer) => retailer.status === 'Active').length;
  const inactiveRetailers = retailers.length - activeRetailers;
  const coveredCities = new Set(retailers.map((retailer) => retailer.location)).size;

  const stats = [
    { title: 'Total Retailers', value: retailers.length, meta: 'Retail partners onboarded' },
    { title: 'Active Retailers', value: activeRetailers, meta: 'Currently ordering stock' },
    { title: 'Inactive Retailers', value: inactiveRetailers, meta: 'Require follow-up or reactivation' },
    { title: 'Cities Covered', value: coveredCities, meta: 'Distribution reach across locations' },
  ];

  const openRetailerModal = (retailer = null) => {
    if (retailer) {
      setRetailerForm({
        name: retailer.name,
        email: retailer.email,
        phone: retailer.phone,
        location: retailer.location,
        status: retailer.status,
      });
      setEditingRetailerId(retailer.id);
    } else {
      setRetailerForm(initialRetailerForm);
      setEditingRetailerId(null);
    }
    setShowRetailerModal(true);
  };

  const closeRetailerModal = () => {
    setRetailerForm(initialRetailerForm);
    setEditingRetailerId(null);
    setShowRetailerModal(false);
  };

  const handleRetailerSubmit = (event) => {
    event.preventDefault();

    const nextRetailer = {
      name: retailerForm.name.trim(),
      email: retailerForm.email.trim(),
      phone: retailerForm.phone.trim(),
      location: retailerForm.location.trim(),
      status: retailerForm.status,
    };

    if (!nextRetailer.name || !nextRetailer.email || !nextRetailer.phone || !nextRetailer.location) {
      toast.error('Please complete all retailer details.');
      return;
    }

    if (editingRetailerId) {
      setRetailers((current) => current.map((retailer) => (
        retailer.id === editingRetailerId ? { ...retailer, ...nextRetailer } : retailer
      )));
      toast.success('Retailer updated successfully.');
    } else {
      setRetailers((current) => [
        { id: Math.max(...current.map((retailer) => retailer.id), 0) + 1, ...nextRetailer },
        ...current,
      ]);
      toast.success('Retailer added successfully.');
    }

    closeRetailerModal();
  };

  const handleDeleteRetailer = (id) => {
    const retailer = retailers.find((item) => item.id === id);
    setRetailers((current) => current.filter((item) => item.id !== id));
    toast.success(`${retailer?.name || 'Retailer'} deleted.`);
  };

  const retailerModal = showRetailerModal ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            {editingRetailerId ? 'Edit Retailer' : 'Add Retailer'}
          </h2>
          <p className="mt-1 text-sm text-gray-500">Manage retailer contact information and account status.</p>
        </div>

        <form onSubmit={handleRetailerSubmit} className="space-y-4 p-6">
          <input
            type="text"
            placeholder="Name"
            value={retailerForm.name}
            onChange={(event) => setRetailerForm((current) => ({ ...current, name: event.target.value }))}
            className={inputClass}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={retailerForm.email}
            onChange={(event) => setRetailerForm((current) => ({ ...current, email: event.target.value }))}
            className={inputClass}
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={retailerForm.phone}
            onChange={(event) => setRetailerForm((current) => ({ ...current, phone: event.target.value }))}
            className={inputClass}
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={retailerForm.location}
            onChange={(event) => setRetailerForm((current) => ({ ...current, location: event.target.value }))}
            className={inputClass}
            required
          />
          <select
            value={retailerForm.status}
            onChange={(event) => setRetailerForm((current) => ({ ...current, status: event.target.value }))}
            className={selectClass}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={closeRetailerModal} className={secondaryButtonClass}>
              Cancel
            </button>
            <button type="submit" className={primaryButtonClass}>
              {editingRetailerId ? 'Save Changes' : 'Add Retailer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Retailers</h1>
            <p className="mt-1 text-sm text-gray-500">Manage retailer contacts, maintain account status, and keep distributor relationships organized.</p>
          </div>

          <button type="button" onClick={() => openRetailerModal()} className={primaryButtonClass}>
            + Add Retailer
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.title} className={cardClass}>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <h2 className="mt-2 text-xl font-semibold text-gray-900">{stat.value}</h2>
              <p className="mt-2 text-xs text-gray-400">{stat.meta}</p>
            </div>
          ))}
        </div>

        <div className={panelClass}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className={tableHeadClass}>Name</th>
                  <th className={tableHeadClass}>Email</th>
                  <th className={tableHeadClass}>Phone</th>
                  <th className={tableHeadClass}>Location</th>
                  <th className={tableHeadClass}>Status</th>
                  <th className={tableHeadClass}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredRetailers.length > 0 ? (
                  filteredRetailers.map((retailer) => (
                    <tr key={retailer.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
                      <td className={`${tableCellClass} font-medium text-gray-900`}>{retailer.name}</td>
                      <td className={tableCellClass}>{retailer.email}</td>
                      <td className={tableCellClass}>{retailer.phone}</td>
                      <td className={tableCellClass}>{retailer.location}</td>
                      <td className={tableCellClass}>
                        <span className={getStatusClass(retailer.status)}>{retailer.status}</span>
                      </td>
                      <td className={tableCellClass}>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => openRetailerModal(retailer)}
                            className="text-sm text-gray-700 transition hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteRetailer(retailer.id)}
                            className="text-sm text-red-500 transition hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-5 py-12 text-center text-sm text-gray-400">
                      No matching retailers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {retailerModal}
    </>
  );
}
