import React from 'react'

const ErrorMessage = ({ type, message }: any) => {
  return (
    <span className="text-red-500">
      {type === 'required' && 'Заполните данное поле'}
      {type === 'pattern' && message}
      {type === 'maxLength' && 'Превышена максимальная длина'}
    </span>
  )
}

export default ErrorMessage
