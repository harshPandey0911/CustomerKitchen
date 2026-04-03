import ProductCard from './ProductCard';

export default function ProductGrid({ products }) {
  return (
    <section className="grid grid-cols-2 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
