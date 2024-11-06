import React from 'react';
import ProductGrid from '../components/ProductGrid';
import { Product } from '../types';
import { useProducts } from '../contexts/ProductContext';

interface WatchesPageProps {
  onAddToCart: (product: Product, size: string) => void;
  onAddToWaitlist: (product: Product, email: string, size: string) => void;
  isAdmin?: boolean;
}

export default function WatchesPage({ onAddToCart, onAddToWaitlist, isAdmin }: WatchesPageProps) {
  const { products, updateProduct } = useProducts();
  const watches = products.filter(product => product.category === 'Watches');

  return (
    <ProductGrid
      title="Luxury Watches"
      description="Timeless elegance for every occasion"
      heroImage="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=2000&q=80"
      products={watches}
      onAddToCart={onAddToCart}
      onAddToWaitlist={onAddToWaitlist}
      isAdmin={isAdmin}
      onProductUpdate={updateProduct}
    />
  );
}