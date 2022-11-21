// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const locationsService = require('./locations.service')

router.get('/locations', (req, res) => {
	return res.status(200).send({locations: []})
})

router.get('/locations/:id', (req,res)=>{
	const result = locationsService.findID(req.params.id);
	if(result){
		res.json(result).status(200);
	}
	else{
		res.json({}).status(404);
	}
})

router.delete('/locations/:id', (req,res)=>{
	const result = locationsService.removeOne(req.params.id)
	if(result===1) {
		res.status(202).send('Ressource deleted');
	}
	else {
		res.status(404).send('No ressource to delete could be found');
	}	
})

router.post('/locations', (req,res)=>{
	const doc = req.body;
	if(doc){
		const nDoc = new Location(doc);
		nDoc.save().then((result)=>{
			res.json({id:result._id}).status(201);
		})
		.catch((err)=>{
			console.error('Invalid payload');
			res.status(403).json({id:null});
		})
	}
	else{
		res.status(403)
	}
})

router.put('/locations/:id',(req,res)=>{
	const doc = req.body;
	const result = locationsService.updateDocument(req.params.id,doc);
	res.status(201).send(`Successfully updated object ${req.params.id}`);
})

module.exports = router
