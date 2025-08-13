'use client'
import React, { ReactNode, useMemo } from 'react'
import { Badge, Button, Dropdown, Layout, Menu, MenuProps, Space, theme } from 'antd';

const { Header, Content, Footer } = Layout;
import classes from './AppLayout.module.css'
import { useParams, usePathname, useRouter } from 'next/navigation';
import { GlobalOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Dictionary, } from '@/lib/interfaces';
import { useCartHook } from '@/hooks/cartHook';

const AppLayout = ({ children, dictionary }: { children: ReactNode, dictionary: Dictionary }) => {
    const params = useParams()
    const pathname = usePathname()
    const router = useRouter()
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const { cartItemsCount } = useCartHook()


    const handleMenuOnClick: MenuProps['onClick'] = (e) => {
        router.push(`/${params.lang}${e.key}`)
    }

    const handleLanguageChange = (newLocale: string) => {
        const pathSegments = pathname.split('/');
        pathSegments[1] = newLocale
        const newPath = pathSegments.join('/');
        router.push(newPath)
    }

    const langMenu: MenuProps['items'] = [
        { key: 'en', label: 'English', onClick: () => handleLanguageChange('en') },
        { key: 'ar', label: 'العربية', onClick: () => handleLanguageChange('ar') }

    ]

    const menuItems = useMemo(() => [
        { key: '/', label: dictionary.home },
        { key: '/favorite', label: dictionary.favorite },

    ], [dictionary])


    const activemenuKey = useMemo(() => {
        const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, '') || '/'
        if (pathWithoutLocale.startsWith('/favorite')) {
            return '/favorite';
        }

        else if (pathWithoutLocale.startsWith('/products'))
            return 'products'

        return pathWithoutLocale
    }, [pathname])

    return (
        <Layout >
            <Header className={classes.header}>
                <div style={{ display: 'flex', alignItems: 'center', flexBasis: '90%' }}>
                    <div className={classes.logo} >
                        E-commerce
                    </div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        selectedKeys={[activemenuKey]}
                        onClick={handleMenuOnClick}
                        items={menuItems}
                        style={{ flex: 1, minWidth: 0 }}
                    />
                </div>
                <div>
                    <Dropdown menu={{ items: langMenu }} placement='bottomRight'>
                        <Button type='text'>
                            <Space style={{ color: 'white' }}>
                                <GlobalOutlined style={{ color: 'white', fontSize: '24px' }} />
                                {params.lang}
                            </Space>
                        </Button>
                    </Dropdown>
                </div>
                <Link href={`/${params.lang}/cart`}>
                    <Badge count={cartItemsCount} offset={[10, 0]} style={{ color: '#5252fa', backgroundColor: 'white' }}>
                        <ShoppingCartOutlined className={pathname.endsWith('cart') ? classes.cartIcon : classes.cart} />
                    </Badge>
                </Link>
            </Header>
            <Content className={classes.content}>
                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 280,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {children}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                E-comemrce ©{new Date().getFullYear()} Created by Mohamad Laqees
            </Footer>
        </Layout>
    )
}

export default AppLayout