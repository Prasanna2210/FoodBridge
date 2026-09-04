const { BrevoClient } = require("@getbrevo/brevo");

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

const sendEmail = async ({
  to,
  subject,
  htmlContent,
}) => {
  try {
    const result =
      await brevo.transactionalEmails.sendTransacEmail({
        subject,
        htmlContent,

        sender: {
          name: process.env.BREVO_SENDER_NAME || "FoodBridge",
          email: process.env.BREVO_SENDER_EMAIL,
        },

        to: [
          {
            email: to,
          },
        ],
      });

    console.log("Email sent successfully:", result);

    return result;
  } catch (error) {
    console.error(
      "Email sending failed:",
      error.body || error.message
    );

    throw error;
  }
};

module.exports = {
  sendEmail,
};