const stripe = require("stripe")(process.env.FUNCTION_STRIPE_KEY);

module.exports = async function ({ req, res, log, error }) {
    if (req.method === 'POST') {
        log(req.bodyRaw);

        try {
            // create a payment intent
            const amount = JSON.parse(req.bodyRaw).amount;

            const paymentIntent = await stripe.paymentIntents.create({
                amount:amount,
                currency: 'inr',
                automatic_payment_methods: {
                    enabled: true
                }
            });

            // if successful payment then add record to database.

            // return the secret
            return res.json({ paymentIntent: paymentIntent.client_secret });
            // return res.json({ paymentIntent: amount});

        } catch (error) {
            return res.send('something went wrong! --> ', error)
        }
    }
}