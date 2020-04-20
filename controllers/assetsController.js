const Asset = require('../models/Asset');
const { validationResult } = require('express-validator');

let create = (req,res) => {
    const errors  = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    let attrs = {
        name: req.body.name,
        description: req.body.description,
        userId: req.body.userId
    };

    let asset = new Asset(attrs);

    asset.save().then( (_asset) => {
        res.status(201).json(_asset.toJson());
    }).catch(err => {
        console.error(err);
        res.status(500).json({
            error: 'An error has ocurred'
        });
        return;
    });
}




module.exports.create = create; 