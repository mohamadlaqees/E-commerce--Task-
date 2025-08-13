'use client'
import React, { useState } from 'react'
import classes from './CartProductList.module.css'
import { Avatar, Button, Empty, List, Typography } from 'antd'
import { useCartHook } from '@/hooks/cartHook'
import { Dictionary, Product } from '@/lib/interfaces'
import { useParams } from 'next/navigation'
import { useCollection } from '@/hooks/productQueries'


const CartProductList = ({ cartProducts, dictionary }: { cartProducts: Product[], dictionary: Dictionary }) => {
    const { data: cartItems = [], isLoading: isLoadingProducts, error: productsError } = useCollection('cart', {
        initialData: cartProducts
    })
    const params = useParams()
    const { handleToggleCart } = useCartHook()





    const totalPrice = cartItems.reduce((curr, item) => curr + item.price, 0)

    return (
        <div className={classes.container}>
            {cartItems.length > 0 ?
                <List
                    itemLayout='horizontal'
                    dataSource={cartItems}
                    renderItem={(item) => (
                        <List.Item
                            className={classes.cartItem}
                            actions={[
                                <Button type='link' danger onClick={() => handleToggleCart(item)}>
                                    {dictionary['Remove from cart']}
                                </Button>

                            ]} >

                            <List.Item.Meta
                                style={{ width: '100%', padding: '20px' }}
                                avatar={<Avatar src={`/${item.image}`} />} title={<a href={`/${params.lang}/products/${item.id}`} >{item.title}</a>}
                                description={item.description}
                            />

                            <div className={classes.price}>${item.price.toFixed(2)}</div>
                        </List.Item>
                    )}
                /> : <Empty
                    description={
                        <span>
                            {dictionary.cartEmpty}
                        </span>} />}
            <div className={classes.footer}>
                <Typography.Title level={2}>
                    {dictionary.total}: $ {totalPrice.toFixed(2)}
                </Typography.Title>
            </div>
        </div >
    )
}

export default CartProductList