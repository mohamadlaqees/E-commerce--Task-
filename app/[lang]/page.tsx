import React from 'react'
import classes from './page.module.css'
import ProductsList from '@/components/ProductsList'
import { getDicitionary } from '@/dictionary'
import { translateProduct } from '@/lib/productUtils'
import { getProducts } from '@/lib/api'


const page = async ({ params }: { params: { lang: "en" | "ar" } }) => {
  const awaitedParams = await params;
  const dictionary = await getDicitionary(awaitedParams.lang)
  const baseProducts = await getProducts()
  const finalProducts = translateProduct(awaitedParams.lang, dictionary, baseProducts)



  return (
    <div className={classes.homeContent}>
      <ProductsList products={finalProducts} />
    </div>
  )
}

export default page