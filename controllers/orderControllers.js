// import HttpError from "../helpers/HttpError.js";
import Order from "../models/Order.js";
import controlWrapper from "../decorators/controlWrapper.js";
import sendEmail from "../helpers/sendEmail.js";

const { CLIENT_EMAIL } = process.env;

async function createOrder(req, res) {
  const { file, body } = req;
  const fileURL = file ? file.path : null;

  const result = await Order.create({ ...body, fileURL });

  console.log("result :>> ", result);

  let orderMarkup = "";
  if (body.order) {
    orderMarkup = `
      Order:
      <br />
      <br />
      Width: ${result.order.width}
      <br />
      Height: ${result.order.height}
      <br />
      Color: ${result.order.color}
      <br />
      Font: ${result.order.font}
      <br />
      Text position: ${result.order.positionText}
      <br />
      Text style: ${result.order.styleText}
      <br />
      Text: ${result.order.text}
      <br />
      Price: ${result.order.price}
    `;
  }

  const html = `
    <p style="font-family: Arial, sans-serif">
      Customer info:
      <br />
      <br />
      Name: ${result.name}
      <br />
      Phone: ${result.phone}
      <br />
      Email: <a href="mailto:${result.email}">${result.email}</a>
      <br />
      Communicate by: ${result.communicateBy}
      <br />
      Comment: ${result.comment}
      <br />
      ${
        result.fileURL
          ? `<a href="${fileURL}" style="text-transform: uppercase;">Link to additional file</a>
      <br />`
          : ""
      }
      <br />
      ${orderMarkup}
    </p>
  `;

  // let attachments = [];
  // if (file) {
  //   const { path } = file;
  //   const fileExtension = path.split(".")[path.split(".").length - 1];
  //   attachments.push({ filename: `custom-style.${fileExtension}`, path });
  // }

  // const email = {
  //   to: CLIENT_EMAIL,
  //   subject: "Order received",
  //   html,
  //   attachments,
  // };

  sendEmail(html);

  res.status(201).json(result);
}

export default { createOrder: controlWrapper(createOrder) };
