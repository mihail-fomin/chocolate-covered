'use client'

import * as React from 'react'
import Container from './Container' 
import categories from '../../public/category.json'

export default function BasicTabs() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Container>
      123
    </Container>
  )
}
