"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const entities_1 = require("./entities");
const createProductRoute = async (fastify) => {
    fastify.post('/products', async (request, reply) => {
        try {
            const { id, name, price } = request.body;
            const product = new entities_1.Product();
            product.id = id;
            product.name = name;
            product.price = price;
            const productRepository = (0, typeorm_1.getRepository)(entities_1.Product);
            await productRepository.save(product);
            reply.status(201).send({ message: 'Product created successfully' });
        }
        catch (error) {
            console.error('Error creating product:', error);
            reply.status(500).send({ message: 'Internal server error' });
        }
    });
};
exports.default = createProductRoute;
