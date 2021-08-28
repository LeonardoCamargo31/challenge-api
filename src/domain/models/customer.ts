export interface ICustomer {
  name: string
  birthDate: Date
  CPF: string
  RG: string
  facebook?: string
  instagram?: string
  twitter?: string
  linkedin?: string
  address?: IAddress[]
  phone?: IPhone[]
}

interface IAddress {
  name: string
  street: string
  number: Number
  neighborhood: string
  city: string
  state: string
}

interface IPhone {
  name: string
  phone: string
}
