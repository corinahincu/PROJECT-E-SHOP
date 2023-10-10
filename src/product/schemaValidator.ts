import { Static, Type } from '@sinclair/typebox'

export const ProductRequest = Type.Object({
  name: Type.String(),
  amount: Type.Number(),
  currency: Type.String()
})

export const ProductReply = Type.Object({
  id :Type.Integer(),
  name: Type.String(),
  price: Type.Object({
    amount: Type.Number(),
    currency: Type.String()
  }
  )
})

export type ProductRequestType = Static <typeof ProductRequest>
export type ProductReplyType = Static <typeof ProductReply>