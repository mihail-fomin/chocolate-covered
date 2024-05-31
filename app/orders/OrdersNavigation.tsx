import React from 'react'
import Link from 'next/link'

import SignInButton from '../components/SignInButton'
import { Button } from '@radix-ui/themes'

const OrdersNavigation = () => {
  return (
    <nav className="mt-3">
      <div className="flex justify-between">
        <Link href="/">
          <Button>На главную</Button>
        </Link>
        <SignInButton />
      </div>
    </nav>
  )
}

export default OrdersNavigation
