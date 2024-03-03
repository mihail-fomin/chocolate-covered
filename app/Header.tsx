import React from 'react'
import Container from './components/Container'

const Header: React.FC = () => {
  return (
    <header className="bg-red-300 py-6">
      <Container>
        <img className="max-w-96 mx-auto" src="/images/logo.svg" alt="Логотип" />
      </Container>
    </header>
  )
}

export default Header
