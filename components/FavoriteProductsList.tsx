'use client'
import React from 'react'
import classes from './FavoriteProductsList.module.css'
import { Empty, Typography } from 'antd'
import { useFavorityHook } from '@/hooks/favorityHook'
import Link from 'next/link'
import CardComponent from './CardComponent'
import { useCartHook } from '@/hooks/cartHook'
import { Dictionary, Product } from '@/lib/interfaces'
import { useParams } from 'next/navigation'
import { useCollection } from '@/hooks/productQueries'


const FavoriteProductsList = ({ favoriteProducts, dictionary }: { favoriteProducts: Product[], dictionary: Dictionary }) => {
    const { data: favoriteItems = [], isLoading: isLoadingProducts, error: productsError } = useCollection('favorites', {
        initialData: favoriteProducts
    })

    const params = useParams()
    const { favoritesId, handleToggleFavorite } = useFavorityHook(favoriteItems)
    const { cartItemsIds, handleToggleCart } = useCartHook()




    return (
        <div className={classes.container}>
            <Typography.Title level={2} className={classes.title}>{dictionary.favoriteTitle}
            </Typography.Title>

            {
                favoriteItems.length > 0 ?
                    <div className={classes.grid}>
                        {favoriteItems.map((product) => (
                            <Link href={`/${params.lang}/products/${product.id}`} key={product.id}  >
                                <CardComponent productInfo={product} onAddToCart={() => handleToggleCart(product)} onToggleFavorite={() => handleToggleFavorite(product)} isFavorited={favoritesId.has(product.id)} isCartItem={cartItemsIds.has(product.id)} />
                            </Link>
                        ))}
                    </div>
                    : <Empty
                        description={
                            <span>
                                {dictionary.favoriteEmpty}
                            </span>} />}
        </div >
    )
}

export default FavoriteProductsList