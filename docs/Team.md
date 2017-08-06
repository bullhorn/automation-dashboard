# CRUD
## Create
#### POST - {backendUrl}/team/create
```
{
    "id": 1,
    "name": "Name of the team",
    "slackChannel": "Team's slack channel",
    "suites": Array of suites the team owns,
    "sortOrder": "Number representing the order teams 
                  appear in the dropdowns"
}
```

## Read
#### GET - {backendUrl}/team/query?{urlParams}
#### URL paramaters

Param | Input | Output
---------|----------|---------
 where | MongoDB style query object | All teams that match the query

#### If no parameters are supplied all Teams are returned

---

#### GET - {backendUrl}/team/options?{urlParams}
#### URL paramaters

Param | Input | Output
---------|----------|---------
 where | MongoDB style query object | All teams that match the query

#### Returns as 
```
{
    "label": "String that shows in dropdowns",
    "value": "Value used when filtering and saving"
}
```
#### If no params are supplied all Teams are returned

## Update
#### PUT - {backendUrl}/team/update/{_id}
#### Body - same as Create, but only updates the fields supplied in the body

## Delete
#### DELETE - {backendUrl}/team/delete/{_id}
