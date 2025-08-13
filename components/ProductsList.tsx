'use client'
import Link from 'next/link'
import CardComponent from './CardComponent'
import { useFavorityHook } from '@/hooks/favorityHook'
import { useCartHook } from '@/hooks/cartHook'
import { useParams } from 'next/navigation'
import { Dictionary, Product } from '@/lib/interfaces'


const ProductsList = ({ products, dictionary }: { products: Product[], dictionary: Dictionary }) => {
    const params = useParams()



    const { favoritesId, handleToggleFavorite } = useFavorityHook(products)

    const { cartItemsIds, handleToggleCart } = useCartHook()



    return (
        products.map((product: Product) => (
            <Link href={`/${params.lang}/products/${product.id}`} key={product.id}  >
                <CardComponent productInfo={product} onAddToCart={() => handleToggleCart(product)} onToggleFavorite={() => handleToggleFavorite(product)} isFavorited={favoritesId.has(product.id)} isCartItem={cartItemsIds.has(product.id)} dictionary={dictionary} />
            </Link>
        ))
    )
}

export default ProductsList