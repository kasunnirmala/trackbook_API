const express = require('express');
const router = express.Router();
const PostsModel = require('../model/post');
const CategoryModel = require('../model/category');


router.get('/', async (req, res) => {
    try {
        // console.log("A");
        var Posts = await PostsModel.find().populate('category');
        res.json(Posts);
    } catch (error) {
        res.json({ message: error });
    }

});

router.get('/getAllActive', async (req, res) => {
    try {
        // console.log("A");
        var Posts = await PostsModel.find({ 'active': true }).populate('category');
        res.json(Posts);
    } catch (error) {
        res.json({ message: error });
    }

});


router.get('/getAllActiveCount/:userID', async (req, res) => {
    try {
        // console.log("A");
        var Posts = await PostsModel.countDocuments({ 'active': true, 'userID': req.params.userID });
        res.json(Posts);
    } catch (error) {
        res.json({ message: error });
    }

});

router.get('/byCategory/:categoryID', async (req, res) => {
    try {
        var Category = await CategoryModel.findById(req.params.categoryID);
        var Posts = await PostsModel.find({ 'category': Category._id, 'active': true }).populate('category');
        res.json(Posts);
    } catch (error) {
        res.json({ message: error });
    }

})


router.get('/byCategory', async (req, res) => {
    var list = Array();
    try {
        var allCount = await PostsModel.countDocuments({ 'active': true });
        list.push({
            id: "all",
            title: "All",
            count: allCount

        });
        // list.push({ all: allCount });
        var Category = await CategoryModel.find();
        var lst = await processArray(Category);
        list.push(...lst);
        console.log(list);
        res.json(list);

    } catch (error) {
        res.json({ message: error.message });
    }

})


async function processArray(array) {
    var list = Array();
    for (const cat of array) {
        var PostsCount = await PostsModel.countDocuments({ 'category': cat._id, 'active': true });
        list.push({
            id: cat._id,
            title: cat.title,
            count: PostsCount

        });
    }
    return list;
}


// async function getCount(array){

//     array.forEach(async (cat)=>{
//        var posts= await PostsModel.countDocuments({ 'category': cat._id }); 
//        console.log(posts);
//     });

// }


router.get('/byID/:id', async (req, res) => {
    try {
        var Posts = await PostsModel.findById(req.params.id).populate('category');
        res.json(Posts);
    } catch (error) {
        res.json({ message: error });
    }

})


router.get('/byTitle', async (req, res) => {
    try {
        var Posts = await PostsModel.find({ 'title': req.body.title }).populate('category');
        res.json(Posts);
    } catch (error) {
        res.json({ message: error });
    }

})


router.get('/byuser/:id', async (req, res) => {
    try {
        var Posts = await PostsModel.find({ 'userID': req.params.id }).populate('category');
        res.json(Posts);
    } catch (error) {
        res.json({ message: error });
    }

})


router.get('/byTitle/search/:searchTxt', async (req, res) => {
    var a = req.params.searchTxt;
    console.log(a);
    try {
        var Posts = await PostsModel.find({ 'title': { '$regex': a, '$options': 'i' }, 'active': true }).populate('category');
        res.json(Posts);
    } catch (error) {
        res.json({ message: error });
    }

})




router.post('/add', async (req, res) => {
    try {
        var Category = await CategoryModel.findById(req.body.category);

        const Post = new PostsModel({
            title: req.body.title,
            category: Category._id,
            htmlTxt: req.body.htmlTxt,
            active: req.body.active ? req.body.active : false,
            userID: req.body.userID,
            thumbnail: req.body.thumbnail
        });

        console.log(req.body.title);

        const savedPost = await Post.save()

        res.json(savedPost);
    } catch (error) {
        res.json({ message: error.message });

    };
});

router.post('/update/:postID', async (req, res) => {
    console.log("UPDATING");
    // console.log(req.body.active);
    try {

        var updatedPost = await PostsModel.updateOne(
            { _id: req.params.postID },
            {
                $set: {
                    title: req.body.title,
                    category: req.body.category,
                    htmlTxt: req.body.htmlTxt,
                    active: true,
                    userID: req.body.userID,
                    thumbnail: req.body.thumbnail
                }
            });
        // console.log(updatedPost);
        res.json(updatedPost);
    } catch (err) {
        // console.log(err.message);
        res.json({ message: err.message });

    };
});


router.post('/test', async (req, res) => {
    res.send(req.body);
});

module.exports = router;