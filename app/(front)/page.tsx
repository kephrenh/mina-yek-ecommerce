import ProductCard from "@components/products/ProductCard";
import data from "@lib/data";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <h2 className="text-2xl py-2">Produits Récents</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.products.map((product) => (
          <ProductCard
            key={product.slug}
            product={product}
          />
        ))}
      </div>
    </>
  );
}
