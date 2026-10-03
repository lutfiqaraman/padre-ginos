import {
    getAllPizzas,
    getPizzaSizes,
    getPizzaTypes,
    getPizzaSizesByTypeId
} from "../repositories/pizzaRepository.js";

export async function getPizzas() {

    const [pizzas, pizzaSizes] = await Promise.all([
        getAllPizzas(),
        getPizzaSizes()
    ]);

    return pizzas.map(pizza => {

        const sizes = pizzaSizes.reduce((acc, current) => {

            if (current.id === pizza.pizza_type_id) {
                acc[current.size] = +current.price;
            }

            return acc;

        }, {});

        return {
            id: pizza.pizza_type_id,
            name: pizza.name,
            category: pizza.category,
            description: pizza.description,
            image: `/pizzas/${pizza.pizza_type_id}.webp`,
            sizes
        };
    });
}

export async function getPizzaOfTheDay() {

    const pizzas = await getPizzaTypes();

    const daysSinceEpoch = Math.floor(Date.now() / 86400000);

    const pizzaIndex = daysSinceEpoch % pizzas.length;

    const pizza = pizzas[pizzaIndex];

    const sizes = await getPizzaSizesByTypeId(pizza.id);

    const sizeObj = sizes.reduce((acc, current) => {

        acc[current.size] = +current.price;

        return acc;

    }, {});

    return {
        id: pizza.id,
        name: pizza.name,
        category: pizza.category,
        description: pizza.description,
        image: `/pizzas/${pizza.id}.webp`,
        sizes: sizeObj,
    };
}
