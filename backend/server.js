import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";

import pizzaRoutes from "./routes/pizzaRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import contactRoutes from "./repositories/contactRoutes.js";

const server = fastify({
    logger: true,
});

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.register(fastifyStatic, {
    root: path.join(__dirname, "public"),
    prefix: "/backend/public/",
});

server.register(pizzaRoutes);
server.register(orderRoutes);
server.register(contactRoutes);

await server.listen({
    port: PORT
});
