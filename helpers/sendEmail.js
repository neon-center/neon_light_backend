import sgMail from "@sendgrid/mail";

const { SENDGRID_API_KEY, CLIENT_EMAIL, SENDGRID_EMAIL } = process.env;

const sendEmail = (html) => {
  // send_grid
  sgMail.setApiKey(SENDGRID_API_KEY);
  const msg = {
    to: CLIENT_EMAIL, // Change to your recipient
    from: SENDGRID_EMAIL, // Change to your verified sender
    subject: "Order from neon-light constructor",
    // text: "and easy to do anywhere, even with Node.js",
    html,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
  // send_grid -End
};

export default sendEmail;
