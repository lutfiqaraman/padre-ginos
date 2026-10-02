import { getPizzas, getPizzaOfTheDay } from "../services/pizzaService.js";

export default async function pizzaRoutes(server) {
    server.get("/api/pizzas", async (req, res) => {
        const pizzas = await getPizzas();
        res.send(pizzas);
    });

    server.get("/api/pizza-of-the-day", async (req, res) => {
        const pizza = await getPizzaOfTheDay();
        res.send(pizza);
    });
}
