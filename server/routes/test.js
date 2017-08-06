const express = require('express');
const router = express.Router();
const Test = require('../models/test')
const Team = require('../models/team')
const httpUtil = require('../utils/httpUtil');

router.get('/', (req, res) => {
    res.send('api works');
});

router.post('/create', (req, res, next) => {
    let newTest = new Test({
        name: req.body.name,
        result: req.body.result,
        comment: req.body.comment,
        date: req.body.date,
        suite: req.body.suite,
        team: req.body.team,
        project: req.body.project
    });
    Test.addTest(newTest, (error, test) => {
        httpUtil.handleResponseCallback(res, error, test);
    });
});

router.post('/massCreate', (req, res, next) => {
    let tests = req.body.tests.map(test => {
        return new Test({
            name: test.name,
            result: test.result.charAt(0).toUpperCase() + test.result.slice(1),
            comment: test.comment,
            date: test.date,
            suite: test.suite,
            team: test.team,
            project: test.project
        });
    });
    Test.addTests(tests, (error, tests) => {
        httpUtil.handleResponseCallback(res, error, test);
    });
});

router.post('/massUpsert', (req, res, next) => {
    let tests = req.body.tests.forEach(test => {
        let body = {
            name: test.name,
            result: test.result.charAt(0).toUpperCase() + test.result.slice(1),
            comment: test.comment,
            date: test.date,
            suite: test.suite,
            team: test.team,
            project: test.project
        }
        Test.upsertByQuery({name:test.name},body,(error,test) => {
            if(error) {
                res.json({success:false, msg: 'Failed to create Tests', error:error});
            } 
        });
    });
    res.json({message: 'Upserted'});
});


router.get('/query', (req, res, next) => {
    let query = {};
    let limit = 5000;
    let sort = ({ _id: -1 })
    let fields = '';
    
    
    if(req.query.fields) {
        fields = JSON.parse(req.query.fields);
    }
    if(req.query.sort) {
        sort = JSON.parse(req.query.sort);
    }
    if(req.query.limit) {
        limit = parseInt(req.query.limit);
    }
    if(req.query.where) {
        query = JSON.parse(req.query.where);
        Object.keys(query).forEach(key => {
            if(!query[key]) {
              delete query[key];  
            } 
        });
        if(query.name) {
            query.name = {$regex: query.name, $options: "i"}
        }
    }
    Test.getByQuery(query,limit,sort,fields, (error, tests) => {
        if(error) {
            res.json({error: error});
        } else {
            if(req.query.distinct) {
                let key = 'name';
                if(req.query.key) {
                    key = req.query.key;
                }
                let flags = {};
                tests = tests.filter(test => {
                    if (flags[test[key]]) {
                        return false;
                    }
                    flags[test[key]] = true;
                    return true;
                });
            }
            res.json({success: true, data: tests});
        }
    })
});

router.get('/totals', (req, res, next) => {
    const RESULT_TYPES = ['Passed', 'Failed', 'Pending', 'Bug', 'Flake', 'Inactive', 'Skipped'];
    let totals = {};
    let query = {};
    let resultQuery = '';
    if (req.query.where) {
        console.log('req.query.where', req.query.where);
        query = JSON.parse(req.query.where);
    }
    if(query.result) {
        resultQuery = query.result
    } 
    Test.getByQueryPromise(query, 'result').then(tests => {
        if(resultQuery) {
            totals[resultQuery] = tests.filter(test => test.result === resultQuery).length;
            res.json(totals);
        } else {
            RESULT_TYPES.forEach(result => { 
                let resultNum = tests.filter(test => test.result === result).length;
                if(resultNum) {
                    totals[result] = resultNum;
                }
            });
            res.json(totals);
        }
        }).catch(error => {
            console.log(error);
        });
});


router.put('/update/:id', (req, res, next) => {
    let id = req.params.id;
    let body = {};
    body = httpUtil.buildBody(Test, req.body);
    Test.updateById(id, body, (error, test) => {
        httpUtil.handleResponseCallback(res, error, test);
    });
});

router.put('/updateTeamTests', (req, res, next) => {
    let query;
    if (req.query.team && JSON.parse(req.query.team)) {
        query = {
            name : JSON.parse(req.query.team)
        };
    }
    Team.getByQueryPromise(query).then(
        (teams, error) => {
        if(error) {
            res.json({error:error})
        } else {
            let teamData = teams;
            if (query) {
                teamData = teams[0];
            } else {
                let suites = [];
                teams.forEach(team => {
                    suites = [].concat.apply(suites, team.suites);
                });
                teamData.suites = suites;
            }

            let promises = teamData.suites.map((suite) => {
                let query = {
                    suite: suite
                }
                return Test.getByQueryPromise(query);
            });
            Promise.all(promises).then(value => {
                value = [].concat.apply([], value);
                value.forEach(test => {
                    let body = {
                        team: teamData.name
                    }
                    Test.upsertByQuery({name:test.name},body,(error,test) => {
                        if(error) {
                            res.json({success:false, msg: 'Failed to create Tests', error:error});
                        }
                    });
                });
                res.json(value);
            }).catch(error => {
                console.log(error);
            })
        }
    });
});

router.delete('/delete/:id', (req,res,next) => {
    let id = req.params.id;
    Test.deleteById(id, (error, test) => {
        httpUtil.handleResponseCallback(res, error, test);
    });
});

module.exports = router;