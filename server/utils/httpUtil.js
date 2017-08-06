module.exports.handleResponsePromise = (res, promise) => {
    promise.then(data => {
        res.json({ success: true, data: data });
    }).catch(error => {
        res.json({ error: error });
    });
};

module.exports.handleResponseCallback = (res, error, data) => {
    if(error) {
        res.json({error:error})
    } else {
        res.json({success:true, data: data});
    }
};

module.exports.buildWhere = (where) => {
    return where ? JSON.parse(where) : {};
};

module.exports.buildBody = (model, body) => {
    let possibleFields = Object.keys(model.schema.obj);
    let returnBody = {};
    possibleFields.forEach(field => {
        if(body[field]) {
            returnBody[field] = body[field]
        }
    });
    return returnBody;
};