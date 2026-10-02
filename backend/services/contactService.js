export function submitContactForm({ name, email, message }, log) {
    if (!name || !email || !message) {
        throw new Error("All fields are required");
    }

    log.info(`Contact Form Submission:
    Name: ${name}
    Email: ${email}
    Message: ${message}
    `);
}
