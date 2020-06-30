const express = require('express');
const router = express.Router();
const SettingsModel = require('../model/settings');


router.get('/', async (req, res) => {
    try {
        var Settings = await SettingsModel.findOne();
        res.json(Settings);
    } catch (error) {
        res.json({ message: error.message });
    }

});

router.post('/add', async (req, res) => {

    console.log("Dummy Added");
    const Setting = new SettingsModel({
        basePrice: 0,
        withdrawLimit:0,
    });

    try {
        const savedSetting = await Setting.save()

        res.json(savedSetting);
    } catch (error) {
        res.json({ message: error });

    };
});


router.post('/update', async (req, res) => {

console.log("Settings Updated");
    try {
        var updatedSetting = await SettingsModel.updateOne(
            { _id: req.body.id },
            {
                $set: {
                    basePrice: req.body.basePrice,
                    withdrawLimit: req.body.withdrawLimit,
                }
            });
        console.log(updatedSetting);
        res.json(updatedSetting);
    } catch (err) {
        res.json({ message: err.message });

    };
});


module.exports = router;