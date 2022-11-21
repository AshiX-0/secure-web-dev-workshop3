// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')

async function findAll () {
	const res = await Location.find();
	return res;
}

async function remOne(id) {
	const res = await Location.deleteOne({_id:id});
	return res;
}

async function findID(id){
	const res= await Location.findById(id);
	return res;
}

async function updateID(_id,updateDoc){
	Location.findByIdAndUpdate(_id,updtateDoc).then((res)=>{
        console.log(res);
        return res;
    }).catch((err)=>{
        console.error("Error in querying", err.message);
        return err;
    })
}
module.exports.findAll = findAll
module.exports.removeOne = remOne
module.exports.findID = findID
module.exports.updateDocument = updateID
