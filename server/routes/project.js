const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const httpUtil = require('../utils/httpUtil');
    
router.get('/query', (req, res, next) => {
    httpUtil.buildBody(Project, {});
    let query = httpUtil.buildWhere(req.query.where);
    httpUtil.handleResponsePromise(res, Project.getByQuery(query));
});

router.post('/create', (req,res,next) => {
    let body = httpUtil.buildBody(Project, req.body);
    let newProject = new Project(body);

    Project.addProject(newProject, (error, project) => {
        httpUtil.handleResponseCallback(res, error, project);
    });
});

router.put('/update/:label', (req, res, next) => {
    let query = {label: req.params.label};
    let body = httpUtil.buildBody(Project, req.body);
    httpUtil.handleResponsePromise(res, Project.updateByQuery(query, body));
});

router.get('/options', (req, res, next) => {
    let query = httpUtil.buildWhere(req.query.where);
    Project.getByQuery(query).then(projects => {
        let data = projects.map(project => {
            return {
                label: project.label,
                value: project.value
            }
        });
        res.json({success: true, data: data});
    }).catch(error => {
        res.json({error: error});
    });
});

router.delete('/delete/:label', (req, res, next) => {
    let deletePromise = Project.findOneAndRemove({label: req.params.label}).exec();
    httpUtil.handleResponsePromise(res, deletePromise);
});

module.exports = router;