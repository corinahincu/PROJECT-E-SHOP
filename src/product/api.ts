import {FastifyInstance} from 'fastify'
import { fastify } from 'fastify';
import { getRepository } from 'typeorm'
import {Product} from './entities.js'
import { Money } from '../financial/entities.js'

interface ProductRequest {
  id: number;
  name: string;
  amount: number;
  currency: string;
}

const ProductRoute = async (fastify: FastifyInstance) => {
  fastify.post('/products', async (request, reply) => {
    try {
      // Extract data from the request body or wherever you are getting it from
      let requestBody: ProductRequest = request.body as ProductRequest

      const product = new Product();
      const money = new Money();
      product.name = requestBody.name;
      money.amount = requestBody.amount;
      money.currency = requestBody.currency;
      product.price = money;

      const productRepository = getRepository(Product);
      await productRepository.save(product);

      reply.status(200).send({ message: 'Product created successfully' });
    } catch (error) {
      console.error('Error creating product:', error);
      reply.status(500).send({ message: 'Internal server error' });
    }
  });
};
    export default ProductRoute



/* const ProductRoute = async (fastify: FastifyInstance) => {
  fastify.post('/products', async(request,reply) =>{
    try{
      const requestBody: CreateProductRequest = request.body;

      const product = new Product()
      const money = new Money()
      product.id = requestBody.id;
      product.name = requestBody.name;
      money.amount = requestBody.amount;
      money.currency = requestBody.currency;

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
export default ProductRoute */