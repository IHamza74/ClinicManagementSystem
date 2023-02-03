const stripe = require("stripe")(
  "sk_test_51MXKe9C29MDmzShDZmKilPDtZXNz0Tsfn7vXld2fkESq0HahSdh8IZlGazxWawSjrwnLp4usm0SnSBYVYdve0XeS00mB7VZhAm"
);
const mongoose = require("mongoose");
require("../Models/invoiceModel");
const InvoiceSchema = mongoose.model("invoices");

exports.getCgeckoutSession = async (req, res, next) => {
  // 1) Get invoice
  const invoice = InvoiceSchema.findOne({ _id: req.params.invoiceId }, {});
  const invoceDetails = await invoice.exec();
  const money = await invoceDetails.money;
  const paymentMethod = await invoceDetails.paymentMethod;
  const medicine = await invoceDetails.medicine;

  let paymentDetails = "";
  medicine.forEach((el) => {
    paymentDetails += el;
  });
  const paymentDescription = paymentDetails
    .replace("}{", " --- ")
    .replace("{", "")
    .replace("}", "");

  // 2) Create checkout session
  if (paymentMethod === "Credit Card") {
    try {
      const session = await stripe.checkout.sessions.create({
        client_reference_id: `${req.params.invoiceId}`,
        mode: "payment",
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "EGP",
              unit_amount: money * 100,

              product_data: {
                name: `Invoce No: ${req.params.invoiceId}`,
                description: `${paymentDescription}`,
              },
            },
            quantity: 1,
          },
        ],

        success_url: `${req.protocol}://${req.get("host")}/invoice/?id=${req.params.invoiceId}`,
        cancel_url: `${req.protocol}://${req.get("host")}/invoice/`,
      });

      // 3) Create session as response
      res.status(200).json({
        status: "success",
        session,
      });
    } catch (error) {
      next(error);
    }
  } else {
    res.status(400).json({ status: "Fail", message: "That's not Credit Card Payment" });
  }
};
