import { UseFormRegister } from 'react-hook-form';
import { IFormValues, InputType } from './InputFields';

export const CreateInputs = (register: UseFormRegister<IFormValues>) => [
  {
    type: InputType.Text,
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
    type: InputType.Text,
    name: 'phone',
    placeholder: 'Телефон',
    register: register,
    required: true,
    pattern: {
      value: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
      message: 'Введите корректый телефон',
    },
  },
  {
    type: InputType.Text,
    name: 'address',
    placeholder: 'Адрес',
    register: register,
    required: true,
    maxLength: 256,
  },
  {
    type: InputType.Radio,
    name: 'format',
    register: register,
  },
  {
    type: InputType.Textarea,
    name: 'comments',
    placeholder: 'Комментарии к заказу',
    register: register,
    required: false,
    maxLength: 256,
  },
];
