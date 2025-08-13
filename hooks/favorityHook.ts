"use client";
import { Product } from "@/lib/interfaces";
import {
  useAddToCollection,
  useCollection,
  useRemoveFromCollection,
} from "./productQueries";
import { useQueryClient } from "@tanstack/react-query";

export const useFavorityHook = (products: Product[]) => {
  const queryClient = useQueryClient();
  const { data: favoritesItems = [] } = useCollection("favorites");
  const addToCollectionMutation = useAddToCollection();
  const removeFromCollectionMutation = useRemoveFromCollection();
  const favoritesId = new Set(favoritesItems.map((item) => item.id));

  const handleToggleFavorite = async (product: Product) => {
    const isProductExisted = favoritesId.has(product.id);

    if (!product) return;
    try {
      if (!isProductExisted) {
        queryClient.setQueryData(
          ["favorites"],
          (oldFavorites: Product[] | undefined) =>
            oldFavorites ? [...oldFavorites, product] : [product]
        );
        addToCollectionMutation.mutate(
          {
            collectionName: "favorites",
            product: product,
          },
          {
            onSettled: () => {
              queryClient.invalidateQueries({ queryKey: ["favorites"] });
            },
          }
        );
      } else {
        queryClient.setQueryData(
          ["favorites"],
          (oldFavorites: Product[] | undefined) =>
            oldFavorites
              ? oldFavorites.filter((item) => item.id !== product.id)
              : []
        );
        removeFromCollectionMutation.mutate(
          {
            collectionName: "favorites",
            productId: product.id,
          },
          {
            onSettled: () => {
              queryClient.invalidateQueries({ queryKey: ["cart"] });
            },
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { favoritesId, handleToggleFavorite };
};
