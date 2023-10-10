import Fastify from "fastify"
import ProductRoute from './product/api.js';
import { Product } from './product/entities.js';
const fastify = Fastify({logger:true})

  fastify.register(import('fastify-typeorm-plugin'), {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '8929c',
  database: 'e_shop_ff_orm2',
  entities: [Product],
  synchronize: true,
  logging: true,
}); 


fastify.register(ProductRoute, {prefix: '/products'})

fastify.get('/', async (request,reply) =>{

  const products = await fastify.orm
    .getRepository(Product)
    .createQueryBuilder('product')
    .getMany()
    
    console.log(products , "!!!!!!" )
    
  return reply.code(200).send({status:'active', products:products})
    
})

fastify.listen({port:3000}, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
