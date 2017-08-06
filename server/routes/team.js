const express = require('express');
const router = express.Router();
const Team = require('../models/team');
const childProcess = require('child_process');
const httpUtil = require('../utils/httpUtil')
    
router.get('/query', (req, res, next) => {
    let query = {};
    if(req.query.where) {
        query = JSON.parse(req.query.where);
    };
    Team.getByQuery(query, (error, teams) => {
        if(error) {
            res.json( {error:error} )
        } else {
            res.json({success:true, data: teams})
        }
    });
});

router.get('/options', (req, res, next) => {
    let query = {};
    if(req.query.where) {
        query = JSON.parse(req.query.where);
    }
    Team.getByQuery(query, (error, teams) => {
        if(error) {
            res.json({error: error})
        } else {
            let data = teams.map(team => {
                if(team.name === 'All') {
                    return {
                        label: team.name,
                        value: ''
                    }
                } else {
                    return {
                        label: team.name,
                        value: team.name
                    }
                }
            });
            res.json({success: true, data: data});
        }
    })
})

router.post('/create', (req,res,next) => {
    let newTeam = new Team({
        name: req.body.name,
        id: req.body.id,
        slackChannel: req.body.slackChannel
    });

    Team.addTeam(newTeam, (error,team) => {
        if(error) {
            res.json({error:error})
        } else {
            res.json({success:true, data: team});
        }
    })
});

router.put('/update/:id', (req,res,next) => {
    let query = ({id: req.params.id});
    let body = httpUtil.buildBody(Team, req.body);
    console.log('body', body);

    Team.updateByQuery(query,body,(error,team) => {
        httpUtil.handleResponseCallback(res, error, team);
    });
});

router.post('/slackUpdate/:team', (req, res, next) => {
    let team = req.params.team.split(' ').join('_');
    childProcess.exec(`node ${__dirname}/../../slack/scripts/currentTeamReport.js ${team}`, (error, stdout, stderr) => {
        if(error) {
            res.json({error: error, message: stderr});
        } else {
            res.json({message: stdout});
        }
    });
});

router.post('/dailyTeamReport', (req, res, next) => {
    childProcess.exec(`node ${__dirname}/../../slack/scripts/dailyTeamReport.js`, (error, stdout, stderr) => {
        if(error) {
            res.json({error: error, message: stderr});
        } else {
            res.json({message: stdout});
        }
    });
})

module.exports = router;