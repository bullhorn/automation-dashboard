const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
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

const Project = module.exports = mongoose.model('Project', ProjectSchema);

module.exports.addProject = (newProject, callback) => {
    newProject.save(callback);
}

module.exports.getByQuery = (query) => {
    return Project.find(query).sort({sortOrder:1}).exec();
}

module.exports.updateByQuery = (query, body) => {
    return Project.findOneAndUpdate(query, body).exec();
}
