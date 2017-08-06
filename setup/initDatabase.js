let rp = require('request-promise');
let config = require('./config');

const initResults = (backendURL) => {
    return config.results.map(result => {
        return rp.post(`${backendURL}/result/create`, {body: result, json: true});
    });
};

const initTeams = (backendURL) => {
    return config.teams.map(team => {
        return rp.post(`${backendURL}/team/create`, {body: team, json: true});
    });
};

const initProjects = (backendURL) => {
    return config.projects.map(project => {
        return rp.post(`${backendURL}/project/create`, {body: project, json: true});
    });
};

const initTests = (backendURL) => {
    return config.tests.map(test => {
        return rp.post(`${backendURL}/test/create`, {body: test, json: true});
    });
};

const getPromises = (backendURL) => {
    let results = initResults(backendURL);
    let teams = initTeams(backendURL);
    let projects = initProjects(backendURL);
    let tests = initTests(backendURL);
    return results.concat(teams, projects, tests);
}

if (!config.backendURL) {
    console.error('In order to run this script you need to provide the url to your backend in the config.json');
} else {
    const backendURL = config.backendURL

    Promise.all(getPromises(backendURL)).then(res => {
        console.log(`All of your data was inserted via ${backendURL}`);
    }).catch(error => {
        console.error(error.message);
    });
}


