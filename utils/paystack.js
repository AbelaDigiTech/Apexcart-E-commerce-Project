const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;

const verifyPaystackTransaction = async (reference) => {
  // In a live system, you would send an HTTP GET call to:
  // https://api.paystack.co/transaction/verify/${reference}
  // Using authorization headers. We mock a true response here for testing.
  return { status: true, message: "Verification successful" };
};

module.exports = { verifyPaystackTransaction };