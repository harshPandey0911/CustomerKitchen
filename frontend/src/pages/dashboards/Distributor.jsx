import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Retailers from '../distributor/Retailers';
import { APP_DOMAIN, APP_NAME } from '../../constants/branding';

const sections = [
  { heading: 'Overview', items: [{ id: 'dashboard', label: 'Dashboard', icon: 'dashboard', path: '/distributor/dashboard' }] },
  {
    heading: 'Management',
    items: [
      { id: 'inventory', label: 'Inventory', icon: 'box', path: '/distributor/dashboard' },
      { id: 'orders', label: 'Orders', icon: 'cart', path: '/distributor/dashboard' },
      { id: 'restock', label: 'Restock Requests', icon: 'refresh', path: '/distributor/dashboard' },
      { id: 'retailers', label: 'Retailers', icon: 'store', path: '/distributor/retailers' },
    ],
  },
  { heading: 'Insights', items: [{ id: 'performance', label: 'Performance', icon: 'chart', path: '/distributor/dashboard' }] },
  { heading: 'Support', items: [{ id: 'settings', label: 'Settings', icon: 'gear', path: '/distributor/dashboard' }] },
  { heading: 'System', items: [{ id: 'logout', label: 'Logout', icon: 'logout', action: 'logout' }] },
];

const initialDistributors = [
  { id: 1, name: 'Rajesh Kumar', email: `rajesh@${APP_DOMAIN}`, phone: '+91 98765 43210', location: 'Mumbai', status: 'Active', totalOrders: 42 },
  { id: 2, name: 'Priya Singh', email: `priya@${APP_DOMAIN}`, phone: '+91 98765 43211', location: 'Delhi', status: 'Active', totalOrders: 37 },
  { id: 3, name: 'Amit Patel', email: `amit@${APP_DOMAIN}`, phone: '+91 98765 43212', location: 'Ahmedabad', status: 'Inactive', totalOrders: 24 },
  { id: 4, name: 'Anjali Desai', email: `anjali@${APP_DOMAIN}`, phone: '+91 98765 43213', location: 'Pune', status: 'Active', totalOrders: 29 },
];

const initialInventory = [
  { id: 1, product: 'Mixer Grinder', sku: 'DST-MG-210', availableQty: 180, status: 'In Stock' },
  { id: 2, product: 'Electric Kettle', sku: 'DST-EK-118', availableQty: 58, status: 'In Stock' },
  { id: 3, product: 'Microwave Oven', sku: 'DST-MW-402', availableQty: 24, status: 'Low Stock' },
  { id: 4, product: 'Air Fryer', sku: 'DST-AF-501', availableQty: 92, status: 'In Stock' },
  { id: 5, product: 'Induction Cooktop', sku: 'DST-IC-712', availableQty: 19, status: 'Low Stock' },
];

const initialOrders = [
  { id: 1, orderNo: 'ORD-4101', retailer: 'Prime Kitchen Store', product: 'Mixer Grinder', quantity: 12, destination: 'Mumbai', status: 'Pending Dispatch' },
  { id: 2, orderNo: 'ORD-4102', retailer: 'HomeEase Appliances', product: 'Electric Kettle', quantity: 18, destination: 'Delhi', status: 'Dispatched' },
  { id: 3, orderNo: 'ORD-4103', retailer: 'CityMart Retail', product: 'Air Fryer', quantity: 7, destination: 'Bangalore', status: 'Delivered' },
  { id: 4, orderNo: 'ORD-4104', retailer: 'Urban Kitchen Appliance', product: 'Microwave Oven', quantity: 5, destination: 'Pune', status: 'Pending Dispatch' },
];

const initialRestockRequests = [
  { id: 1, retailer: 'Prime Kitchen Store', product: 'Mixer Grinder', quantity: 20, location: 'Mumbai', requestedOn: '29 Mar 2026', status: 'Pending' },
  { id: 2, retailer: 'Smart Living Retail', product: 'Induction Cooktop', quantity: 14, location: 'Hyderabad', requestedOn: '30 Mar 2026', status: 'Pending' },
  { id: 3, retailer: 'Urban Kitchen Appliance', product: 'Air Fryer', quantity: 10, location: 'Pune', requestedOn: '31 Mar 2026', status: 'Accepted' },
  { id: 4, retailer: 'HomeEase Appliances', product: 'Microwave Oven', quantity: 8, location: 'Delhi', requestedOn: '01 Apr 2026', status: 'Rejected' },
];

