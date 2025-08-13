import CartProductList from '@/components/CartProductList'
import { getDicitionary } from '@/dictionary';
import { getCollection } from '@/lib/api'
import { translateProduct } from '@/lib/productUtils';
import React from 'react'

const cart = async ({ params }: { params: { lang: "en" | "ar" } }) => {
    const awaitedParams = await params;
    const cartProducts = await getCollection('cart')
    const dictionary = await getDicitionary(awaitedParams.lang)
    const finalProducts = translateProduct(awaitedParams.lang, dictionary, cartProducts)



    return (
        <CartProductList cartProducts={finalProducts} dictionary={dictionary} />
    )
}

export default cart