import ProductDetails from "@/components/ProductDetails";
import { getDicitionary } from "@/dictionary";
import { getProduct, getProducts } from "@/lib/api";
import { Product } from "@/lib/interfaces";
import { translateProduct } from "@/lib/productUtils";
import { notFound } from "next/navigation";


const page = async ({ params }: { params: { id: string, lang: 'en' | 'ar' } }) => {
  const awaitedParams = await params;
  const baseProducts: Product[] = await getProducts()
  const dictionary = await getDicitionary(awaitedParams.lang)

  const productId = Number(awaitedParams.id)
  if (isNaN(productId)) {
    notFound()
  }
  const product = await getProduct(productId);

  if (!product) notFound()
  const finalProducts = translateProduct(params.lang, dictionary, [product])




  return (
    <ProductDetails product={finalProducts[0]} products={baseProducts} dictionary={dictionary} />
  )

};

export default page;
