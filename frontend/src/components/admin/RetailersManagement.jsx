import React, { useState } from 'react';
import { adminUi, statusBadge } from './adminStyles';

const RetailersManagement = () => {
  const [retailers] = useState([
    {
      id: 1,
      name: 'Premium Kitchen Store',
      owner: 'Rahul Kumar',
      location: 'Sector 7, Mumbai',
      contact: '9876-543-210',
      sales: 'Rs 2.3L',
      orders: 456,
      customers: 487,
      joinDate: '15 Jan 2024',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Royal Kitchen Solutions',
      owner: 'Priya Singh',
      location: 'Bandra, Mumbai',
      contact: '9876-543-211',
      sales: 'Rs 1.8L',
      orders: 342,
      customers: 356,
      joinDate: '22 Feb 2024',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Modern Kitchen Appliance',
      owner: 'Amit Patel',
      location: 'Andheri, Mumbai',
      contact: '9876-543-212',
      sales: 'Rs 2.1L',
      orders: 398,
      customers: 421,
      joinDate: '10 Mar 2024',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Elite Kitchen Supplies',
      owner: 'Neha Sharma',
      location: 'Dadar, Mumbai',
      contact: '9876-543-213',
      sales: 'Rs 1.5L',
      orders: 267,
      customers: 298,
      joinDate: '05 Mar 2024',
      status: 'Active',
    },
    {
      id: 5,
      name: 'Smart Kitchen Store',
      owner: 'Vikram Desai',
      location: 'Powai, Mumbai',
      contact: '9876-543-214',
      sales: 'Rs 1.9L',
      orders: 378,
      customers: 412,
      joinDate: '18 Mar 2024',
      status: 'Active',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredRetailers = retailers.filter((retailer) => {
    const matchesSearch =
      retailer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      retailer.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      retailer.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || retailer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { title: 'Total Retailers', value: retailers.length },
    { title: 'Active Retailers', value: retailers.filter((retailer) => retailer.status === 'Active').length },
    { title: 'Total Orders', value: retailers.reduce((sum, retailer) => sum + retailer.orders, 0) },
    { title: 'Total Customers', value: retailers.reduce((sum, retailer) => sum + retailer.customers, 0) },
  ];

  return (
    <div className={adminUi.page}>
      <div>
        <h1 className={adminUi.pageTitle}>Retailers</h1>
        <p className={adminUi.pageDescription}>Manage all retailers and their store performance.</p>
      </div>

      <div className={adminUi.statsGrid}>
        {stats.map((stat) => (
          <div key={stat.title} className={adminUi.card}>
            <p className={adminUi.cardTitle}>{stat.title}</p>
            <p className={adminUi.cardValue}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_220px]">
        <input
          type="text"
          placeholder="Search retailers"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={adminUi.input}
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className={adminUi.select}
        >
          <option>All</option>
          <option>Active</option>
        </select>
      </div>

      <div className={adminUi.panel}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={adminUi.tableHeader}>
              <tr>
                <th className={adminUi.th}>Store Name</th>
                <th className={adminUi.th}>Owner</th>
                <th className={adminUi.th}>Location</th>
                <th className={adminUi.th}>Orders</th>
                <th className={adminUi.th}>Customers</th>
                <th className={adminUi.th}>Sales</th>
                <th className={adminUi.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRetailers.length > 0 ? (
                filteredRetailers.map((retailer) => (
                  <tr key={retailer.id} className={adminUi.tableRow}>
                    <td className={`${adminUi.td} font-medium text-gray-900`}>
                      <div>
                        <p>{retailer.name}</p>
                        <p className="mt-1 text-xs text-gray-400">{retailer.joinDate}</p>
                      </div>
                    </td>
                    <td className={adminUi.td}>
                      <div>
                        <p>{retailer.owner}</p>
                        <p className="mt-1 text-xs text-gray-400">{retailer.contact}</p>
                      </div>
                    </td>
                    <td className={adminUi.td}>{retailer.location}</td>
                    <td className={`${adminUi.td} text-gray-800`}>{retailer.orders}</td>
                    <td className={`${adminUi.td} text-gray-800`}>{retailer.customers}</td>
                    <td className={`${adminUi.td} text-gray-800`}>{retailer.sales}</td>
                    <td className={adminUi.td}>
                      <span className={statusBadge(retailer.status)}>{retailer.status}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-sm text-gray-400">
                    No retailers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RetailersManagement;
