const express = require('express');
const router = express.Router();
const CategoryModel = require('../model/category');


router.get('/', async (req, res) => {
    try {
        var Category = await CategoryModel.find();
        res.json(Category);
    } catch (error) {
        res.json({ message: error });
    }

});


router.get('/:categoryID', async (req, res) => {
    try {
        var Category = await CategoryModel.findById(req.params.categoryID);
        res.json(Category);
    } catch (error) {
        res.json({ message: error });
    }

})



router.post('/add', async (req, res) => {


    const Category = new CategoryModel({
        title: req.body.title,
    });

    try {
        const savedCategory = await Category.save()

        res.json(savedCategory);
    } catch (error) {
        res.json({ message: error });

    };
});


module.exports = router;