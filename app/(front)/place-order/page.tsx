import { Metadata } from 'next'
import Form from './Form'

export const metadata: Metadata = {
  title: 'Valider ma commande',
}

export default async function PlaceOrderPage() {
  return <Form />
}