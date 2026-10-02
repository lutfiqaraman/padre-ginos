import {
    beginTransaction,
    commitTransaction,
    createOrderDetails,
    createOrderHeader,
    getAllOrders,
    getOrderById,
    getOrderItemsByOrderId,
    getPastOrders,
    rollbackTransaction
} from "../repositories/orderRepository.js";

export async function getAllOrders() {
    return getAllOrders();
}

export async function getOrder(id) {

    const [order, orderItemsRes] = await Promise.all([
        getOrderById(id),
        getOrderItemsByOrderId(id)
    ]);

    if (!order) {
        return null;
    }

    const orderItems = orderItemsRes.map(item =>
        Object.assign({}, item, {
            image: `/public/pizzas/${item.pizzaTypeId}.webp`,
            quantity: +item.quantity,
            price: +item.price
        })
    );

    const total = orderItems.reduce(
        (acc, item) => acc + item.total,
        0
    );

    return {
        order: Object.assign({ total }, order),
        orderItems
    };
}

export async function createOrder(cart) {

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
        throw new Error("Invalid order data");
    }

    const now = new Date();
    const time = now.toLocaleTimeString("en-US", { hour12: false });
    const date = now.toISOString().split("T")[0];
    const mergedCart = mergeCart(cart);

    try {
        await beginTransaction();
        const orderId = await createOrderHeader(date, time);
        await createOrderDetails(orderId, mergedCart);
        await commitTransaction();

        return orderId;
    } catch (error) {
        await rollbackTransaction();
        throw error;
    }
}

export async function getPastOrdersList(page) {
    const limit = 10;
    const offset = (page - 1) * limit;

    return getPastOrders(offset);
}

function mergeCart(cart) {

    return cart.reduce((acc, item) => {

        const id = item.pizza.id;
        const size = item.size.toLowerCase();

        if (!id || !size) {
            throw new Error(
                "Invalid item data"
            );
        }

        const pizzaId = `${id}_${size}`;

        if (!acc[pizzaId]) {

            acc[pizzaId] = {
                pizzaId,
                quantity: 1
            };

        } else {
            acc[pizzaId].quantity++;
        }

        return acc;

    }, {});
}