const performanceData = [
  { name: 'Nov', handled: 82 },
  { name: 'Dec', handled: 95 },
  { name: 'Jan', handled: 104 },
  { name: 'Feb', handled: 98 },
  { name: 'Mar', handled: 118 },
  { name: 'Apr', handled: 124 },
];

const initialDistributorForm = { name: '', email: '', phone: '', location: '', status: 'Active' };
const initialStockForm = { availableQty: '', status: 'In Stock' };

const cardClass = 'rounded-xl border border-gray-200 bg-white p-5 shadow-sm';
const panelClass = 'overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm';
const inputClass = 'w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200';
const selectClass = 'w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200';
const tableHeadClass = 'px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500';
const tableCellClass = 'px-5 py-4 text-sm text-gray-600';
const primaryButtonClass = 'rounded-lg bg-black px-4 py-2 text-sm text-white transition hover:bg-gray-900';
const secondaryButtonClass = 'rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100';
const axisStyle = { fill: '#6b7280', fontSize: 12 };
const tooltipStyle = { backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '12px' };

const getStockStatus = (availableQty) => (availableQty <= 25 ? 'Low Stock' : 'In Stock');

const getBadgeClass = (status) => {
  if (['Active', 'Accepted', 'Approved', 'In Stock', 'Dispatched', 'Delivered'].includes(status)) {
    return 'inline-flex rounded-full bg-gray-900 px-3 py-1 text-xs font-medium text-white';
  }

  if (['Pending', 'Pending Dispatch', 'Processing'].includes(status)) {
    return 'inline-flex rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-700';
  }

  return 'inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600';
};

const getOrderActionLabel = (status) => {
  if (status === 'Pending Dispatch') {
    return 'Dispatch';
  }

  if (status === 'Dispatched') {
    return 'Mark Delivered';
  }

  return 'Completed';
};

const renderIcon = (name) => {
  switch (name) {
    case 'dashboard':
      return <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13h8V3H3v10Zm10 8h8V11h-8v10ZM3 21h8v-6H3v6Zm10-10h8V3h-8v8Z" /></svg>;
    case 'box':
      return <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m20 7-8 4-8-4m16 0-8-4-8 4m16 0v10l-8 4m-8-14v10l8 4m0-10v10" /></svg>;
    case 'cart':
      return <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5.4 5M7 13l-1.5 7M17 13l1.5 7M9 20a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" /></svg>;
    case 'refresh':
      return <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v6h6M20 20v-6h-6M20 9a8 8 0 0 0-13.66-3.66L4 7m16 10-2.34 2.34A8 8 0 0 1 4 15" /></svg>;
    case 'chart':
      return <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20V10m5 10V4m5 16v-7M4 20h16" /></svg>;
    case 'gear':
      return <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317a1 1 0 0 1 1.35-.936l.707.288a1 1 0 0 0 .894 0l.707-.288a1 1 0 0 1 1.35.936l.058.761a1 1 0 0 0 .59.84l.67.3a1 1 0 0 1 .524 1.296l-.275.712a1 1 0 0 0 .129 1.018l.462.607a1 1 0 0 1 0 1.214l-.462.607a1 1 0 0 0-.129 1.018l.275.712a1 1 0 0 1-.524 1.296l-.67.3a1 1 0 0 0-.59.84l-.058.761a1 1 0 0 1-1.35.936l-.707-.288a1 1 0 0 0-.894 0l-.707.288a1 1 0 0 1-1.35-.936l-.058-.761a1 1 0 0 0-.59-.84l-.67-.3a1 1 0 0 1-.524-1.296l.275-.712a1 1 0 0 0-.129-1.018l-.462-.607a1 1 0 0 1 0-1.214l.462-.607a1 1 0 0 0 .129-1.018l-.275-.712a1 1 0 0 1 .524-1.296l.67-.3a1 1 0 0 0 .59-.84l.058-.761Z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>;
    case 'store':
      return <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9.5 5 4h14l2 5.5M4 10h16v9a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-9Z" /></svg>;
    case 'logout':
      return <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 17l5-5m0 0-5-5m5 5H9m4 5v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1" /></svg>;
    default:
      return <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" strokeWidth={2} /></svg>;
  }
};

