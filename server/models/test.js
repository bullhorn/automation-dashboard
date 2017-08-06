const mongoose = require('mongoose');

const TestSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    result: {
        type: String,
        required: true
    },
    comment: {
        type: String
    },
    date: {
        type: Number,
        required: true
    },
    suite: {
        type: String
    },
    team: {
        type: String
    },
    pastResults: {
        type: Array
    },
    project: {
        type: String
    }
});

const Test = module.exports = mongoose.model('Test', TestSchema);

module.exports.addTest = (newTest, callback) => {
    newTest.save(callback);
}

module.exports.getByQuery = (query, limit, sort, fields, callback) => {
    Test.find(query, callback).limit(limit).sort(sort).select(fields);
}

module.exports.getByQueryPromise = (query, fields) => {
    Object.keys(query).forEach(key => {
        if(!query[key]) {
            delete query[key];
        }
    });
    if(query.name) {
        query.name = {$regex: query.name, $options: "i"};
    }
    if(fields) {
        return Test.find(query).select(fields).exec();
    } else {
        return Test.find(query).exec();
    }
}

module.exports.addTests = (newTests, callback) => {
    Test.insertMany(newTests, callback);
}

module.exports.updateById = (id, body, callback) => {
    Test.findByIdAndUpdate(id, body, callback);
}

module.exports.deleteById = (id, callback) => {
    Test.findByIdAndRemove(id, callback);
}

module.exports.aggregateCounts = (aggregations) => {
    return Test.aggregate(aggregations).exec();
}

module.exports.upsertByQuery = (query, body, callback) => {
    Test.findOne(query, (error, test) => {
        if(error) console.log(error);
        if(test) {
            if(body.result === 'Failed') {
                Test.findById(test._id, (error, newTest) => {
                    if(newTest && newTest.result === 'Bug') {
                        let resultsBody = {
                            result: test.result,
                            date: test.date
                        };
                        body.result = 'Bug';
                        test.pastResults.push(resultsBody);
                        Object.assign(test, body);
                        Test.findByIdAndUpdate(test._id, test, callback);
                    } else {
                        let resultsBody = {
                            result: test.result,
                            date: test.date
                        };
                        test.pastResults.push(resultsBody);
                        Object.assign(test, body);
                        Test.findByIdAndUpdate(test._id, test, callback);
                    }
                });
            } else {
                let resultsBody = {
                    result: test.result,
                    date: test.date
                };
                test.pastResults.push(resultsBody);
                Object.assign(test, body);
                Test.findByIdAndUpdate(test._id, test, callback);
            }
        } else {
            let newTest = new Test(body);
            newTest.save(callback);
        }
    });
}

