import Image from 'next/image'
import React from 'react'

const ImageContainer = ({ image }: { image: string }) => {
  return (
    <div className="relative h-[10rem] overflow-hidden rounded-t-lg">
      <Image
        className="object-cover w-full h-full rounded-t-lg transition duration-1000 hover:scale-125"
        width={300}
        height={300}
        src={image}
        alt="Картинка десерта"
      />
    </div>
  )
}

export default ImageContainer
