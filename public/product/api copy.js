import { Product } from './entities.js';
import { Money } from '../financial/entities.js';
import { ProductRequest } from './schemaValidator.js';
const ProductRoute = async (fastify) => {
    fastify.post('/', {
        schema: {
            body: ProductRequest,
            response: {
                200: ProductRequest
            }
        }
    }, async (request, reply) => {
        const product = new Product();
        const { name, amount, currency } = request.body;
        product.price = new Money();
        product.name = name;
        product.price.amount = amount;
        product.price.currency = currency;
        await fastify.orm.manager.save(product);
        return reply.status(200).send({ name, amount, currency, message: 'Product created successfully' });
    });
};
export default ProductRoute;
