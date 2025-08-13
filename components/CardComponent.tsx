'use client'
import React from 'react';
import { Button, Card, Tooltip } from 'antd';
import classes from './CardComponent.module.css'
import { HeartFilled, HeartOutlined, ShoppingCartOutlined, ShoppingFilled } from '@ant-design/icons';
import { CardComponentProps } from '@/lib/interfaces';

const CardComponent: React.FC<CardComponentProps> = ({ productInfo, onAddToCart, onToggleFavorite, isFavorited, isCartItem }) => {

    const handleIconclick = (e: React.MouseEvent, actions: 'cart' | 'favorite') => {
        e.stopPropagation();
        e.preventDefault();
        if (actions === 'cart') {
            onAddToCart(productInfo.id)
        }
        else {
            onToggleFavorite(productInfo.id)
        }

    }
    return (
        <Card className={classes.card} title={productInfo.title} variant="borderless" hoverable
            actions={[
                <Tooltip title={`${isFavorited ? `${productInfo.removeFromFavoriteButton}` : `${productInfo.addToFavoriteButton}`}`}>
                    <Button type='text' shape='circle' icon={isFavorited ? <HeartFilled className={classes.favoritedIcon} /> : <HeartOutlined />} onClick={(e) => handleIconclick(e, 'favorite')} />
                </Tooltip>,
                <Tooltip title={`${isCartItem ? `${productInfo.removeFromCartButton}` : `${productInfo.addToCartButton}`} `}>
                    <Button type='text' shape='circle' icon={isCartItem ? <ShoppingFilled className={classes.shoppingIcon} /> : <ShoppingCartOutlined />} onClick={(e) => handleIconclick(e, 'cart')} />
                </Tooltip>
            ]}  >
            <img className={classes.cardImage} src={`/${productInfo.image}`} alt={productInfo.title} />
            <div className={classes.content}>
                {productInfo.description}
            </div>
            <div className={classes.price}>
                {productInfo.price} $
            </div>
        </Card>)
}

export default CardComponent