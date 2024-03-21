import { UseFormRegister } from 'react-hook-form'
import { IFormValues } from './InputFields'

export const CreateInputs = (register: UseFormRegister<IFormValues>) => [
  {
    type: 'text',
    name: 'name',
    placeholder: 'Имя',
    register: register,
    required: true,
    pattern: {
      value: /^[-A-ZА-Я' ]+?$/iu,
      message: 'Имя не может содержать цифры или спецсимволы',
    },
    maxLength: 32,
  },
  {
    type: 'text',
    name: 'phone',
    placeholder: 'Телефон',
    register: register,
    required: true,
    pattern: {
      value: /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/,
      message: 'Введите корректый телефон',
    },
  },
  {
    type: 'text',
    name: 'address',
    placeholder: 'Адрес',
    register: register,
    required: true,
    maxLength: 256,
  },
  {
    type: 'radio',
    name: 'format',
    register: register,
  },
  {
    type: 'textarea',
    name: 'comments',
    placeholder: 'Комментарии к заказу',
    register: register,
    required: false,
    maxLength: 256,
  },
]
