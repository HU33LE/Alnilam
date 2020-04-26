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

let index = (req,res) => {

	Asset.findAll().then(assets => {
		let result = assets.map( asset => asset.toJson());

		res.json(result);
	}).catch( err => {
		console.error(err);
		res.status(500).json({
			msg: "An error has occurred"
		});
	})
}

let show = (req, res) => {
	const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

	let assetId = req.params.id;

	Asset.findById(assetId).then(asset => {
		if(asset === null)
			return res.status(404).json({
				msg: `Not asset found with id [${assetId}]`
			})

		let result = asset.toJson();
		res.json(result);
	}).catch( err => {
		console.error(err); 
		res.status(500).json({
			msg: "An error has ocurred"
		});
	})
}

let update = (req, res) => {
	const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
	}
	
	let assetId = req.params.id;

	Asset.findById(assetId).then( asset => {
		if(asset === null)
			return res.status(400).json({
				msg: `Not asset found with id [${assetId}]`
			});

		if(req.body.name)
			asset.name = req.body.name.trim();

		if(req.body.description)
			asset.description = req.body.description.trim();

		asset.save().then(asset => {
			let result = asset.toJson();
			res.json(result);
		}).catch(err => {
			const error = err.original;
            console.error(error.sqlMessage);
            res.status(500).json({
                error: 'An error has ocurred'
            });
            return;
		})
	}).catch( err => {
		console.error(err);
		res.status(500).json({
			msg: "An error has occurred"
		});
	})
}

let deleteAsset = (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    let = assetId = req.params.id;

    Asset.findById(assetId).then( asset => {
		if(asset === null)
			return res.status(400).json({
				msg: `Not asset found with id [${assetId}]`
            });  

        asset.destroy(assetId).then( asset => {
            res.status(204).json(asset.toJson());
        }).catch(err => {
            console.error(err);
            res.status(500).json({
                msg: 'An error has occurred'
            });
        });
    });
}


module.exports.create = create; 
module.exports.index = index; 
module.exports.show = show; 
module.exports.update = update; 
module.exports.deleteAsset = deleteAsset; 