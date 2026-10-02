import db from "../config/database.js";

export async function getAllPizzas() {
    return db.all(`
        SELECT
            pizza_type_id,
            name,
            category,
            ingredients as description
        FROM pizza_types
    `);
}

export async function getPizzaSizes() {
    return db.all(`
        SELECT
            pizza_type_id as id,
            size,
            price
        FROM pizzas
    `);
}

export async function getPizzaTypes() {
    return db.all(`
        SELECT
            pizza_type_id as id,
            name,
            category,
            ingredients as description
        FROM pizza_types
    `);
}

export async function getPizzaSizesByTypeId(pizzaTypeId) {
    return db.all(`
        SELECT
            size,
            price
        FROM pizzas
        WHERE pizza_type_id = ?
    `, [pizzaTypeId]);
}
