'use client'
import Link from 'next/link'
import CardComponent from './CardComponent'
import { useFavorityHook } from '@/hooks/favorityHook'
import { useCartHook } from '@/hooks/cartHook'
import { useParams } from 'next/navigation'
import { Product } from '@/lib/interfaces'
import { useProducts } from '@/hooks/productQueries'


const ProductsList = ({ products }: { products: Product[] }) => {
    const params = useParams()
    const { data: baseProducts = [] } = useProducts({ initialData: products })



    const { favoritesId, handleToggleFavorite } = useFavorityHook(baseProducts)

    const { cartItemsIds, handleToggleCart } = useCartHook()



    return (
        products.map((product: Product) => (
            <Link href={`/${params.lang}/products/${product.id}`} key={product.id}  >
                <CardComponent productInfo={product} onAddToCart={() => handleToggleCart(product)} onToggleFavorite={() => handleToggleFavorite(product)} isFavorited={favoritesId.has(product.id)} isCartItem={cartItemsIds.has(product.id)} />
            </Link>
        ))
    )
}

export default ProductsList