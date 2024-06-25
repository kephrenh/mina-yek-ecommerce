import AddToCart from "@components/products/AddToCart";
import { convertDocToObj } from "@lib/utils";
import productService from "@lib/services/product.service";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await productService.getBySlug(params.slug);
  if (!product) {
    return { title: "Produit introuvable" };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

const ProductDetails = async ({ params }: { params: { slug: string } }) => {
  const product = await productService.getBySlug(params.slug);

  if (!product) {
    return <div>Produit introuvable</div>;
  }
  return (
    <>
      <div className="my-2">
        <Link href="/">{"Page d'accueil"}</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div>
          <ul className="space-x-4">
            <li>
              <h1 className="text-xl">{product.name}</h1>
            </li>
            <li>
              {product.rating} of {product.numReviews}
            </li>
            <li> {product.brand} </li>
            <li>
              <div className="divider"></div>
            </li>
            <li>
              Description: <p> {product.description} </p>
            </li>
          </ul>
        </div>
        <div className="card bg-base-300 shadow-xl mt-3 md:mt-0">
          <div className="card-body">
            <div className="flex justify-between mb-2">
              <h2>Prix</h2>
              <span>€{product.price}</span>
            </div>
            <div className="mb-2 flex justify-between">
              <h2>Status</h2>
              <span>{product.countInStock > 0 ? "En stock" : "Non disponible"}</span>
            </div>
            {product.countInStock !== 0 && (
              <div className="card-actions justify-center">
                <AddToCart item={{ ...convertDocToObj(product), qty: 0, color: "", size: "" }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductDetails;
