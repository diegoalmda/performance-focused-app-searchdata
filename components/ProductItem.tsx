import { memo, useState } from 'react';
// import { AddProductToWishlist } from './AddProductToWishlist';
import { AddProductToWishlistProps } from './AddProductToWishlist'
import dynamic from 'next/dynamic';

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(() => {
  return import('./AddProductToWishlist').then(mod => mod.AddProductToWishlist)
}, {
  loading: () => <span>Carregando...</span>
})

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
  };
  onAddToWishList: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.price}</strong>
      <button onClick={() => setIsAddingToWishlist(true)}>Adicionar aos favoritos</button>
      
      {isAddingToWishlist &&
        <AddProductToWishlist 
          onAddToWishList={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishlist(false)}
        />
      }
      
    </div>
  )
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.product, nextProps.product)
});

// TO USE MEMO - Evita renderizações desnecessárias do componente
// 1. PURE FUNCTIONAL COMPONENT
// 2. RENDERS TOO OFTEN
// 3. RE-RENDERS WITH THE SAME PROPS
// 4. MEDIUM TO BIG SIZE COMPONENTS


// TO use dynamic or lazy (lazy loading)
// 1. componentes que não são renderizados em tela de imediato (modais)