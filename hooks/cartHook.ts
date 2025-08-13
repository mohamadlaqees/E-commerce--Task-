"use client";
import { Product } from "@/lib/interfaces";
import {
  useAddToCollection,
  useCollection,
  useRemoveFromCollection,
} from "./productQueries";
import { useQueryClient } from "@tanstack/react-query";

export const useCartHook = () => {
  const queryClient = useQueryClient();
  const { data: cartItems = [], refetch } = useCollection("cart");
  const addToCollectionMutation = useAddToCollection();
  const removeFromCollectionMutation = useRemoveFromCollection();

  const cartItemsIds = new Set(cartItems.map((item) => item.id));

  const cartItemsCount = cartItems.length;

  const handleToggleCart = async (product: Product) => {
    const isProductExisted = cartItemsIds.has(product.id);

    if (!product) return;

    try {
      if (!isProductExisted) {
        queryClient.setQueryData(["cart"], (oldCart: Product[] | undefined) =>
          oldCart ? [...oldCart, product] : [product]
        );
        addToCollectionMutation.mutate(
          {
            collectionName: "cart",
            product: product,
          },
          {
            onSettled: () => {
              queryClient.invalidateQueries({ queryKey: ["cart"] });
            },
          }
        );
      } else {
        queryClient.setQueryData(["cart"], (oldCart: Product[] | undefined) =>
          oldCart ? oldCart.filter((item) => item.id !== product.id) : []
        );
        removeFromCollectionMutation.mutate(
          {
            collectionName: "cart",
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

  return { cartItemsIds, cartItemsCount, handleToggleCart };
};
