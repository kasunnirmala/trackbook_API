const mongoose = require('mongoose');
var ObjectIdSchema = mongoose.Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

const PaymentSchema = new mongoose.Schema({
    _id: { type: ObjectIdSchema, default: function () { return new ObjectId() } },
    userID: String,
    requestedAmount:Number,
    paid:Boolean,
    date:String
}, {
    timestamps: true
});


module.exports = mongoose.model('Payment', PaymentSchema);