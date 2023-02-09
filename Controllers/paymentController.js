const stripe = require("stripe")(
  "sk_test_51MXKe9C29MDmzShDZmKilPDtZXNz0Tsfn7vXld2fkESq0HahSdh8IZlGazxWawSjrwnLp4usm0SnSBYVYdve0XeS00mB7VZhAm"
);
const mongoose = require("mongoose");
require("../Models/invoiceModel");
const InvoiceSchema = mongoose.model("invoices");

exports.getCheckoutSession = async (req, res, next) => {
  // 1) Get invoice
  const invoice = InvoiceSchema.findOne()
    .sort("-date")
    .populate({
      path: "medicine.medicineID",
      select: { _id: 0, Name: 1, Dose: 1 },
    });
  const invoceDetails = await invoice.exec();
  const id = invoceDetails._id.toString();
  const money = invoceDetails.money;
  const paymentMethod = invoceDetails.paymentMethod;
  const medicine = invoceDetails.medicine;
  const payStatus = invoceDetails.payment_status;

  let paymentDetails = "";
  medicine.forEach((el) => {
    paymentDetails += el;
  });
  const paymentDescription = paymentDetails
    .replace(/}{/g, " --- ")
    .replace(/medicineID:|{|}|'/g, "");

  // 2) Create checkout session
  if (paymentMethod === "Credit Card" && payStatus === false) {
    try {
      const session = await stripe.checkout.sessions.create({
        client_reference_id: `${id}`,
        mode: "payment",
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "EGP",
              unit_amount: money * 100,

              product_data: {
                name: `Invoce No: ${id}`,
                description: `${paymentDescription}`,
              },
            },
            quantity: 1,
          },
        ],

        success_url: `${req.protocol}://${req.get("host")}/invoice/${id}`,
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
    res
      .status(400)
      .json({ status: "Fail", message: "That's not Credit Card Payment Or it's already paid" });
  }
};
