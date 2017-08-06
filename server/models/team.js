const mongoose = require('mongoose');

const TeamSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    suites: {
        type: Array
    },
    slackChannel: {
        type: String,
        unique: true
    },
    sortOrder: {
        type: Number
    },
    dailyResults: {
        type: Object
    }
});

const Team = module.exports = mongoose.model('Team', TeamSchema);

module.exports.addTeam = (newTeam, callback) => {
    newTeam.save(callback);
}

module.exports.getByQuery = (query, callback) => {
    Team.find(query, callback).sort({id: 1});
}

module.exports.getByQueryPromise = (query) => {
    Object.keys(query).forEach(key => {
        if(!query[key]) {
            delete query[key];  
        } 
    });
    if(query.name) {
        query.name = {$regex: query.name, $options: "i"}
    }
    return Team.find(query).sort({id: 1}).exec();
}

module.exports.updateByQuery = (query, body, callback) => {
    Team.findOneAndUpdate(query, body, callback);
}