import { useMemo } from "react";
import { List, AutoSizer, ListRowRenderer } from 'react-virtualized';
import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    title: string;
  }>;
  onAddToWishList: (id: number) => void;
}

export function SearchResults({ results, onAddToWishList }: SearchResultsProps) {
  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem product={results[index]} onAddToWishList={onAddToWishList} />
      </div>
    )
  }

  const totalPrice = useMemo(() => {
    return results.reduce((total, product) => total + product.price, 0);
  }, [results]); 

  return (
    <div>
      <h2>{totalPrice}</h2>

      <List 
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />

      {/* {results.map(product => {
        return (
          <ProductItem key={product.id} product={product} onAddToWishList={onAddToWishList} />
        );
      })} */}
    </div>
  )
}

// USEMEMO - memoriza valor a partir de um array de dependencias para evitar renderizações desnecessárias
// 1. cálculos pesados
// 2. Igualdade referencial - quando repassa informação para componente filho

