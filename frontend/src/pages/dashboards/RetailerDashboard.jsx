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
import PanelLayout from '../../components/layouts/PanelLayout';
import { APP_DOMAIN } from '../../constants/branding';

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

  const handleMenuSelect = (item) => {
    if (item.action === 'logout') {
      handleLogout();
      return;
    }

    setActiveSection(item.id);
  };

  return (
    <>
      <PanelLayout
        panelLabel="Retailer Panel"
        title={getTitle()}
        subtitle="Compact commerce workspace with a sticky top bar and collapsible navigation."
        menuSections={sections}
        activeItem={activeSection}
        onSelectItem={handleMenuSelect}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        userName={userName}
        userEmail={`retailer@${APP_DOMAIN}`}
        userInitial="R"
        profileActions={[
          { label: 'Store Profile', onClick: () => {} },
          { label: 'Notifications', onClick: () => {} },
        ]}
        headerActions={
          activeSection === 'inventory' ? (
            <button
              type="button"
              onClick={handleOpenModal}
              className="rounded-lg bg-black px-4 py-2 text-sm text-white transition hover:bg-gray-900"
            >
              + Add Product
            </button>
          ) : null
        }
        onLogout={handleLogout}
      >
        <div className="min-h-full">
          {activeSection === 'dashboard' ? dashboardView : sectionView[activeSection] || dashboardView}
        </div>
      </PanelLayout>

      {showModal ? (
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
      ) : null}
    </>
  );
};

export default RetailerDashboard;
