import { NextRequest, NextResponse } from 'next/server'
import { sendOrder } from '@/app/utils/telegram'


export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { productArray, orderData } = body
    await sendOrder(productArray, orderData)
    return NextResponse.json({ success: 'Message sent' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Invalid issue' }, { status: 400 })
  }
}

