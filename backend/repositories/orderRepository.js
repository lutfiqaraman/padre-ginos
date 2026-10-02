import db from "../config/database.js";

export async function getAllOrders() {
    return db.all(`
        SELECT
            order_id, 
            date, 
            time
        FROM orders
    `);
}

export async function getOrderById(id) {
    return db.get(`
        SELECT 
            order_id, 
            date, 
            time 
        FROM orders 
        WHERE order_id = ?
        `, [id]
    )
}

export async function getOrderItemsByOrderId(id) {
    return db.all(`
        SELECT
            t.pizza_type_id as pizzaTypeId, t.name, t.category, t.ingredients as description, o.quantity, p.price, o.quantity * p.price as total, p.size
        FROM
            order_details o
                JOIN
            pizzas p
            ON
                o.pizza_id = p.pizza_id
                JOIN
            pizza_types t
            ON
                p.pizza_type_id = t.pizza_type_id
        WHERE
            order_id = ?
    `, [id]);
}

export async function createOrderHeader(date, time) {

    const result = await db.run(
        "INSERT INTO orders (date, time) VALUES (?, ?)",
        [date, time]
    );

    return result.lastID;
}

export async function createOrderDetails(orderId, mergedCart) {

    for (const item of Object.values(mergedCart)) {

        await db.run(
            `INSERT INTO order_details
            (order_id, pizza_id, quantity)
            VALUES (?, ?, ?)`,
            [
                orderId,
                item.pizzaId,
                item.quantity
            ]
        );

    }

}

export async function getPastOrders(offset) {
    return db.all(
        `
        SELECT
            order_id,
            date,
            time
        FROM orders
        ORDER BY order_id DESC
        LIMIT 10 OFFSET ?
        `,
        [offset]
    );
}

export async function beginTransaction() {
    await db.run("BEGIN TRANSACTION");
}

export async function commitTransaction() {
    await db.run("COMMIT");
}

export async function rollbackTransaction() {
    await db.run("ROLLBACK");
}
