import { TranslatedProduct } from "@/app/AppLayout";

const useProductHook = (params:, baseProducts) => {

  const translationMap = new Map<string, TranslatedProduct>(
    dictionary.products.flat().map((p) => [p.id, p])
  );

  const translatedProducts = baseProducts.map((baseProduct) => {
    const translation = translationMap.get(String(baseProduct.id));
    if (params.lang === "ar" && translation) {
      return {
        ...baseProduct,
        title: translation.title,
        description: translation.description,
      };
    }
    return baseProduct;
  });
  return { translatedProducts };
};

export default useProductHook;
