export default function ProductPreviewCard({ product, description }) {
  return (
    <section className="overflow-hidden rounded-[24px] bg-white p-4 !shadow-[0_14px_34px_rgba(30,30,30,0.08)]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#A9745B]">Register Product</p>

      <div className="mt-4 rounded-[22px] bg-[#FBF8F5] p-4">
        <div className="flex h-44 items-center justify-center overflow-hidden rounded-[18px] bg-white">
          {product?.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain p-4"
            />
          ) : null}
        </div>

        <div className="mt-4 space-y-2">
          <h1 className="text-[1.2rem] font-bold tracking-[-0.03em] text-[#1E1E1E]">{product?.name || 'Select a product'}</h1>
          <p
            className="text-sm leading-6 text-[#6B7280]"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
