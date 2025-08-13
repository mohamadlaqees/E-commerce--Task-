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
                            <Button>
                                back to Home
                            </Button>
                        </Link>
                    </Button></>
            }>

        </Result>
    )
}

export default Error