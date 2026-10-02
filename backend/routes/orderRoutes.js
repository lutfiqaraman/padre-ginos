import {
    getOrders,
    getOrder,
    createOrder,
    getPastOrdersList
} from "../services/orderService.js";

export default async function orderRoutes(server) {

    server.get("/api/orders", async (req, res) => {
        const orders = await getOrders();
        res.send(orders);
    });

    server.get("/api/order", async (req, res) => {
        const order = await getOrder(req.query.id);
        res.send(order);
    });

    server.get("/api/past-orders", async (req, res) => {
        await new Promise((resolve) => setTimeout(resolve, 5000));

        try {
            const page = parseInt(req.query.page, 10) || 1;
            const pastOrders = await getPastOrdersList(page);

            res.send(pastOrders);
        } catch (error) {
            req.log.error(error);
            res.status(500).send({
                error: "Failed to fetch past orders"
            });
        }
    });

    server.get("/api/past-order/:order_id", async (req, res) => {
        try {
            const order = await getOrder(req.params.order_id);

            if (!order) {
                res.status(404).send({
                    error: "Order not found"
                });
                return;
            }

            res.send(order);
        } catch (error) {
            req.log.error(error);
            res.status(500).send({
                error: "Failed to fetch order"
            });
        }
    });

    server.post("/api/order", async (req, res) => {
        try {
            const orderId = await createOrder(req.body.cart);
            res.send({ orderId });
        } catch (error) {
            req.log.error(error);
            res.status(500).send({
                error: error.message
            });
        }
    });
}
