import { submitContactForm } from "../services/contactService.js";

export default async function contactRoutes(server) {

    server.post("/api/contact", async (req, res) => {
        try {
            submitContactForm(req.body, req.log);

            res.send({
                success: "Message received"
            });
        } catch (error) {
            res.status(400).send({
                error: error.message
            });
        }
    });
}
