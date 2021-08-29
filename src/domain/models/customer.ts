export interface ICustomer {
  id?: string
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
  id?: string
  name: string
  street: string
  number: Number
  neighborhood: string
  city: string
  state: string
}

interface IPhone {
  id?: string
  name: string
  phone: string
}

export const makeCustomer = (data: any): ICustomer => {
  return {
    id: data._id,
    name: data.name,
    birthDate: data.birthDate,
    CPF: data.CPF,
    RG: data.RG,
    facebook: data.facebook,
    instagram: data.instagram,
    twitter: data.twitter,
    linkedin: data.linkedin,
    address: data.address,
    phone: data.phone
  }
}
