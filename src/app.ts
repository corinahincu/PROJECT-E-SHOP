import Fastify from 'fastify'
const fastify = Fastify()

fastify.register(import('fastify-typeorm-plugin'), {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '8929c',
  database: 'e_shop_ff_orm',
});

fastify.get('/', async (request,reply) =>{
  reply.code(200).send({ status:'active'})
})

fastify.listen({port:3000}, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})

