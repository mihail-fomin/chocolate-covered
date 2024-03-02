'use client'

import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { a11yProps, CustomTabPanel } from './NavBar'
import { Container } from '@mui/material'
import categories from '../../public/category.json'

export default function BasicTabs() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Container>
      <Box
        sx={{ borderBottom: 1 }}
        className="w-full flex justify-between border-red-700"
      >
        <Tabs value={value} onChange={handleChange} textColor="secondary">
          {categories.map((category, index) => (
            <Tab
              key={category.title}
              label={category.rus}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>
      {categories.map((category, index) => (
        <CustomTabPanel key={category.title} value={value} index={index}>
          {category.rus}
        </CustomTabPanel>
      ))}
    </Container>
  )
}
