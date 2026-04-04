import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { adminUi, statusBadge } from './adminStyles';
import { inventoryProductsApi } from '../../services/inventoryProductsApi';

const baseCategories = ['All', 'Cooking', 'Laundry', 'Cooling', 'Kitchen', 'Water'];
const initialFormData = {
  name: '',
  category: 'Cooking',
  price: '',
  quantity: '',
};

const formatCurrency = (value) => `Rs ${Number(value || 0).toLocaleString('en-IN')}`;

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [editingProductId, setEditingProductId] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let isCancelled = false;

    const loadProducts = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await inventoryProductsApi.list();

        if (isCancelled) {
          return;
        }

        setProducts(response.inventoryProducts || []);
      } catch (loadError) {
        if (isCancelled) {
          return;
        }

        setProducts([]);
        setError(loadError.message || 'Unable to load inventory products.');
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isCancelled = true;
    };
  }, []);

  const categories = useMemo(
    () => [
      ...new Set([
        ...baseCategories,
        ...products.map((product) => product.category).filter(Boolean),
      ]),
    ],
    [products],
  );

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchTerm.trim().toLowerCase());
        const matchesCategory =
          selectedCategory === 'All' || product.category === selectedCategory;

        return matchesSearch && matchesCategory;
      }),
    [products, searchTerm, selectedCategory],
  );

  const stats = useMemo(() => {
    const totalValue = products.reduce(
      (sum, product) => sum + Number(product.price || 0) * Number(product.quantity || 0),
      0,
    );

    return [
      { title: 'Total Products', value: products.length },
      {
        title: 'In Stock',
        value: products.filter((product) => product.status === 'In Stock').length,
      },
      {
        title: 'Low Stock',
        value: products.filter((product) => product.status === 'Low Stock').length,
      },
      { title: 'Total Value', value: formatCurrency(totalValue) },
    ];
  }, [products]);

  const resetModalState = () => {
    setEditingProductId('');
    setFormData(initialFormData);
    setShowModal(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const openCreateModal = () => {
    setEditingProductId('');
    setFormData(initialFormData);
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditingProductId(product.id);
    setFormData({
      name: product.name,
      category: product.category,
      price: String(product.price),
      quantity: String(product.quantity),
    });
    setShowModal(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.price || !formData.quantity) {
      toast.error('Please fill all fields.');
      return;
    }

    const payload = {
      name: formData.name.trim(),
      category: formData.category,
      price: Number(formData.price),
      quantity: Number.parseInt(formData.quantity, 10),
    };

    if (!Number.isFinite(payload.price) || payload.price < 0) {
      toast.error('Enter a valid price.');
      return;
    }

    if (!Number.isInteger(payload.quantity) || payload.quantity < 0) {
      toast.error('Enter a valid stock quantity.');
      return;
    }

    setSaving(true);

    try {
      if (editingProductId) {
        const response = await inventoryProductsApi.update(editingProductId, payload);

        setProducts((current) =>
          current.map((product) =>
            product.id === editingProductId ? response.inventoryProduct : product,
          ),
        );
        toast.success('Product updated successfully.');
      } else {
        const response = await inventoryProductsApi.create(payload);

        setProducts((current) => [response.inventoryProduct, ...current]);
        toast.success('Product added successfully.');
      }

      resetModalState();
    } catch (saveError) {
      toast.error(saveError.message || 'Unable to save product.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const product = products.find((item) => item.id === id);

    if (!window.confirm(`Delete ${product?.name || 'this product'}?`)) {
      return;
    }

    setDeletingId(id);

    try {
      await inventoryProductsApi.remove(id);
      setProducts((current) => current.filter((product) => product.id !== id));
      toast.success('Product deleted successfully.');
    } catch (deleteError) {
      toast.error(deleteError.message || 'Unable to delete product.');
    } finally {
      setDeletingId('');
    }
  };

  return (
    <div className={adminUi.page}>
      <div className={adminUi.pageHeader}>
        <div>
          <h1 className={adminUi.pageTitle}>Inventory</h1>
          <p className={adminUi.pageDescription}>Manage your kitchen appliance stock.</p>
        </div>
        <button type="button" onClick={openCreateModal} className={adminUi.primaryButton}>
          Add Product
        </button>
      </div>

      {showModal ? (
        <div className={adminUi.modalOverlay}>
          <div className={adminUi.modal}>
            <div className="flex items-center justify-between border-b border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingProductId ? 'Edit Product' : 'Add Product'}
              </h2>
              <button
                type="button"
                onClick={resetModalState}
                className="text-xl text-gray-500 transition hover:text-gray-700"
              >
                x
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-6">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Air Fryer"
                  className={adminUi.input}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={adminUi.select}
                >
                  {categories
                    .filter((category) => category !== 'All')
                    .map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  min="0"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g., 5999"
                  className={adminUi.input}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  min="0"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="e.g., 50"
                  className={adminUi.input}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={resetModalState}
                  className={`flex-1 ${adminUi.secondaryButton} py-2`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className={`flex-1 ${adminUi.primaryButton} disabled:cursor-not-allowed disabled:opacity-60`}
                >
                  {saving
                    ? 'Saving...'
                    : editingProductId
                      ? 'Save Product'
                      : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className={adminUi.input}
        />

        <select
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
          className={adminUi.select}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === 'All' ? 'All Categories' : category}
            </option>
          ))}
        </select>
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
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className={adminUi.panel}>
        <div className={adminUi.panelHeader}>
          <h2 className={adminUi.panelTitle}>Product Inventory ({filteredProducts.length})</h2>
        </div>

        {loading ? (
          <div className="px-6 py-12 text-center text-sm text-gray-400">
            Loading inventory products...
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={adminUi.tableHeader}>
                  <tr>
                    <th className={adminUi.th}>Product</th>
                    <th className={adminUi.th}>Category</th>
                    <th className={adminUi.th}>Price</th>
                    <th className={adminUi.th}>Stock</th>
                    <th className={adminUi.th}>Status</th>
                    <th className={adminUi.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className={adminUi.tableRow}>
                      <td className={`${adminUi.td} font-medium text-gray-900`}>
                        {product.name}
                      </td>
                      <td className={adminUi.td}>{product.category}</td>
                      <td className={`${adminUi.td} text-gray-800`}>{product.priceLabel}</td>
                      <td className={adminUi.td}>{product.quantity}</td>
                      <td className={adminUi.td}>
                        <span className={statusBadge(product.status)}>{product.status}</span>
                      </td>
                      <td className={adminUi.td}>
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            onClick={() => openEditModal(product)}
                            className={adminUi.textButton}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(product.id)}
                            disabled={deletingId === product.id}
                            className="text-sm text-red-600 transition hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {deletingId === product.id ? 'Deleting...' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-4 border-t border-gray-200 bg-gray-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-500">
                Showing <span className="font-medium text-gray-700">{filteredProducts.length}</span>{' '}
                of <span className="font-medium text-gray-700">{products.length}</span> products
              </p>
              <div className="text-sm text-gray-500">
                Shared inventory is synced with the distributor panel.
              </div>
            </div>
          </>
        ) : (
          <div className="px-6 py-12 text-center text-sm text-gray-400">No products found</div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
