'use client'

import store from "@/store"
import { AntdRegistry } from "@ant-design/nextjs-registry"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider } from "react-redux"

const queryClient = new QueryClient()
const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <AntdRegistry>
                    {children}
                </AntdRegistry>
            </QueryClientProvider>

        </Provider>
    )
}

export default StoreProvider