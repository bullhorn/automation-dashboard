const express = require('express');
const router = express.Router();
const Result = require('../models/result');
const httpUtil = require('../utils/httpUtil');
    
router.get('/query', (req, res, next) => {
	httpUtil.buildBody(Result, {});
    let query = httpUtil.buildWhere(req.query.where);
    httpUtil.handleResponsePromise(res, Result.getByQuery(query));
});

router.post('/create', (req,res,next) => {
	let body = httpUtil.buildBody(Result, req.body);
	let newResult = new Result(body);

	Result.addResult(newResult, (error, result) => {
		httpUtil.handleResponseCallback(res, error, result);
	});
});

router.put('/update/:label', (req, res, next) => {
	let query = {label: req.params.label};
    let body = httpUtil.buildBody(Result, req.body);
    httpUtil.handleResponsePromise(res, Result.updateByQuery(query, body));
});

router.get('/options', (req, res, next) => {
	let query = httpUtil.buildWhere(req.query.where);
	Result.getByQuery(query).then(results => {
		let data = results.map(result => {
			return {
				label: result.label,
				value: result.value
			};
		});
		res.json({success: true, data: data});
	}).catch(error => {
		res.json({error: error});
	});
});

router.delete('/delete/:label', (req, res, next) => {
    let deletePromise = Result.findOneAndRemove({label: req.params.label}).exec();
    httpUtil.handleResponsePromise(res, deletePromise);
});

module.exports = router;