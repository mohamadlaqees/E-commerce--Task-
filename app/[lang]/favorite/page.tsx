import FavoriteProductsList from '@/components/FavoriteProductsList'
import { getDicitionary } from '@/dictionary'
import { getCollection } from '@/lib/api';
import { translateProduct } from '@/lib/productUtils';

const favorite = async ({ params }: { params: { lang: "en" | "ar" } }) => {
    const awaitedParams = await params;
    const favoriteProducts = await getCollection('favorites')
    const dictionary = await getDicitionary(awaitedParams.lang)
    const finalProducts = translateProduct(awaitedParams.lang, dictionary, favoriteProducts)

    return (
        <FavoriteProductsList favoriteProducts={finalProducts} dictionary={dictionary} />
    )
}

export default favorite