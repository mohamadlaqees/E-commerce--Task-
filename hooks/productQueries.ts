"use client";

import {
  addToCollection,
  getCollection,
  getProduct,
  getProducts,
  removeFromCollection,
} from "@/lib/api";
import { Product } from "@/lib/interfaces";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

type AddToCollectionVars = {
  collectionName: "cart" | "favorites";
  product: Product;
};

type RemoveFromCollectionVars = {
  collectionName: "cart" | "favorites";
  productId: number;
};

export const useProducts = (options?: { initialData: Product[] }) => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
    initialData: options?.initialData,
  });
};

export const useProduct = (
  prodcutId: number,
  options?: { initialData: Product }
) => {
  return useQuery<Product | null>({
    queryKey: ["product", prodcutId],
    queryFn: () => getProduct(prodcutId),
    enabled: !!prodcutId,
    initialData: options?.initialData,
  });
};

export const useCollection = (
  collectionName: "cart" | "favorites",
  options?: { initialData: Product[] }
) => {
  return useQuery<Product[]>({
    queryKey: [collectionName],
    queryFn: () => getCollection(collectionName),
    initialData: options?.initialData,
  });
};

export const useAddToCollection = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, AddToCollectionVars>({
    mutationFn: (variables) =>
      addToCollection(variables.collectionName, variables.product),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: [variables.collectionName] });
    },
  });
};

export const useRemoveFromCollection = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, RemoveFromCollectionVars>({
    mutationFn: (variables) =>
      removeFromCollection(variables.collectionName, variables.productId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: [variables.collectionName] });
    },
  });
};
