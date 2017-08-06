# CRUD
## Create
#### POST - {backendUrl}/test/create
```
{
    "name": "Test Name",
    "result": "Passed",
    "suite": "Name of Jasmine suite",
    "date": "UNIX Timestamp",
    "project": "Name of project this test lives in",
    "team": "Name of the team that owns this test"
} 
```
## Mass Create
#### POST - {backendUrl}/test/massCreate
```
{
    "tests": Array of create bodies
}
```

## Mass Upsert
#### POST - {backendUrl}/test/massUpsert
#### Body - same as Mass Create
#### Usage - Updates tests and pushes the last result to a lastResults array on the test if it exists. Creates the test if it does not already exist

## Read
#### GET - {backendURL}/test/query?{urlParameters}
#### URL Parameters
Parameter | Input | Output
---------|----------|---------
 where | MongoDB style query object | Returns everything matching the supplied query
 sort | MongoDB style sort object | Orders the data according to the supplied sort object
 fields | MongoDB style select object | Filters the data based on the supplied fields object
 limit | Number | Limits the amount of data returned

## Update
#### PUT - {backendURL}/test/update/{_id}
* Body same as Create and only updates the fields supplied

## Delete
#### DELETE - {backendURL}/test/update/{_id}
* Deletes the test matching the supplied id

# Services
## Totals 
#### GET - {backendURL}/test/totals
#### URL Parameters

Parameter | Input | Output
---------|----------|---------
 where | MongoDB style query object | Total amount of tests broken up by result that match the query
 result | One result you care about | Total amount of tests with that given result

## Sync Team Tests
#### PUT - {backendURL}/test/updateTeamTests
#### Body
```
{
    "name": "Name of Team you want to sync"
}
```
#### Usage - Loops through all of the suites assigned to the input team and sets all of the tests with those suites to be assigned to that team. 