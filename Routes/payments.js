const express = require('express');
const router = express.Router();
const PaymentModel = require('../model/payment');
var moment = require('moment');

router.get('/', async (req, res) => {
    try {
        var Payments = await PaymentModel.find();
        res.json(Payments);
    } catch (error) {
        res.json({ message: error.message });
    }

});


router.get('/byPayment/:paymentID', async (req, res) => {
    try {
        var Payments = await PaymentModel.findById(req.params.paymentID);
        res.json(Payments);
    } catch (error) {
        res.json({ message: error });
    }

})



router.get('/byUser/:userID', async (req, res) => {
    try {
        var Payments = await PaymentModel.find({ userID: req.params.userID });
        res.json(Payments);
    } catch (error) {
        res.json({ message: error });
    }

})



router.post('/add', async (req, res) => {
    console.log("OO");
    const Payment = new PaymentModel({
        userID: req.body.userID,
        requestedAmount: req.body.amount,
        date: moment().format('YYYY-MM-DD HH:mm:ss'),
        paid: false
    });

    try {
        const savedPayment = await Payment.save()

        res.json(savedPayment);
    } catch (error) {
        res.json({ message: error.message });

    };
});



router.post('/update/:paymentID', async (req, res) => {
    console.log("UPDATING");
    // console.log(req.body.active);
    try {

        var updatedPayment = await PaymentModel.updateOne(
            { _id: req.params.paymentID },
            {
                $set: {
                    paid: req.body.paid,
                    userID: req.body.userID,
                    requestedAmount: req.body.requestedAmount,
                    date: req.body.date
                }
            });
        // console.log(updatedPost);
        res.json(updatedPayment);
    } catch (err) {
        // console.log(err.message);
        res.json({ message: err.message });

    };
});


router.post('/onPay', async (req, res) => {
    console.log("PAID");
    // console.log(req.body.active);
    try {
        var updatedPayment = await PaymentModel.updateOne(
            { _id: req.body.id },
            {
                $set: {
                    paid: true,
                }
            });
        console.log(updatedPost);
        res.json(updatedPayment);

        // console.log(req.body.id );
        // res.json("updatedPayment");
    } catch (err) {
        // console.log(err.message);
        res.json({ message: err.message });

    };
});




module.exports = router;