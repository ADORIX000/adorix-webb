/**
 * Handles contact form submissions
 */
const sendContactMessage = async (req, res) => {
    try {
        const { name, email, subject, message, honeypot } = req.body;

        // 1. Honeypot check
        if (honeypot) {
            console.warn(`Spam attempt blocked via honeypot from IP: ${req.ip}`);
            // Silently return success to the bot
            return res.status(200).json({
                success: true,
                message: "Message sent successfully!"
            });
        }

        // 2. Simple backend validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Name, email and message are required."
            });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format."
            });
        }

        if (message.trim().length < 10) {
            return res.status(400).json({
                success: false,
                message: "Message must be at least 10 characters long."
            });
        }

        // 3. Process the message (Simulated)
        console.log(`New contact message received:
            Name: ${name}
            Email: ${email}
            Subject: ${subject}
            Message: ${message}
        `);

        // In a real app, you'd send an email or save to DB here
        
        res.status(200).json({
            success: true,
            message: "Message sent successfully!"
        });

    } catch (error) {
        console.error("Error in sendContactMessage:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};

module.exports = {
    sendContactMessage
};
