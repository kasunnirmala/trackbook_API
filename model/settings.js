const mongoose = require('mongoose');
var ObjectIdSchema = mongoose.Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

const SettingsSchema = new mongoose.Schema({
    _id: { type: ObjectIdSchema, default: function () { return new ObjectId() } },
    basePrice: Number,
    withdrawLimit:Number,

}, {
    timestamps: true
});


module.exports = mongoose.model('Settings', SettingsSchema);