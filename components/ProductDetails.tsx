'use client'
import { Button, Col, Divider, Image, Row, Tag, Typography } from "antd";
import classes from './productDetails.module.css'
import { HeartFilled, HeartOutlined, ShoppingCartOutlined, ShoppingFilled } from "@ant-design/icons";
import { useFavorityHook } from "@/hooks/favorityHook";
import { useCartHook } from "@/hooks/cartHook";
import { Dictionary, Product } from "@/lib/interfaces";
import { useProduct, useProducts } from "@/hooks/productQueries";



const ProductDetails = ({ product, products, dictionary }: { product: Product, products: Product[], dictionary: Dictionary }) => {
    const { data: productsRTK = [], isLoading: isLoadingProducts, error: productsError } = useProducts({
        initialData: products
    })
    const { data: productRTK } = useProduct(+product.id, {
        initialData: product
    })

    const { favoritesId, handleToggleFavorite } = useFavorityHook(productsRTK)
    const { cartItemsIds, handleToggleCart } = useCartHook()

    if (!productRTK) {
        throw new Error('error')
    }
    const isFavorited = favoritesId.has(productRTK.id)
    const isCartItem = cartItemsIds.has(productRTK.id)

    return (
        <div className={classes.container}>
            <Row gutter={[48, 48]}>
                <Col xs={24} md={12}>
                    <div className={classes.imageWrapper}>
                        <Image
                            width="100%"
                            src={`/${product.image}`}
                            alt={product.title}
                            preview={false}
                        />
                    </div>
                </Col>

                <Col xs={24} md={12}>
                    <div className={classes.detailsWrapper}>
                        <Tag color="blue" style={{ marginBottom: '12px', alignSelf: 'flex-start' }}>
                            {product.category}
                        </Tag>
                        <Typography.Title className={classes.title}>
                            {product.title}
                        </Typography.Title>

                        <Typography.Paragraph className={classes.description}>
                            {product.description}
                        </Typography.Paragraph>

                        <Divider />

                        <div className={classes.priceSection}>
                            <Typography.Text className={classes.priceLabel}>{dictionary.price}:</Typography.Text>
                            <Typography.Text className={classes.price}>${product.price.toFixed(2)}</Typography.Text>
                        </div>

                        <div className={classes.action}>
                            <Button
                                type={`${isCartItem ? 'default' : 'primary'}`}
                                size='large'
                                icon={isCartItem ? <ShoppingFilled className={classes.shoppingIcon} /> : <ShoppingCartOutlined />}
                                className={classes.actionButton}
                                onClick={() => handleToggleCart(product)}
                            >
                                {`${isCartItem ? `${product.removeFromCartButton}` : `${product.addToCartButton}`}`}
                            </Button>
                            <Button
                                size='large'
                                icon={isFavorited ? <HeartFilled className={classes.favoritedIcon} /> : <HeartOutlined />}
                                className={classes.actionButton}
                                onClick={() => handleToggleFavorite(product)}>
                                {`${isFavorited ? `${product.removeFromFavoriteButton}` : `${product.addToFavoriteButton}`}`}
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </div >
    )
}

export default ProductDetails