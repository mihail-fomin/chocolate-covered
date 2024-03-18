import React from 'react';

interface Props {
  type: string
  message: string
}

const ErrorMessage = ({ type, message }: Props) => {
  return (
    <span className="text-red-500">
      {type === 'required' && 'Заполните данное поле'}
      {type === 'pattern' && message}
      {type === 'maxLength' && `Максимальная длина - ${message} символа`}
    </span>
  );
};

export default ErrorMessage;
