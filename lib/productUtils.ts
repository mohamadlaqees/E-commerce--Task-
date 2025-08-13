import { Dictionary, Product, TranslatedProduct } from "./interfaces";

export function translateProduct(
  lang: "en" | "ar",
  dictionary: Dictionary,
  baseProducts: Product[]
): Product[] {
  const translationMap = new Map<string, TranslatedProduct>(
    dictionary.products.flat().map((p) => [p.id, p])
  );

  const translatedProducts = baseProducts.map((baseProduct) => {
    const translation = translationMap.get(String(baseProduct.id));
    if ((lang === "ar" || lang === "en") && translation) {
      return {
        ...baseProduct,
        title: translation.title,
        description: translation.description,
        category: translation.category,
        addToCartButton: dictionary["Add to cart"],
        addToFavoriteButton: dictionary["Add to favorite"],
        removeFromCartButton: dictionary["Remove from cart"],
        removeFromFavoriteButton: dictionary["Remove from favorite"],
      };
    }
    return baseProduct;
  });

  return translatedProducts;
}
