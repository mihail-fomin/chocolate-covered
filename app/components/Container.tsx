import React, { ReactNode } from 'react'

interface ContainerProps {
    children: ReactNode
}

const Container: React.FC<ContainerProps> = ({ children }) => {
    return <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12">{children}</div>
}

export default Container