const Distributor = ({ embedded = false, initialSection = 'dashboard' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const routeSection = location.state?.section || initialSection;
  const [activeSection, setActiveSection] = useState(routeSection);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [distributors, setDistributors] = useState(initialDistributors);
  const [inventory, setInventory] = useState(initialInventory);
  const [orders, setOrders] = useState(initialOrders);
  const [restockRequests, setRestockRequests] = useState(initialRestockRequests);
  const [showDistributorModal, setShowDistributorModal] = useState(false);
  const [editingDistributorId, setEditingDistributorId] = useState(null);
  const [distributorForm, setDistributorForm] = useState(initialDistributorForm);
  const [showStockModal, setShowStockModal] = useState(false);
  const [editingInventoryItem, setEditingInventoryItem] = useState(null);
  const [stockForm, setStockForm] = useState(initialStockForm);

  useEffect(() => {
    setActiveSection(routeSection);
  }, [routeSection]);

  const userName = JSON.parse(localStorage.getItem('loginData') || '{}')?.userName || 'Distributor User';
  const query = searchQuery.trim().toLowerCase();
  const matchesSearch = (values) => !query || values.some((value) => String(value).toLowerCase().includes(query));

  const filteredDistributors = useMemo(() => distributors.filter((item) => matchesSearch([item.name, item.email, item.phone, item.location, item.status, item.totalOrders])), [distributors, query]);
  const filteredInventory = useMemo(() => inventory.filter((item) => matchesSearch([item.product, item.sku, item.availableQty, item.status])), [inventory, query]);
  const filteredOrders = useMemo(() => orders.filter((item) => matchesSearch([item.orderNo, item.retailer, item.product, item.quantity, item.destination, item.status])), [orders, query]);
  const filteredRequests = useMemo(() => restockRequests.filter((item) => matchesSearch([item.retailer, item.product, item.quantity, item.location, item.requestedOn, item.status])), [restockRequests, query]);

  const totalOrders = orders.length;
  const activeDistributors = distributors.filter((item) => item.status === 'Active').length;
  const pendingRequests = restockRequests.filter((item) => item.status === 'Pending').length;
  const deliveredOrders = orders.filter((item) => item.status === 'Delivered').length;
  const lowStockItems = inventory.filter((item) => item.status === 'Low Stock').length;
  const availableUnits = inventory.reduce((sum, item) => sum + item.availableQty, 0);
  const fulfillmentRate = totalOrders ? Math.round((deliveredOrders / totalOrders) * 100) : 0;

  const dashboardStats = [
    { title: 'Total Distributors', value: String(distributors.length), meta: 'Partner accounts onboarded' },
    { title: 'Active Distributors', value: String(activeDistributors), meta: 'Currently fulfilling requests' },
    { title: 'Pending Requests', value: String(pendingRequests), meta: 'Need stock allocation review' },
    { title: 'Total Orders', value: String(totalOrders), meta: 'Distributor orders in motion' },
  ];
  const inventoryStats = [
    { title: 'Products Tracked', value: String(inventory.length), meta: 'Across distributor inventory' },
    { title: 'Available Units', value: String(availableUnits), meta: 'Ready for fulfillment' },
    { title: 'Low Stock Items', value: String(lowStockItems), meta: 'Need replenishment planning' },
    { title: 'Stock Coverage', value: String(Math.max(1, Math.round(availableUnits / Math.max(inventory.length, 1)))), meta: 'Average units per SKU' },
  ];
  const orderStats = [
    { title: 'Incoming Orders', value: String(orders.filter((item) => item.status === 'Pending Dispatch').length), meta: 'Awaiting dispatch' },
    { title: 'Dispatched', value: String(orders.filter((item) => item.status === 'Dispatched').length), meta: 'On the way to retailers' },
    { title: 'Delivered', value: String(deliveredOrders), meta: 'Closed successfully' },
    { title: 'Fulfillment Rate', value: `${fulfillmentRate}%`, meta: 'Delivered against total orders' },
  ];
  const requestStats = [
    { title: 'Pending Requests', value: String(pendingRequests), meta: 'Waiting for review' },
    { title: 'Accepted', value: String(restockRequests.filter((item) => item.status === 'Accepted').length), meta: 'Approved for dispatch' },
    { title: 'Rejected', value: String(restockRequests.filter((item) => item.status === 'Rejected').length), meta: 'Closed requests' },
    { title: 'Requested Units', value: String(restockRequests.reduce((sum, item) => sum + item.quantity, 0)), meta: 'Combined request volume' },
  ];
  const performanceStats = [
    { title: 'Orders Handled', value: String(totalOrders), meta: 'Current distributor workload' },
    { title: 'Active Distributors', value: String(activeDistributors), meta: 'Healthy fulfillment network' },
    { title: 'Pending Requests', value: String(pendingRequests), meta: 'Requests still open' },
    { title: 'Delivery Completion', value: `${fulfillmentRate}%`, meta: 'Completed dispatch lifecycle' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('loginData');
    localStorage.removeItem('role');
    navigate('/distributor/login');
  };

  const openSection = (sectionId, path = '/distributor/dashboard') => {
    setActiveSection(sectionId);
    setSidebarOpen(false);
    setProfileDropdown(false);
    navigate(path, { state: { section: sectionId } });
  };

  const getTitle = () => sections.flatMap((section) => section.items).find((item) => item.id === activeSection)?.label || 'Dashboard';

  const openDistributorModal = (distributor = null) => {
    if (distributor) {
      setDistributorForm({ name: distributor.name, email: distributor.email, phone: distributor.phone, location: distributor.location, status: distributor.status });
      setEditingDistributorId(distributor.id);
    } else {
      setDistributorForm(initialDistributorForm);
      setEditingDistributorId(null);
    }
    setShowDistributorModal(true);
  };

  const closeDistributorModal = () => {
    setDistributorForm(initialDistributorForm);
    setEditingDistributorId(null);
    setShowDistributorModal(false);
  };

  const handleDistributorSubmit = (event) => {
    event.preventDefault();
    if (!distributorForm.name.trim() || !distributorForm.email.trim() || !distributorForm.phone.trim() || !distributorForm.location.trim()) {
      toast.error('Please complete all distributor details.');
      return;
    }

    if (editingDistributorId) {
      setDistributors((current) => current.map((item) => (item.id === editingDistributorId ? { ...item, ...distributorForm } : item)));
      toast.success('Distributor updated successfully.');
    } else {
      setDistributors((current) => [{ id: Math.max(...current.map((item) => item.id), 0) + 1, ...distributorForm, name: distributorForm.name.trim(), email: distributorForm.email.trim(), phone: distributorForm.phone.trim(), location: distributorForm.location.trim(), totalOrders: 0 }, ...current]);
      toast.success('Distributor added successfully.');
    }
    closeDistributorModal();
  };

  const handleDeleteDistributor = (id) => {
    const distributor = distributors.find((item) => item.id === id);
    setDistributors((current) => current.filter((item) => item.id !== id));
    toast.success(`${distributor?.name || 'Distributor'} removed.`);
  };

  const handleViewDistributor = (distributor) => {
    toast(`${distributor.name} | ${distributor.email} | ${distributor.phone} | ${distributor.location}`);
  };

  const openStockModal = (item) => {
    setEditingInventoryItem(item);
    setStockForm({ availableQty: String(item.availableQty), status: item.status });
    setShowStockModal(true);
  };

  const closeStockModal = () => {
    setEditingInventoryItem(null);
    setStockForm(initialStockForm);
    setShowStockModal(false);
  };

  const handleStockSubmit = (event) => {
    event.preventDefault();
    const nextQuantity = Number.parseInt(stockForm.availableQty, 10);
    if (Number.isNaN(nextQuantity) || nextQuantity < 0 || !editingInventoryItem) {
      toast.error('Enter a valid stock quantity.');
      return;
    }

    setInventory((current) => current.map((item) => (item.id === editingInventoryItem.id ? { ...item, availableQty: nextQuantity, status: stockForm.status || getStockStatus(nextQuantity) } : item)));
    toast.success('Inventory updated successfully.');
    closeStockModal();
  };

  const handleRestockDecision = (requestId, decision) => {
    const request = restockRequests.find((item) => item.id === requestId);
    if (!request || request.status !== 'Pending') {
      return;
    }

    if (decision === 'Accepted') {
      const inventoryItem = inventory.find((item) => item.product === request.product);
      if (!inventoryItem || inventoryItem.availableQty < request.quantity) {
        toast.error('Not enough stock available for this request.');
        return;
      }

      const nextQuantity = inventoryItem.availableQty - request.quantity;
      setInventory((current) => current.map((item) => (item.id === inventoryItem.id ? { ...item, availableQty: nextQuantity, status: getStockStatus(nextQuantity) } : item)));
      setOrders((current) => [{ id: Math.max(...current.map((item) => item.id), 0) + 1, orderNo: `ORD-${4100 + current.length + 1}`, retailer: request.retailer, product: request.product, quantity: request.quantity, destination: request.location, status: 'Pending Dispatch' }, ...current]);
    }

    setRestockRequests((current) => current.map((item) => (item.id === requestId ? { ...item, status: decision } : item)));
    toast.success(decision === 'Accepted' ? 'Restock request approved and added to dispatch queue.' : 'Restock request rejected.');
  };

  const handleOrderProgress = (orderId) => {
    const currentOrder = orders.find((item) => item.id === orderId);
    if (!currentOrder || currentOrder.status === 'Delivered') {
      return;
    }

    const nextStatus = currentOrder.status === 'Pending Dispatch' ? 'Dispatched' : 'Delivered';
    setOrders((current) => current.map((item) => (item.id === orderId ? { ...item, status: nextStatus } : item)));
    toast.success(nextStatus === 'Dispatched' ? `${currentOrder.orderNo} marked as dispatched.` : `${currentOrder.orderNo} marked as delivered.`);
  };

  const renderCards = (items) => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <div key={item.title} className={cardClass}>
          <p className="text-sm text-gray-500">{item.title}</p>
          <h2 className="mt-2 text-xl font-semibold text-gray-900">{item.value}</h2>
          <p className="mt-2 text-xs text-gray-400">{item.meta}</p>
        </div>
      ))}
    </div>
  );

  const renderPanelHeader = (title, description) => (
    <div className="border-b border-gray-200 px-5 py-4">
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      {description ? <p className="mt-1 text-xs text-gray-500">{description}</p> : null}
    </div>
  );

  const renderTable = (title, description, columns, rows, keyField) => (
    <div className={panelClass}>
      {renderPanelHeader(title, description)}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className={tableHeadClass}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <tr key={row[keyField]} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
                  {columns.map((column) => (
                    <td key={column.key} className={`${tableCellClass} ${column.bold ? 'font-medium text-gray-900' : ''}`}>
                      {column.render ? column.render(row) : column.badge ? <span className={getBadgeClass(row[column.key])}>{row[column.key]}</span> : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-5 py-12 text-center text-sm text-gray-400">
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderChart = (title, description) => (
    <div className={panelClass}>
      {renderPanelHeader(title, description)}
      <div className="p-4">
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData} barCategoryGap="16%" barGap={2} margin={{ top: 10, right: 10, left: 24, bottom: 10 }}>
              <CartesianGrid stroke="#f1f5f9" strokeDasharray="2 2" strokeWidth={0.5} vertical={false} />
              <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} width={40} />
              <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${value} orders`, 'Handled']} />
              <Bar dataKey="handled" fill="#6b7280" radius={[6, 6, 0, 0]} barSize={28} activeBar={{ fill: '#4b5563' }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const dashboardView = (
    <div className="space-y-6">
      <div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Distributor Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Manage distributor operations, stock allocation, and retailer fulfillment from one place.</p>
        </div>
      </div>

      {renderCards(dashboardStats)}

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        {renderChart('Orders Handled', 'Monthly order movement across the distributor network')}
        <div className={panelClass}>
          {renderPanelHeader('Operations Snapshot', 'Live distributor health and service indicators')}
          <div className="space-y-4 p-5">
            <div className="rounded-xl border border-gray-200 px-4 py-3">
              <p className="text-sm text-gray-500">Fulfillment Rate</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">{fulfillmentRate}%</p>
            </div>
            <div className="rounded-xl border border-gray-200 px-4 py-3">
              <p className="text-sm text-gray-500">Low Stock Items</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">{lowStockItems}</p>
            </div>
            <div className="rounded-xl border border-gray-200 px-4 py-3">
              <p className="text-sm text-gray-500">Pending Dispatch</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">{orders.filter((item) => item.status === 'Pending Dispatch').length}</p>
            </div>
            <div className="rounded-xl border border-gray-200 px-4 py-3">
              <p className="text-sm text-gray-500">Open Restock Requests</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">{pendingRequests}</p>
            </div>
          </div>
        </div>
      </div>

      {renderTable(
        'Distributor Directory',
        'Search, add, and manage distributor contacts and account status.',
        [
          { key: 'name', label: 'Name', bold: true },
          { key: 'email', label: 'Email' },
          { key: 'phone', label: 'Phone' },
          { key: 'location', label: 'Location' },
          { key: 'status', label: 'Status', badge: true },
          { key: 'totalOrders', label: 'Orders Count' },
          { key: 'actions', label: 'Actions', render: (row) => <div className="flex items-center gap-3"><button type="button" onClick={() => handleViewDistributor(row)} className="text-sm text-gray-700 transition hover:underline">View</button><button type="button" onClick={() => openDistributorModal(row)} className="text-sm text-gray-700 transition hover:underline">Edit</button><button type="button" onClick={() => handleDeleteDistributor(row.id)} className="text-sm text-gray-700 transition hover:underline">Delete</button></div> },
        ],
        filteredDistributors,
        'id'
      )}
    </div>
  );

  const inventoryView = (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Inventory</h1>
        <p className="mt-1 text-sm text-gray-500">Track available quantity, spot low-stock items, and adjust stock levels as needed.</p>
      </div>
      {renderCards(inventoryStats)}
      {renderTable(
        'Stock Overview',
        'Keep inventory aligned with retailer demand and distribution commitments.',
        [
          { key: 'product', label: 'Product', bold: true },
          { key: 'sku', label: 'SKU' },
          { key: 'availableQty', label: 'Available Quantity', render: (row) => `${row.availableQty} Units` },
          { key: 'status', label: 'Status', badge: true },
          { key: 'actions', label: 'Actions', render: (row) => <button type="button" onClick={() => openStockModal(row)} className={secondaryButtonClass}>Update Stock</button> },
        ],
        filteredInventory,
        'id'
      )}
    </div>
  );

  const ordersView = (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
        <p className="mt-1 text-sm text-gray-500">Review incoming retailer orders, dispatch them, and track delivery progress.</p>
      </div>
      {renderCards(orderStats)}
      {renderTable(
        'Dispatch Queue',
        'Move each order from pending dispatch through delivery completion.',
        [
          { key: 'orderNo', label: 'Order', bold: true },
          { key: 'retailer', label: 'Retailer' },
          { key: 'product', label: 'Product' },
          { key: 'quantity', label: 'Quantity' },
          { key: 'destination', label: 'Destination' },
          { key: 'status', label: 'Status', badge: true },
          { key: 'actions', label: 'Actions', render: (row) => <button type="button" onClick={() => handleOrderProgress(row.id)} disabled={row.status === 'Delivered'} className={`${secondaryButtonClass} ${row.status === 'Delivered' ? 'cursor-not-allowed opacity-50' : ''}`}>{getOrderActionLabel(row.status)}</button> },
        ],
        filteredOrders,
        'id'
      )}
    </div>
  );

  const restockView = (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Restock Requests</h1>
        <p className="mt-1 text-sm text-gray-500">Accept or reject retailer restock requests and convert approved requests into dispatch orders.</p>
      </div>
      {renderCards(requestStats)}
      {renderTable(
        'Retailer Requests',
        'Pending requests can be approved when stock is available.',
        [
          { key: 'retailer', label: 'Retailer', bold: true },
          { key: 'product', label: 'Product' },
          { key: 'quantity', label: 'Quantity' },
          { key: 'location', label: 'Location' },
          { key: 'requestedOn', label: 'Requested On' },
          { key: 'status', label: 'Status', badge: true },
          { key: 'actions', label: 'Actions', render: (row) => row.status === 'Pending' ? <div className="flex items-center gap-2"><button type="button" onClick={() => handleRestockDecision(row.id, 'Accepted')} className={secondaryButtonClass}>Accept</button><button type="button" onClick={() => handleRestockDecision(row.id, 'Rejected')} className={secondaryButtonClass}>Reject</button></div> : <span className="text-sm text-gray-500">Processed</span> },
        ],
        filteredRequests,
        'id'
      )}
    </div>
  );

  const performanceView = (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Performance</h1>
        <p className="mt-1 text-sm text-gray-500">Monitor distributor efficiency, order completion, and stock responsiveness.</p>
      </div>
      {renderCards(performanceStats)}
      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        {renderChart('Fulfillment Analytics', 'Six-month order handling trend')}
        <div className={panelClass}>
          {renderPanelHeader('Operational Metrics', 'Focused KPIs for CRM and supply planning')}
          <div className="space-y-4 p-5">
            <div className="rounded-xl border border-gray-200 px-4 py-3">
              <p className="text-sm text-gray-500">Available Units</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">{availableUnits}</p>
            </div>
            <div className="rounded-xl border border-gray-200 px-4 py-3">
              <p className="text-sm text-gray-500">Delivered Orders</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">{deliveredOrders}</p>
            </div>
            <div className="rounded-xl border border-gray-200 px-4 py-3">
              <p className="text-sm text-gray-500">Pending Requests</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">{pendingRequests}</p>
            </div>
            <div className="rounded-xl border border-gray-200 px-4 py-3">
              <p className="text-sm text-gray-500">Active Network</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">{activeDistributors}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const retailersView = <Retailers searchQuery={searchQuery} />;

  const settingsView = (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">Manage panel preferences and keep distributor operations aligned with CRM workflows.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className={panelClass}>
          {renderPanelHeader('Account Preferences', 'Distributor profile and service coverage')}
          <div className="space-y-4 p-5">
            <div className="rounded-xl border border-gray-200 px-4 py-3">
              <p className="text-sm text-gray-500">Distributor Name</p>
              <p className="mt-1 text-sm font-semibold text-gray-900">{`${APP_NAME} Distribution North`}</p>
            </div>
            <div className="rounded-xl border border-gray-200 px-4 py-3">
              <p className="text-sm text-gray-500">Primary Region</p>
              <p className="mt-1 text-sm font-semibold text-gray-900">West and North India</p>
            </div>
            <div className="rounded-xl border border-gray-200 px-4 py-3">
              <p className="text-sm text-gray-500">Support Contact</p>
              <p className="mt-1 text-sm font-semibold text-gray-900">{`ops@${APP_DOMAIN}`}</p>
            </div>
          </div>
        </div>

        <div className={panelClass}>
          {renderPanelHeader('Operational Preferences', 'Default alerts and workflow reminders')}
          <div className="space-y-4 p-5">
            <div className="rounded-xl border border-gray-200 px-4 py-3">
              <p className="text-sm font-medium text-gray-800">Dispatch Alerts</p>
              <p className="mt-1 text-xs text-gray-500">Receive updates for newly approved orders that need dispatch.</p>
            </div>
            <div className="rounded-xl border border-gray-200 px-4 py-3">
              <p className="text-sm font-medium text-gray-800">Low Stock Notifications</p>
              <p className="mt-1 text-xs text-gray-500">Highlight items that move below the safe distributor threshold.</p>
            </div>
            <div className="rounded-xl border border-gray-200 px-4 py-3">
              <p className="text-sm font-medium text-gray-800">Retailer Request Summary</p>
              <p className="mt-1 text-xs text-gray-500">Keep a daily digest of accepted, pending, and rejected requests.</p>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" className={secondaryButtonClass}>Cancel</button>
              <button type="button" onClick={() => toast.success('Distributor settings saved.')} className={primaryButtonClass}>Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const sectionView = activeSection === 'dashboard'
    ? dashboardView
    : {
      inventory: inventoryView,
      orders: ordersView,
      restock: restockView,
      retailers: retailersView,
      performance: performanceView,
      settings: settingsView,
    }[activeSection] || dashboardView;

  const distributorModal = showDistributorModal ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            {editingDistributorId ? 'Edit Distributor' : 'Add Distributor'}
          </h2>
        </div>

        <form onSubmit={handleDistributorSubmit} className="space-y-4 p-6">
          <input type="text" placeholder="Name" value={distributorForm.name} onChange={(event) => setDistributorForm((current) => ({ ...current, name: event.target.value }))} className={inputClass} required />
          <input type="email" placeholder="Email" value={distributorForm.email} onChange={(event) => setDistributorForm((current) => ({ ...current, email: event.target.value }))} className={inputClass} required />
          <input type="text" placeholder="Phone" value={distributorForm.phone} onChange={(event) => setDistributorForm((current) => ({ ...current, phone: event.target.value }))} className={inputClass} required />
          <input type="text" placeholder="Location" value={distributorForm.location} onChange={(event) => setDistributorForm((current) => ({ ...current, location: event.target.value }))} className={inputClass} required />
          <select value={distributorForm.status} onChange={(event) => setDistributorForm((current) => ({ ...current, status: event.target.value }))} className={selectClass}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={closeDistributorModal} className={secondaryButtonClass}>
              Cancel
            </button>
            <button type="submit" className={primaryButtonClass}>
              {editingDistributorId ? 'Save' : 'Add Distributor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;

  const stockModal = showStockModal && editingInventoryItem ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900">Update Stock</h2>
          <p className="mt-1 text-sm text-gray-500">{editingInventoryItem.product}</p>
        </div>

        <form onSubmit={handleStockSubmit} className="space-y-4 p-6">
          <input type="number" min="0" placeholder="Available Quantity" value={stockForm.availableQty} onChange={(event) => setStockForm((current) => ({ ...current, availableQty: event.target.value }))} className={inputClass} required />
          <select value={stockForm.status} onChange={(event) => setStockForm((current) => ({ ...current, status: event.target.value }))} className={selectClass}>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
          </select>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={closeStockModal} className={secondaryButtonClass}>
              Cancel
            </button>
            <button type="submit" className={primaryButtonClass}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;

  if (embedded) {
    return (
      <>
        <div className="space-y-6">{sectionView}</div>
        {distributorModal}
        {stockModal}
      </>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside className={`fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="relative flex items-center gap-3 border-b border-gray-200 p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-black text-sm font-semibold text-white">
            KH
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">{APP_NAME}</p>
            <p className="text-xs text-gray-400">Distributor Panel</p>
          </div>
          <button type="button" onClick={() => setSidebarOpen(false)} className="absolute right-4 rounded-md p-1 text-gray-500 transition hover:bg-gray-100 md:hidden">
            x
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          {sections.map((section) => (
            <div key={section.heading}>
              <p className="mb-2 mt-4 px-1 text-xs uppercase tracking-wide text-gray-400">
                {section.heading}
              </p>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = activeSection === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        if (item.action === 'logout') {
                          handleLogout();
                          return;
                        }

                        openSection(item.id, item.path);
                      }}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      <span className={`flex h-6 w-6 items-center justify-center rounded-md text-xs ${isActive ? 'bg-white text-black' : 'bg-gray-100 text-gray-500'}`}>
                        {renderIcon(item.icon)}
                      </span>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto bg-gray-100 md:ml-64">
        <header className="sticky top-0 z-20 h-16 border-b border-gray-200 bg-white">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-6">
              <button type="button" onClick={() => setSidebarOpen((current) => !current)} className="rounded-md p-2 text-gray-600 transition hover:bg-gray-100 md:hidden">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div className="hidden items-center gap-2 text-xs text-gray-400 sm:flex">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10.25 12 3l9 7.25V20a1 1 0 0 1-1 1h-5.5v-6h-5v6H4a1 1 0 0 1-1-1v-9.75Z" />
                </svg>
                <span>Distributor</span>
                <span>/</span>
                <span className="font-medium text-gray-700">{getTitle()}</span>
              </div>

              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">
                {getTitle()}
              </h2>
            </div>

            <div className="flex items-center gap-3 md:gap-4">
              <div className="hidden w-64 items-center rounded-md bg-gray-100 px-3 py-2 md:flex">
                <svg className="mr-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search"
                  className="w-full bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
                />
              </div>

              <div className="relative">
                <button type="button" onClick={() => setProfileDropdown((current) => !current)} className="flex items-center gap-3 rounded-md px-1 py-1 transition hover:bg-gray-100">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                    D
                  </div>
                </button>

                {profileDropdown && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-200 p-4">
                      <p className="text-sm font-semibold text-gray-900">{userName}</p>
                      <p className="text-xs text-gray-500">{`distributor@${APP_DOMAIN}`}</p>
                    </div>
                    <div className="space-y-1 p-2">
                      <button type="button" className="w-full rounded-lg px-3 py-2 text-left text-sm text-gray-700 transition hover:bg-gray-100">
                        Distributor Profile
                      </button>
                      <button type="button" onClick={() => openSection('settings', '/distributor/dashboard')} className="w-full rounded-lg px-3 py-2 text-left text-sm text-gray-700 transition hover:bg-gray-100">
                        Preferences
                      </button>
                    </div>
                    <div className="border-t border-gray-200 p-2">
                      <button type="button" onClick={handleLogout} className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 transition hover:bg-gray-100">
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">
          <div className="min-h-full">{sectionView}</div>
        </div>
      </main>

      {distributorModal}
      {stockModal}
    </div>
  );
};

export default Distributor;
