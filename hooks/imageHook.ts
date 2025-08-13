interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  absoluteImageUrl: string;
}
const useImageHook = (products: Product[]) => {
  const productsWithAbsoulteUrls = products.map((product) => {
    const absoluteIamgeUrl = `/${product.image}`;
    return {
      ...product,
      absoluteImageUrl: absoluteIamgeUrl,
    };
  });
  return { productsWithAbsoulteUrls };
};

export default useImageHook;
