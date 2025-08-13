'use client'

import { Button, Result } from "antd"
import Link from "next/link"

const Error = ({ error }: { error: Error & { digest?: string } }) => {
    return (
        <Result
            status='500'
            title='500 - Server Error'
            subTitle={`${error}`}
            extra={
                <>
                    <Button>
                        <Link href='/'>
                            back to Home
                        </Link>
                    </Button></>
            }>

        </Result>
    )
}

export default Error