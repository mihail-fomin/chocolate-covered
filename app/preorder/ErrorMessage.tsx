import React from 'react'
import { FieldError } from 'react-hook-form'

const ErrorMessage = ({ error }: { error?: FieldError }) => {
    const { type, message } = error || {}

    return (
        <span className="text-red-500">
            {type === 'required' && 'Заполните данное поле'}
            {type === 'pattern' || (type === 'validate' && message)}
            {type === 'maxLength' && 'Превышена максимальная длина'}
        </span>
    )
}

export default ErrorMessage
