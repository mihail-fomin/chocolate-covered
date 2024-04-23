'use client'

import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Flex, RadioGroup, Text, TextArea, TextField, Button } from '@radix-ui/themes'
import Link from 'next/link'
import { signIn } from 'next-auth/react'

type Props = {
  callbackUrl?: string
  error?: string
}

type FormValues = {
  username: string
  password: string
}



const Login = (props: Props) => {
  console.log('props: ', props);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    const { username, password } = data

    const response = await signIn('credentials', {
      username,
      password,
      redirect: true,
      callbackUrl: props.callbackUrl ?? 'http://localhost:3000/orders',
    })

    if (!response?.ok) {
      alert('hui')
    }
  }

  return (
    <>
      <Text as="p" className="mt-3">
        Login Form
      </Text>
      {!!props.error && <Text className='bg-red-100 text-red-600 text-center p-2' as="p">Auth Failed</Text>}
      <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="column" gap="3">
          <TextField.Input placeholder="username" {...register('username')} />
          <TextField.Input placeholder="password" {...register('password')} />
          <Flex gap='3' justify='end'>
            <Link href="/">
                <Button variant="soft">
                    Cancel
                </Button>
            </Link>
            <Button variant="classic" className='text-red-700' type="submit">
                Submit
            </Button>
          </Flex>
        </Flex>
      </form>
    </>
  )
}

export default Login
