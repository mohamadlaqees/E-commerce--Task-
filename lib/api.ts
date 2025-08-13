import { Product } from "./interfaces";

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch("http://localhost:4000/products", {
    cache: "no-cache",
  });
  return response.json();
};

export const addToCollection = async (
  collectionName: "cart" | "favorites",
  product: Product
): Promise<void> => {
  try {
    await fetch(`http://localhost:4000/${collectionName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCollection = async (
  collectionName: "cart" | "favorites"
): Promise<Product[] | []> => {
  const response = await fetch(`http://localhost:4000/${collectionName}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${collectionName}`);
  }
  return response.json();
};

export const removeFromCollection = async (
  collectionName: "cart" | "favorites",
  productId: number
) => {
  const collection = await getCollection(collectionName);
  const itemToDelete = collection.find((p) => p.id === productId);
  if (!itemToDelete) return;

  await fetch(`http://localhost:4000/${collectionName}/${productId}`, {
    method: "DELETE",
  });
};

export const getProduct = async (
  productsId: number
): Promise<Product | null> => {
  try {
    const response = await fetch(
      `http://localhost:4000/products/${productsId}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) throw new Error(`Failed to fetch ${productsId}`);
    return response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
