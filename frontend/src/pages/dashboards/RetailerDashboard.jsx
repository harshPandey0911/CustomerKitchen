import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { APP_DOMAIN, APP_NAME } from '../../constants/branding';

const sections = [
  {
    heading: 'Overview',
    items: [{ id: 'dashboard', label: 'Dashboard', icon: 'dashboard' }],
  },
  {
    heading: 'Management',
    items: [
      { id: 'inventory', label: 'Inventory', icon: 'box' },
      { id: 'orders', label: 'Orders', icon: 'cart' },
      { id: 'customers', label: 'Customers', icon: 'users' },
    ],
  },
  {
    heading: 'Insights',
    items: [{ id: 'sales', label: 'Sales', icon: 'chart' }],
  },
  {
    heading: 'Support',
    items: [{ id: 'settings', label: 'Settings', icon: 'gear' }],
  },
  {
    heading: 'System',
    items: [{ id: 'logout', label: 'Logout', icon: 'logout', action: 'logout' }],
  },
];

const dashboardStats = [
  { title: 'Total Sales', value: 'Rs 2.3L', meta: '+12.4% vs last month' },
  { title: 'Orders', value: '456', meta: '38 active today' },
  { title: 'Customers', value: '487', meta: '64 repeat buyers' },
  { title: 'Avg Order Value', value: 'Rs 870', meta: 'Steady this week' },
];

const salesData = [
  { name: 'Jan', sales: 1800 },
  { name: 'Feb', sales: 2400 },
  { name: 'Mar', sales: 2200 },
  { name: 'Apr', sales: 2900 },
  { name: 'May', sales: 3400 },
  { name: 'Jun', sales: 3200 },
];

const orderData = [
  { id: 'ORD-2101', product: 'Mixer Grinder', customer: 'Rajesh Kumar', price: 'Rs 2,499', status: 'Delivered' },
  { id: 'ORD-2102', product: 'Electric Kettle', customer: 'Priya Singh', price: 'Rs 1,299', status: 'Pending' },
  { id: 'ORD-2103', product: 'Microwave Oven', customer: 'Amit Patel', price: 'Rs 8,999', status: 'Processing' },
  { id: 'ORD-2104', product: 'Air Fryer', customer: 'Anjali Desai', price: 'Rs 5,499', status: 'Delivered' },
];

const initialInventory = [
  { product: 'Mixer Grinder', sku: 'KH-MX-102', stock: 42, status: 'In Stock' },
  { product: 'Electric Kettle', sku: 'KH-EK-210', stock: 18, status: 'Low Stock' },
  { product: 'Air Fryer', sku: 'KH-AF-311', stock: 26, status: 'In Stock' },
  { product: 'Induction Cooktop', sku: 'KH-IN-124', stock: 11, status: 'Low Stock' },
];

const customerData = [
  { name: 'Rajesh Kumar', email: `rajesh@${APP_DOMAIN}`, orders: '12', tier: 'Premium' },
  { name: 'Priya Singh', email: `priya@${APP_DOMAIN}`, orders: '8', tier: 'Standard' },
  { name: 'Amit Patel', email: `amit@${APP_DOMAIN}`, orders: '15', tier: 'Premium' },
  { name: 'Anjali Desai', email: `anjali@${APP_DOMAIN}`, orders: '6', tier: 'New' },
];

const storeInfo = [
  { label: 'Store Name', value: 'Premium Kitchen Store' },
  { label: 'Location', value: 'Sector 7, Mumbai' },
  { label: 'Contact', value: '+91 98765 43210' },
  { label: 'Join Date', value: '15 Jan 2024' },
];

const initialProductForm = {
  product: '',
  sku: '',
  stock: '',
  status: 'In Stock',
};

const chartAxis = { fill: '#6b7280', fontSize: 12 };
const chartTooltip = {
  backgroundColor: '#fff',
  border: '1px solid #e5e7eb',
  borderRadius: '12px',
  fontSize: '12px',
};

const cardClass = 'rounded-xl border border-gray-200 bg-white p-5 shadow-sm';
const panelClass = 'overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm';
const inputClass = 'w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200';
const headClass = 'px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500';
const cellClass = 'px-5 py-4 text-sm text-gray-600';

const RetailerDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState(initialInventory);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState(initialProductForm);

  const userName =
    JSON.parse(localStorage.getItem('loginData') || '{}')?.userName ||
    'Retailer User';

  const query = searchQuery.trim().toLowerCase();

  const matchesSearch = (values) =>
    !query || values.some((value) => String(value).toLowerCase().includes(query));

  const filteredOrders = useMemo(
    () =>
      orderData.filter((item) =>
        matchesSearch([item.product, item.customer, item.price, item.status])
      ),
    [query]
  );

  const filteredInventory = useMemo(
    () =>
      products.filter((item) =>
        matchesSearch([item.product, item.sku, item.stock, item.status])
      ),
    [products, query]
  );

  const filteredCustomers = useMemo(
    () =>
      customerData.filter((item) =>
        matchesSearch([item.name, item.email, item.tier])
      ),
    [query]
  );

  const inventoryStats = useMemo(() => {
    const lowStockCount = products.filter((item) => item.status === 'Low Stock').length;
    const inStockCount = products.filter((item) => item.status === 'In Stock').length;
    const totalUnits = products.reduce((sum, item) => sum + item.stock, 0);

    return [
      { title: 'Items Tracked', value: String(products.length), meta: 'Across all categories' },
      { title: 'Low Stock Alerts', value: String(lowStockCount), meta: 'Need review soon' },
      { title: 'In Stock', value: String(inStockCount), meta: 'Ready for sale' },
      { title: 'Total Units', value: String(totalUnits), meta: 'Current inventory count' },
    ];
  }, [products]);

  const handleLogout = () => {
    localStorage.removeItem('loginData');
    localStorage.removeItem('role');
    navigate('/retailer/login');
  };

  const handleOpenModal = () => {
    setNewProduct(initialProductForm);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewProduct(initialProductForm);
  };

  const handleAddProduct = (event) => {
    event.preventDefault();

    const productName = newProduct.product.trim();
    const sku = newProduct.sku.trim();
    const stockValue = Number.parseInt(newProduct.stock, 10);

    if (!productName || !sku || Number.isNaN(stockValue) || stockValue < 0) {
      return;
    }

    setProducts((current) => [
      ...current,
      {
        product: productName,
        sku,
        stock: stockValue,
        status: newProduct.status,
      },
    ]);

    handleCloseModal();
  };

  const getTitle = () =>
    sections
      .flatMap((section) => section.items)
      .find((item) => item.id === activeSection)?.label || 'Dashboard';

  const badgeClass = (status) => {
    if (['Delivered', 'In Stock', 'Premium'].includes(status)) {
      return 'inline-flex rounded-full bg-gray-900 px-3 py-1 text-xs font-medium text-white';
    }

    if (['Pending', 'Processing', 'Standard'].includes(status)) {
      return 'inline-flex rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-700';
    }

    return 'inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600';
  };

  const renderIcon = (name) => {
    switch (name) {
      case 'dashboard':
        return (
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13h8V3H3v10Zm10 8h8V11h-8v10ZM3 21h8v-6H3v6Zm10-10h8V3h-8v8Z" />
          </svg>
        );
      case 'box':
        return (
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m20 7-8 4-8-4m16 0-8-4-8 4m16 0v10l-8 4m-8-14v10l8 4m0-10v10" />
          </svg>
        );
      case 'cart':
        return (
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5.4 5M7 13l-1.5 7M17 13l1.5 7M9 20a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
          </svg>
        );
      case 'users':
        return (
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2m18 0v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
          </svg>
        );
      case 'chart':
        return (
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20V10m5 10V4m5 16v-7M4 20h16" />
          </svg>
        );
      case 'gear':
        return (
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317a1 1 0 0 1 1.35-.936l.707.288a1 1 0 0 0 .894 0l.707-.288a1 1 0 0 1 1.35.936l.058.761a1 1 0 0 0 .59.84l.67.3a1 1 0 0 1 .524 1.296l-.275.712a1 1 0 0 0 .129 1.018l.462.607a1 1 0 0 1 0 1.214l-.462.607a1 1 0 0 0-.129 1.018l.275.712a1 1 0 0 1-.524 1.296l-.67.3a1 1 0 0 0-.59.84l-.058.761a1 1 0 0 1-1.35.936l-.707-.288a1 1 0 0 0-.894 0l-.707.288a1 1 0 0 1-1.35-.936l-.058-.761a1 1 0 0 0-.59-.84l-.67-.3a1 1 0 0 1-.524-1.296l.275-.712a1 1 0 0 0-.129-1.018l-.462-.607a1 1 0 0 1 0-1.214l.462-.607a1 1 0 0 0 .129-1.018l-.275-.712a1 1 0 0 1 .524-1.296l.67-.3a1 1 0 0 0 .59-.84l.058-.761Z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        );
      case 'logout':
        return (
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 17l5-5m0 0-5-5m5 5H9m4 5v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1" />
          </svg>
        );
      default:
        return (
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="4" strokeWidth={2} />
          </svg>
        );
    }
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

  const renderTable = (title, columns, rows, keyField) => (
    <div className={panelClass}>
      <div className="border-b border-gray-200 px-5 py-4">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className={headClass}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[keyField]} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column.key} className={`${cellClass} ${column.bold ? 'font-medium text-gray-900' : ''}`}>
                    {column.badge ? (
                      <span className={badgeClass(row[column.key])}>{row[column.key]}</span>
                    ) : column.render ? (
                      column.render(row)
                    ) : (
                      row[column.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderChart = (title) => (
    <div className={panelClass}>
      <div className="border-b border-gray-200 px-5 py-4">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="p-4">
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData} barCategoryGap="28%" margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid stroke="#f1f5f9" strokeDasharray="2 2" strokeWidth={0.5} vertical={false} />
              <XAxis dataKey="name" tick={chartAxis} axisLine={false} tickLine={false} />
              <YAxis tick={chartAxis} axisLine={false} tickLine={false} width={42} />
              <Tooltip contentStyle={chartTooltip} formatter={(value) => value.toLocaleString()} />
              <Bar dataKey="sales" fill="#6B7280" barSize={18} radius={[6, 6, 0, 0]} activeBar={{ fill: '#4B5563' }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const dashboardView = (
    <div className="space-y-6">
      {renderCards(dashboardStats)}
      <div className="grid gap-6 xl:grid-cols-[1.65fr_1fr]">
        {renderChart('Sales Trend')}
        <div className={panelClass}>
          <div className="border-b border-gray-200 px-5 py-4">
            <h3 className="text-sm font-semibold text-gray-900">Store Info</h3>
          </div>
          <div className="grid gap-4 p-5 sm:grid-cols-2 xl:grid-cols-1">
            {storeInfo.map((item) => (
              <div key={item.label} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                <p className="text-sm text-gray-500">{item.label}</p>
                <p className="mt-1 text-sm font-semibold text-gray-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {renderTable(
        'Recent Orders',
        [
          { key: 'product', label: 'Product', bold: true },
          { key: 'customer', label: 'Customer' },
          { key: 'price', label: 'Price' },
          { key: 'status', label: 'Status', badge: true },
        ],
        filteredOrders,
        'id'
      )}
    </div>
  );

  const sectionView = {
    inventory: (
      <div className="space-y-6">
        {renderCards(inventoryStats)}
        {renderTable(
          'Inventory Overview',
          [
            { key: 'product', label: 'Product', bold: true },
            { key: 'sku', label: 'SKU' },
            { key: 'stock', label: 'Stock', render: (row) => `${row.stock} Units` },
            { key: 'status', label: 'Status', badge: true },
          ],
          filteredInventory,
          'sku'
        )}
      </div>
    ),
    orders: (
      <div className="space-y-6">
        {renderCards([
          { title: 'Open Orders', value: '38', meta: 'Need fulfillment' },
          { title: 'Delivered', value: '312', meta: 'Completed this quarter' },
          { title: 'Returns', value: '06', meta: 'Within SLA' },
          { title: 'Pending Payments', value: '09', meta: 'Awaiting confirmation' },
        ])}
        {renderTable(
          'Order Activity',
          [
            { key: 'product', label: 'Product', bold: true },
            { key: 'customer', label: 'Customer' },
            { key: 'price', label: 'Price' },
            { key: 'status', label: 'Status', badge: true },
          ],
          filteredOrders,
          'id'
        )}
      </div>
    ),
    customers: (
      <div className="space-y-6">
        {renderCards([
          { title: 'Active Customers', value: '487', meta: 'Engaged in last 30 days' },
          { title: 'Premium Members', value: '148', meta: 'High-value shoppers' },
          { title: 'New This Month', value: '29', meta: 'Fresh signups' },
          { title: 'Repeat Rate', value: '64%', meta: 'Strong retention' },
        ])}
        {renderTable(
          'Customer Directory',
          [
            { key: 'name', label: 'Customer', bold: true },
            { key: 'email', label: 'Email' },
            { key: 'orders', label: 'Orders' },
            { key: 'tier', label: 'Tier', badge: true },
          ],
          filteredCustomers,
          'email'
        )}
      </div>
    ),
    sales: (
      <div className="space-y-6">
        {renderCards([
          { title: 'Monthly Sales', value: 'Rs 34,000', meta: 'Current cycle' },
          { title: 'Top Product', value: 'Microwave', meta: 'Highest revenue item' },
          { title: 'Conversion', value: '18.2%', meta: 'Store walk-ins to orders' },
          { title: 'Returns Rate', value: '1.3%', meta: 'Healthy trend' },
        ])}
        {renderChart('Sales Performance')}
      </div>
    ),
    settings: (
      <div className="grid gap-6 lg:grid-cols-2">
        <div className={panelClass}>
          <div className="border-b border-gray-200 px-5 py-4">
            <h3 className="text-sm font-semibold text-gray-900">Store Profile</h3>
          </div>
          <div className="space-y-4 p-5">
            {storeInfo.slice(0, 3).map((item) => (
              <div key={item.label}>
                <p className="text-sm text-gray-500">{item.label}</p>
                <p className="mt-1 text-sm font-semibold text-gray-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={panelClass}>
          <div className="border-b border-gray-200 px-5 py-4">
            <h3 className="text-sm font-semibold text-gray-900">Preferences</h3>
          </div>
          <div className="space-y-4 p-5">
            <div className="rounded-xl border border-gray-200 px-4 py-3">
              <p className="text-sm font-medium text-gray-800">Order Notifications</p>
              <p className="mt-1 text-xs text-gray-500">Receive updates for new orders and changes.</p>
            </div>
            <div className="rounded-xl border border-gray-200 px-4 py-3">
              <p className="text-sm font-medium text-gray-800">Inventory Alerts</p>
              <p className="mt-1 text-xs text-gray-500">Monitor low stock and restock reminders.</p>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100">
                Cancel
              </button>
              <button type="button" className="rounded-lg bg-black px-4 py-2 text-sm text-white transition hover:bg-gray-900">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="relative flex items-center gap-3 border-b border-gray-200 p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-black text-sm font-semibold text-white">
            KH
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">{APP_NAME}</p>
            <p className="text-xs text-gray-400">Retailer Panel</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute right-4 rounded-md p-1 text-gray-500 transition hover:bg-gray-100 md:hidden"
          >
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
                  const active = activeSection === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (item.action === 'logout') {
                          handleLogout();
                          return;
                        }

                        setActiveSection(item.id);
                        setSidebarOpen(false);
                        setProfileDropdown(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${active ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      <span className={`flex h-6 w-6 items-center justify-center rounded-md text-xs ${active ? 'bg-white text-black' : 'bg-gray-100 text-gray-500'}`}>
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
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="rounded-md p-2 text-gray-600 transition hover:bg-gray-100 md:hidden"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div className="hidden items-center gap-2 text-xs text-gray-400 sm:flex">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10.25 12 3l9 7.25V20a1 1 0 0 1-1 1h-5.5v-6h-5v6H4a1 1 0 0 1-1-1v-9.75Z" />
                </svg>
                <span>Retailer</span>
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

              {activeSection === 'inventory' && (
                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="rounded-lg bg-black px-4 py-2 text-sm text-white transition hover:bg-gray-900"
                >
                  + Add Product
                </button>
              )}

              <div className="relative">
                <button
                  onClick={() => setProfileDropdown((current) => !current)}
                  className="flex items-center gap-3 rounded-md px-1 py-1 transition hover:bg-gray-100"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                    R
                  </div>
                </button>

                {profileDropdown && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-200 p-4">
                      <p className="text-sm font-semibold text-gray-900">{userName}</p>
                      <p className="text-xs text-gray-500">{`retailer@${APP_DOMAIN}`}</p>
                    </div>
                    <div className="space-y-1 p-2">
                      <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-gray-700 transition hover:bg-gray-100">
                        Store Profile
                      </button>
                      <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-gray-700 transition hover:bg-gray-100">
                        Notifications
                      </button>
                    </div>
                    <div className="border-t border-gray-200 p-2">
                      <button
                        onClick={handleLogout}
                        className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                      >
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
          <div className="min-h-full">
            {activeSection === 'dashboard' ? dashboardView : sectionView[activeSection] || dashboardView}
          </div>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Add Product</h2>

            <form className="space-y-4" onSubmit={handleAddProduct}>
              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.product}
                onChange={(event) =>
                  setNewProduct((current) => ({ ...current, product: event.target.value }))
                }
                className={inputClass}
                required
              />

              <input
                type="text"
                placeholder="SKU"
                value={newProduct.sku}
                onChange={(event) =>
                  setNewProduct((current) => ({ ...current, sku: event.target.value }))
                }
                className={inputClass}
                required
              />

              <input
                type="number"
                min="0"
                placeholder="Stock"
                value={newProduct.stock}
                onChange={(event) =>
                  setNewProduct((current) => ({ ...current, stock: event.target.value }))
                }
                className={inputClass}
                required
              />

              <select
                value={newProduct.status}
                onChange={(event) =>
                  setNewProduct((current) => ({ ...current, status: event.target.value }))
                }
                className={inputClass}
              >
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
              </select>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-black px-4 py-2 text-sm text-white transition hover:bg-gray-900"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RetailerDashboard;
