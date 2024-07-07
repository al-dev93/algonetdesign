export const formInputs = [
  {
    id: '1',
    tag: 'input',
    type: 'text',
    placeholder: 'prénom - nom',
    pattern: '^[a-zA-ZÀ-ú\\-\\s]+$',
    required: true,
    minLength: 4,
    contactFormInputId: 'name',
    errorMessageId: '1',
  },
  {
    id: '2',
    tag: 'input',
    type: 'text',
    placeholder: "nom de l'entreprise",
    contactFormInputId: 'company',
  },
  {
    id: '3',
    tag: 'input',
    type: 'email',
    placeholder: 'adresse mail valide',
    pattern: '^[a-z0-9._\\-]+@[a-z0-9._\\-]{2,}[.][a-z]{2,4}$',
    required: true,
    contactFormInputId: 'email',
    errorMessageId: '2',
  },
  {
    id: '4',
    tag: 'input',
    type: 'tel',
    placeholder: '0X xx xx xx xx',
    pattern: '0[0-9] [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}',
    contactFormInputId: 'tel',
    errorMessageId: '3',
  },
  {
    id: '5',
    tag: 'textarea',
    placeholder: 'votre message',
    required: true,
    contactFormInputId: 'message',
    errorMessageId: '4',
  },
];
