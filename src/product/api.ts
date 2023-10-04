import {FastifyInstance} from 'fastify'
import { getRepository } from 'typeorm'
import {Product} from './entities.js'
import { Money } from '../financial/entities.js'

const ProductRoute = async (fastify: FastifyInstance) => {
  fastify.post('/products', async(request,reply) =>{
    try{

      const product = new Product()
      const money = new Money()
      product.id = 1
      product.name = "Macbook"
      money.amount = 1400
      money.currency = "EUR"
      product.price = money

      const productRepository = getRepository(Product)
      await productRepository.save(product)

      reply.status(201).send({ message: 'Product created successfully'})
    } catch(error){
      console.error('Error creating product:', error)
      reply.status(500).send({message: 'Internal server error'})
    }
  })
}
export default ProductRoute