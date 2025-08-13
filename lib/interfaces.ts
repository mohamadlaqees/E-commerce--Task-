export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  addToCartButton?: string;
  addToFavoriteButton?: string;
  removeFromCartButton?: string;
  removeFromFavoriteButton?: string;
}

export interface Cart {
  cart: {
    cartItemsCount: number;
  };
}

export interface TranslatedProduct {
  id: string;
  title: string;
  description: string;
  category: string;
}

export interface Dictionary {
  home: string;
  favorite: string;
  shopping_cart: string;
  "Add to cart": string;
  "Add to favorite": string;
  "Remove from cart": string;
  "Remove from favorite": string;
  cartEmpty: string;
  favoriteEmpty: string;
  favoriteTitle: string;
  total: string;
  price: string;
  products: TranslatedProduct[];
}

export interface CardComponentProps {
  productInfo: Product;
  onAddToCart: (id: number) => void;
  onToggleFavorite: (id: number) => void;
  isFavorited: boolean;
  isCartItem: boolean;
}


