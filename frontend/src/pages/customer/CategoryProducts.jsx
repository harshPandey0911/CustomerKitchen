import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { customerProducts } from '../../data/customerProducts';

const CategoryProducts = () => {
  const navigate = useNavigate();
  const { category } = useParams();

  const filteredProducts = customerProducts.filter((item) => item.category === category);
  const title = category ? `${category.charAt(0).toUpperCase()}${category.slice(1)}` : 'Category';

  return (
    <div className="customer-panel min-h-screen bg-[#F8F5F2]">
      <div className="mx-auto min-h-screen max-w-md bg-[#F8F5F2]">
        <div className="customer-topbar sticky top-0 z-20">
          <div className="flex items-center gap-3 px-4 py-3">
            <button
              onClick={() => navigate(-1)}
              className="customer-icon-button flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m15 19-7-7 7-7" />
              </svg>
            </button>
            <div>
              <p className="customer-heading text-lg font-semibold">{title} Products</p>
              <p className="customer-subheading text-sm">{filteredProducts.length} items found</p>
            </div>
          </div>
        </div>

        <div className="p-4">
          {filteredProducts.length === 0 ? (
            <div className="customer-surface rounded-xl p-6 text-center text-sm text-gray-400">
              No products found in this category
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {filteredProducts.map((item) => (
                <div key={item.id} className="customer-surface rounded-xl p-3">
                  <img src={item.image} alt={item.name} className="mb-2 h-28 w-full rounded-md object-cover" />
                  <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                  <p className="customer-subheading mt-1 text-sm">Rs {item.price.toLocaleString('en-IN')}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
