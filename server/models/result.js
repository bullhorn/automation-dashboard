const mongoose = require('mongoose');

const ResultSchema = mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    value: {
        type: String
    },
    sortOrder: {
        type: Number
    }
});

const Result = module.exports = mongoose.model('Result', ResultSchema);

module.exports.addResult = (newResult, callback) => {
    newResult.save(callback);
}

module.exports.getByQuery = (query) => {
    return Result.find(query).sort({sortOrder:1}).exec();
}

module.exports.updateByQuery = (query, body) => {
    return Result.findOneAndUpdate(query, body).exec();
}
