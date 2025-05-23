import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import { userType } from './userType'
import { productType } from './productType'
import { shippingAddressType } from './shippingAddressType'
import { saleType } from './saleType'
import { orderType } from './orderType'
import { collectionType } from './collectionType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, userType, productType, shippingAddressType, saleType, orderType, collectionType],
}
