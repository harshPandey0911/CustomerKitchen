import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { adminUi, statusBadge } from './adminStyles';
import { subAdminsApi } from '../../services/subAdminsApi';

const SubAdminsManagement = () => {
  const [subAdmins, setSubAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Manager',
    permissions: [],
  });

  const roles = ['Manager', 'Support', 'Finance'];
  const allPermissions = ['Inventory', 'Orders', 'Reports', 'Services'];

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '', role: 'Manager', permissions: [] });
  };

  const loadSubAdmins = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await subAdminsApi.list();
      setSubAdmins(response.subAdmins || []);
    } catch (nextError) {
      setError(nextError.message || 'Unable to load sub admins.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubAdmins();
  }, []);

  const filteredSubAdmins = useMemo(
    () =>
      subAdmins.filter((admin) => {
        const normalizedSearch = searchTerm.toLowerCase();
        const matchesSearch =
          admin.name.toLowerCase().includes(normalizedSearch) ||
          admin.email.toLowerCase().includes(normalizedSearch);
        const matchesRole = roleFilter === 'All' || admin.role === roleFilter;
        return matchesSearch && matchesRole;
      }),
    [roleFilter, searchTerm, subAdmins]
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (permission) => {
    setFormData((prev) => {
      const updatedPermissions = prev.permissions.includes(permission)
        ? prev.permissions.filter((item) => item !== permission)
        : [...prev.permissions, permission];
      return { ...prev, permissions: updatedPermissions };
    });
  };

  const handleAddSubAdmin = async () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      toast.error('Please fill name, email, and password.');
      return;
    }

    if (formData.password.trim().length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }

    if (formData.permissions.length === 0) {
      toast.error('Please select at least one permission.');
      return;
    }

    setSaving(true);

    try {
      const response = await subAdminsApi.create({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role,
        permissions: formData.permissions,
      });

      setSubAdmins((current) => [response.subAdmin, ...current]);
      resetForm();
      setShowModal(false);
      toast.success('Sub admin added successfully.');
    } catch (nextError) {
      toast.error(nextError.message || 'Unable to add sub admin.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSubAdmin = async (id) => {
    if (window.confirm('Are you sure you want to delete this sub admin?')) {
      setDeletingId(id);

      try {
        await subAdminsApi.remove(id);
        setSubAdmins((current) => current.filter((admin) => admin.id !== id));
        toast.success('Sub admin deleted successfully.');
      } catch (nextError) {
        toast.error(nextError.message || 'Unable to delete sub admin.');
      } finally {
        setDeletingId('');
      }
    }
  };

  const handleEditSubAdmin = (id) => {
    alert(`Edit functionality coming soon for sub admin ID: ${id}`);
  };

  const stats = [
    { title: 'Total Sub Admins', value: subAdmins.length },
    { title: 'Managers', value: subAdmins.filter((admin) => admin.role === 'Manager').length },
    { title: 'Support', value: subAdmins.filter((admin) => admin.role === 'Support').length },
    { title: 'Finance', value: subAdmins.filter((admin) => admin.role === 'Finance').length },
  ];

  return (
    <div className={adminUi.page}>
      <div className={adminUi.pageHeader}>
        <div>
          <h1 className={adminUi.pageTitle}>Sub Admins</h1>
          <p className={adminUi.pageDescription}>Manage sub-admin users and their permissions.</p>
        </div>
        <button onClick={() => setShowModal(true)} className={adminUi.primaryButton}>
          Add Sub Admin
        </button>
      </div>

      <div className={adminUi.statsGrid}>
        {stats.map((stat) => (
          <div key={stat.title} className={adminUi.card}>
            <p className={adminUi.cardTitle}>{stat.title}</p>
            <p className={adminUi.cardValue}>{stat.value}</p>
          </div>
        ))}
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={adminUi.input}
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className={adminUi.select}
        >
          <option value="All">All Roles</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      <div className={adminUi.panel}>
        <div className={adminUi.panelHeader}>
          <h2 className={adminUi.panelTitle}>Sub Admins List ({filteredSubAdmins.length})</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={adminUi.tableHeader}>
              <tr>
                <th className={adminUi.th}>Name</th>
                <th className={adminUi.th}>Email</th>
                <th className={adminUi.th}>Role</th>
                <th className={adminUi.th}>Permissions</th>
                <th className={adminUi.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {!loading && filteredSubAdmins.length > 0 ? (
                filteredSubAdmins.map((admin) => (
                  <tr key={admin.id} className={adminUi.tableRow}>
                    <td className={`${adminUi.td} font-medium text-gray-900`}>{admin.name}</td>
                    <td className={adminUi.td}>{admin.email}</td>
                    <td className={adminUi.td}>
                      <span className={statusBadge(admin.role === 'Finance' ? 'Pending' : 'Active')}>{admin.role}</span>
                    </td>
                    <td className={adminUi.td}>
                      <div className="flex flex-wrap gap-2">
                        {admin.permissions.map((permission) => (
                          <span key={permission} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                            {permission}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className={adminUi.td}>
                      <div className="flex items-center gap-4">
                        <button onClick={() => handleEditSubAdmin(admin.id)} className={adminUi.textButton}>
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteSubAdmin(admin.id)}
                          className="text-sm text-red-600 transition hover:underline"
                          disabled={deletingId === admin.id}
                        >
                          {deletingId === admin.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-sm text-gray-400">
                    {loading ? 'Loading sub admins...' : 'No sub admins found matching your criteria'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className={adminUi.modalOverlay}>
          <div className={`${adminUi.modal} max-h-[90vh] overflow-y-auto`}>
            <div className="flex items-center justify-between border-b border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900">Add Sub Admin</h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="text-xl text-gray-500 transition hover:text-gray-700"
              >
                x
              </button>
            </div>

            <div className="space-y-4 p-6">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  className={adminUi.input}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  className={adminUi.input}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create login password"
                  className={adminUi.input}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className={adminUi.select}
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Permissions</label>
                <div className="space-y-2">
                  {allPermissions.map((permission) => (
                    <label key={permission} className="flex items-center gap-3 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={formData.permissions.includes(permission)}
                        onChange={() => handlePermissionChange(permission)}
                        className="h-4 w-4 cursor-pointer accent-black"
                      />
                      {permission}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 border-t border-gray-200 p-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className={`flex-1 ${adminUi.secondaryButton} py-2`}
              >
                Cancel
              </button>
              <button
                onClick={handleAddSubAdmin}
                className={`flex-1 ${adminUi.primaryButton}`}
                disabled={saving}
              >
                {saving ? 'Adding...' : 'Add Sub Admin'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={adminUi.card}>
        <h3 className="mb-4 text-sm font-semibold text-gray-900">Roles and Permissions Guide</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm font-medium text-gray-800">Manager</p>
            <p className="mt-2 text-sm text-gray-500">Full access to inventory, orders, and reports.</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm font-medium text-gray-800">Support</p>
            <p className="mt-2 text-sm text-gray-500">Manage customer orders and service requests.</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm font-medium text-gray-800">Finance</p>
            <p className="mt-2 text-sm text-gray-500">View reports and inventory financial data.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubAdminsManagement;
