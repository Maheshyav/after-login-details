import React, { createContext, useContext, useState } from 'react';
import { Product } from '../types';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: number) => void;
  getProductsByCategory: (category: string) => Product[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: React.ReactNode;
}

// Initial products data
const initialProducts: Product[] = [
  // Men's products
  {
    id: 1,
    name: 'Classic Oxford Shirt',
    price: '$89',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
    category: 'Men',
    description: 'Classic Oxford shirt in premium cotton.',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    id: 2,
    name: 'Premium Denim Jeans',
    price: '$149',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80',
    category: 'Men',
    description: 'Premium selvedge denim jeans with perfect fit.',
    sizes: ['28', '30', '32', '34', '36'],
    inStock: true
  },
  // Women's products
  {
    id: 3,
    name: 'Floral Maxi Dress',
    price: '$129',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
    category: 'Women',
    description: 'Elegant floral maxi dress perfect for summer.',
    sizes: ['XS', 'S', 'M', 'L'],
    inStock: true
  },
  {
    id: 4,
    name: 'Designer Handbag',
    price: '$299',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    category: 'Women',
    description: 'Luxury designer handbag in genuine leather.',
    sizes: ['One Size'],
    inStock: true
  },
  // Kids products
  {
    id: 5,
    name: 'Colorful T-Shirt Set',
    price: '$39',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80',
    category: 'Kids',
    description: 'Fun and comfortable t-shirt set for active kids.',
    sizes: ['3-4Y', '4-5Y', '5-6Y', '6-7Y'],
    inStock: true
  },
  {
    id: 6,
    name: 'Kids Party Dress',
    price: '$59',
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80',
    category: 'Kids',
    description: 'Elegant party dress for special occasions.',
    sizes: ['3-4Y', '4-5Y', '5-6Y'],
    inStock: true
  },
  // Watches
  {
    id: 7,
    name: 'Luxury Chronograph',
    price: '$599',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80',
    category: 'Watches',
    description: 'Premium chronograph watch with Swiss movement.',
    sizes: ['One Size'],
    inStock: true
  },
  {
    id: 8,
    name: 'Smart Watch Pro',
    price: '$399',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80',
    category: 'Watches',
    description: 'Advanced smartwatch with health monitoring.',
    sizes: ['One Size'],
    inStock: false
  }
];

export function ProductProvider({ children }: ProductProviderProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, { ...product, id: Date.now() }]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const deleteProduct = (productId: number) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
  };

  const getProductsByCategory = (category: string) => {
    return products.filter(product => 
      category === 'All' ? true : product.category === category
    );
  };

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductsByCategory
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}