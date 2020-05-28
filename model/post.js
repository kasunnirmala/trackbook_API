const mongoose = require('mongoose');
var ObjectIdSchema = mongoose.Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

const PostsSchema = new mongoose.Schema({
    _id: { type: ObjectIdSchema, default: function () { return new ObjectId() } },
    category: { type: mongoose.Schema.ObjectId, ref: 'Category' },
    userID:String,
    title: String,
    htmlTxt: String,
    active:Boolean,
    thumbnail:String,
}, {
    timestamps: true
});


module.exports = mongoose.model('Posts', PostsSchema);