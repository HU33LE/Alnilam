const database = require ('../database/models');
const { Model } = require('sequelize');
const crypto = require ('crypto-js');
const stringHelper = require('../helpers/stringHelper');

let Asset =  class Asset{
    constructor(args = {}) {
		this._id = undefined;
		this._name = undefined;
        this._description = undefined;
        this._userId = undefined;

		if(args) {
			for(let key in args) {
				this[`_${key}`] = args[key];
			}
        }
        
        let collectionHash = stringHelper.random(100);
        this._collectionHash = crypto.SHA256(collectionHash).toString();
    }
    
    save (){
        return new Promise((res,rej) => {
            if(this._id === undefined){
                //Create in DataBase
                let asset = this.toJson(true);
                database.Asset.create(asset).then(row => {
                    this._id = row.id; 
                    res(this);
                }).catch((err) => {
                    rej(err);
                });
            } else {
                //Update in DataBase
                let asset = this.toJson(true);
                
                database.Asset.findOne({
                    where: {
                        id: this._id
                    }
                }).then(_asset => {
                    _asset.update(asset).then(row =>{
                        res(this);
                    }).catch(err => {
                        rej(err);
                    });
                }).catch(err => {
                    rej(err);
                });
            }
        });
    };

    destroy (){
        return new Promise((res,rej) => {
            if(this._id === undefined){
                err = new Error('No asset to delete');
                rej(err);
            } else {
                //Delete Asset
                
                database.Asset.findOne({
                    where: {
                        id: this._id
                    }
                }).then(asset => {
                    asset.destroy().then(row =>{
                        res(this);
                    }).catch(err => {
                        rej(err);
                    });
                }).catch(err => {
                    rej(err);
                });
            }
        });
    }

    toJson(inner = false){
        let json = {
            id: this._id,
            name: this._name,
            description: this._description,
            userId: this._userId
        };

        if(inner){
            json.collectionHash = this._collectionHash;
        }

        return json;
    }

    set name (_name){
        this._name = _name;
    }

    get name (){
        return this._name;
    }

    set description (_description){
        this._description = _description;
    }

    get description (){
        return this._description;
    }

    set collectionHash (_collectionHash){
        this._collectionHash = _collectionHash;
    }

    get collectionHash (){
        return this._collectionHash;
    }

    set useId (_userId){
        this._userId = _userId;
    }

    get useId (){
        return this._userId;
    }
}

/** 
 * Emulate Sequelize.findAll method, but returning
 * instances of User instead of raw database info
 */
Asset.findAll = (obj = {}) => {
	return new Promise( (res, rej) => {
		database.Asset.findAll(obj).then( rawAssets => {
			let assets = rawAssets.map( rawAsset => {
				return new Asset(rawAsset.dataValues);
			});

			res(assets);
		}).catch( err => {
			rej(err);
		})
	});
};

/**
 * Emulate Sequelize.findOne method, but returning
 * instances of Asset instead of raw database info
 */
Asset.findOne = (obj = {}) => {
	return new Promise( (res, rej) => {
		database.Asset.findOne(obj).then( rawAsset => {
			if(!rawAsset) 
				res(null);

			let asset = new Asset(rawAsset.dataValues);
			res(asset);
		}).catch( err => {
			rej(err);
		})
	});
};

/**
 * Emulate Sequelize.findOne method, but returning
 * instances of Asset instead of raw database info
 */
Asset.findById = (id) => {
	return new Promise( (res, rej) => {
		database.Asset.findByPk(id).then( rawAsset => {
			if(!rawAsset) 
				res(null);

			let asset = new Asset(rawAsset.dataValues);
			res(asset);
		}).catch( err => {
			rej(err);
		})
	});
};

module.exports = Asset;