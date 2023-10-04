import Fastify from 'fastify'
import ProductRoute from './product/api.js';
import { Money } from './financial/entities.js';
import { Product } from './product/entities.js';
/* import { createConnection } from 'typeorm';
import { getRepository } from 'typeorm'; */
import "reflect-metadata" 

const fastify = Fastify({logger:true})

/* const connection = await createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '8929c',
  database: 'e_shop_ff_orm',
  entities: [Product],
  synchronize: true,
  logging: true,
})
fastify.register(require('fastify-typeorm-plugin'), {
  connection,
});
fastify.register(createProductRoute)

fastify.get('/', async (request,reply) =>{
  reply.code(200).send({ status:'active'})

  const productRepository = getRepository(Product);
    const products = await productRepository.createQueryBuilder('products').getMany();

    return products;
})  */

fastify.register(ProductRoute)
fastify.register(import('fastify-typeorm-plugin'), {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '8929c',
  database: 'e_shop_ff_orm',
  entities: [Product,Money],
  synchronize: true,
  logging: true,
});

fastify.get('/', async (request,reply) =>{
  reply.code(200).send({ status:'active'})

  const products = await fastify.orm
    .getRepository(Product)
    .createQueryBuilder('products')
    .getMany()

    return products
})

fastify.listen({port:3000}, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})

