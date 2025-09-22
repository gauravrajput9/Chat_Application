import { resendClient, Sender } from "../utils/resend.js"
import { welcomeEmailTemplate } from "./EmailTemplate.js"


export const sendWelcomeEmail = async (email, name, client_url) => {
    const { error, data } = await resendClient.emails.send({
        from: `${Sender.name} <${Sender.email}>`,
        to:
            process.env.NODE_ENV === "production"
                ? email
                : "rajputgaurav8135@gmail.com",
        subject: "Welcome To Chatify",
        html: welcomeEmailTemplate(name, client_url),
    });

    if (error) {
        console.log("Sending Email Error:", error.message);
        throw new Error("Sending Emails Error");
    }

    console.log("Email Sent Successfully: ", data);
};