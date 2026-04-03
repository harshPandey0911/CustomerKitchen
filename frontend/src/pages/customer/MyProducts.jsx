import ProductsHeader from '../../components/customer/products/ProductsHeader';
import StatsCards from '../../components/customer/products/StatsCards';
import ProductGrid from '../../components/customer/products/ProductGrid';
import { getProductImage, getWarrantyDetails } from '../../data/customerOwnership';

export default function MyProducts({ products, onNavigate }) {
  const productSnapshots = products.map((product) => ({
    ...product,
    warranty: getWarrantyDetails(product.purchaseDate, product.warrantyMonths),
    image: getProductImage(product.productName),
  }));

  const activeCount = productSnapshots.filter((product) => product.warranty.status === 'active').length;
  const expiringSoonCount = productSnapshots.filter(
    (product) => product.warranty.status === 'active' && product.warranty.daysRemaining <= 30,
  ).length;

  const stats = [
    { label: 'Registered Products', value: productSnapshots.length },
    { label: 'Active Coverage', value: activeCount },
    { label: 'Expiring Soon', value: expiringSoonCount },
  ];

  if (productSnapshots.length === 0) {
    return (
      <div className="space-y-4">
        <ProductsHeader onRegister={() => onNavigate('/customer/register-product')} />

        <div className="rounded-[24px] bg-white p-5 text-center !shadow-[0_14px_34px_rgba(30,30,30,0.08)]">
          <h2 className="text-lg font-bold text-[#1E1E1E]">No products yet</h2>
          <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">
            Add your first appliance to unlock warranty tracking, product history, and faster service requests.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('/customer/register-product')}
            className="mt-4 rounded-xl bg-[#8B5E3C] px-4 py-2.5 text-sm font-semibold text-white !shadow-[0_10px_24px_rgba(139,94,60,0.24)] transition-all duration-300 ease-out active:scale-95"
          >
            Register Product
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ProductsHeader onRegister={() => onNavigate('/customer/register-product')} />
      <StatsCards stats={stats} />
      <ProductGrid products={productSnapshots} />
    </div>
  );
}
