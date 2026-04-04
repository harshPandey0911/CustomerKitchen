import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { retailersApi } from '../../services/retailersApi';

const initialRetailerForm = {
  name: '',
  email: '',
  password: '',
  phone: '',
  location: '',
  status: 'Active',
};

const cardClass = 'panel-hover-card rounded-xl border border-gray-200 bg-white p-5 shadow-sm';
const panelClass = 'panel-hover-surface overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm';
const inputClass = 'w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200';
const selectClass = 'w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200';
const tableHeadClass = 'px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500';
const tableCellClass = 'px-5 py-4 text-sm text-gray-600';
const primaryButtonClass = 'panel-hover-button-dark rounded-lg bg-black px-4 py-2 text-sm text-white transition disabled:cursor-not-allowed disabled:opacity-50';
const secondaryButtonClass = 'panel-hover-button-light rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 transition';

const getStatusClass = (status) =>
  status === 'Active'
    ? 'inline-flex rounded-full bg-gray-900 px-3 py-1 text-xs font-medium text-white'
    : 'inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600';

const getDistributorEmail = () => {
  try {
    return JSON.parse(localStorage.getItem('loginData') || '{}')?.email?.trim().toLowerCase() || '';
  } catch {
    return '';
  }
};

export default function Retailers({ searchQuery = '' }) {
  const [retailers, setRetailers] = useState([]);
  const [showRetailerModal, setShowRetailerModal] = useState(false);
  const [editingRetailerId, setEditingRetailerId] = useState(null);
  const [retailerForm, setRetailerForm] = useState(initialRetailerForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState('');
  const [error, setError] = useState('');

  const distributorEmail = getDistributorEmail();
  const query = searchQuery.trim().toLowerCase();

  useEffect(() => {
    let isCancelled = false;

    const loadRetailers = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await retailersApi.list(distributorEmail);

        if (isCancelled) {
          return;
        }

        setRetailers(response.retailers || []);
      } catch (nextError) {
        if (isCancelled) {
          return;
        }

        setRetailers([]);
        setError(nextError.message || 'Unable to load retailers.');
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    loadRetailers();

    return () => {
      isCancelled = true;
    };
  }, [distributorEmail]);

  const filteredRetailers = useMemo(
    () =>
      retailers.filter((retailer) =>
        !query ||
        [retailer.name, retailer.email, retailer.phone, retailer.location, retailer.status, retailer.orderCount]
          .some((value) => String(value).toLowerCase().includes(query))),
    [query, retailers]
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
        password: '',
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

  const handleRetailerSubmit = async (event) => {
    event.preventDefault();

    const nextRetailer = {
      name: retailerForm.name.trim(),
      email: retailerForm.email.trim(),
      phone: retailerForm.phone.trim(),
      location: retailerForm.location.trim(),
      status: retailerForm.status,
      createdBy: distributorEmail,
    };

    if (!nextRetailer.name || !nextRetailer.email || !nextRetailer.phone || !nextRetailer.location) {
      toast.error('Please complete all retailer details.');
      return;
    }

    if (!editingRetailerId && retailerForm.password.trim().length < 6) {
      toast.error('Retailer password must be at least 6 characters.');
      return;
    }

    setSaving(true);

    try {
      if (editingRetailerId) {
        const response = await retailersApi.update(editingRetailerId, nextRetailer);
        setRetailers((current) =>
          current.map((retailer) => (retailer.id === editingRetailerId ? response.retailer : retailer))
        );
        toast.success('Retailer updated successfully.');
      } else {
        const response = await retailersApi.create({
          ...nextRetailer,
          password: retailerForm.password,
        });
        setRetailers((current) => [response.retailer, ...current]);
        toast.success('Retailer added successfully.');
      }

      closeRetailerModal();
    } catch (nextError) {
      toast.error(nextError.message || 'Unable to save retailer.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteRetailer = async (id) => {
    const retailer = retailers.find((item) => item.id === id);
    setDeletingId(id);

    try {
      await retailersApi.remove(id, distributorEmail);
      setRetailers((current) => current.filter((item) => item.id !== id));
      toast.success(`${retailer?.name || 'Retailer'} deleted.`);
    } catch (nextError) {
      toast.error(nextError.message || 'Unable to delete retailer.');
    } finally {
      setDeletingId('');
    }
  };

  const retailerModal = showRetailerModal ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            {editingRetailerId ? 'Edit Retailer' : 'Add Retailer'}
          </h2>
          <p className="mt-1 text-sm text-gray-500">Manage retailer contact information and login access.</p>
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
          {!editingRetailerId ? (
            <input
              type="password"
              placeholder="Password"
              value={retailerForm.password}
              onChange={(event) => setRetailerForm((current) => ({ ...current, password: event.target.value }))}
              className={inputClass}
              required
            />
          ) : null}
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
            <button type="submit" className={primaryButtonClass} disabled={saving}>
              {saving ? 'Saving...' : editingRetailerId ? 'Save Changes' : 'Add Retailer'}
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

        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

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
                {!loading && filteredRetailers.length > 0 ? (
                  filteredRetailers.map((retailer) => (
                    <tr key={retailer.id} className="panel-hover-row border-b border-gray-200 last:border-b-0">
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
                            className="text-sm text-red-500 transition hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={deletingId === retailer.id}
                          >
                            {deletingId === retailer.id ? 'Deleting...' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-5 py-12 text-center text-sm text-gray-400">
                      {loading ? 'Loading retailers...' : 'No matching retailers found.'}
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
