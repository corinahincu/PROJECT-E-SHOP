"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const api_js_1 = __importDefault(require("./product/api.js"));
const entities_js_1 = require("./financial/entities.js");
const entities_js_2 = require("./product/entities.js");
/* import { createConnection } from 'typeorm';
import { getRepository } from 'typeorm'; */
require("reflect-metadata");
const fastify = (0, fastify_1.default)({ logger: true });
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
fastify.register(api_js_1.default);
fastify.register(import('fastify-typeorm-plugin'), {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '8929c',
    database: 'e_shop_ff_orm',
    entities: [entities_js_2.Product, entities_js_1.Money],
    synchronize: true,
    logging: true,
});
fastify.get('/', async (request, reply) => {
    reply.code(200).send({ status: 'active' });
    const products = await fastify.orm
        .getRepository(entities_js_2.Product)
        .createQueryBuilder('products')
        .getMany();
    return products;
});
fastify.listen({ port: 3000 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
