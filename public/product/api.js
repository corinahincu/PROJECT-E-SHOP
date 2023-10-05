"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const entities_js_1 = require("./entities.js");
const entities_js_2 = require("../financial/entities.js");
const ProductRoute = async (fastify) => {
    fastify.post('/products', async (request, reply) => {
        try {
            let requestBody = request.body;
            const product = new entities_js_1.Product();
            const money = new entities_js_2.Money();
            product.name = requestBody.name;
            money.amount = requestBody.amount;
            money.currency = requestBody.currency;
            product.price = money;
            const productRepository = (0, typeorm_1.getRepository)(entities_js_1.Product);
            await productRepository.save(product);
            reply.status(200).send({ message: 'Product created successfully' });
        }
        catch (error) {
            console.error('Error creating product:', error);
            reply.status(500).send({ message: 'Internal server error' });
        }
    });
};
exports.default = ProductRoute;
