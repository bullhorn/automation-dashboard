# CRUD
## Create
#### POST - {backendUrl}/project/create
```
{
    "label": "String that appears in the sidebar dropdowns",
    "value": "Value used for filtering",
    "sortOrder": "Number representing the order projects 
                  appear in the dropdowns"
}
```


## Read
#### GET - {backendUrl}/project/query?{urlParams}
#### URL paramaters

Param | Input | Output
---------|----------|---------
 where | MongoDB style query object | All projects that match the query

#### If no parameters are supplied all projects are returned

---

#### GET - {backendUrl}/project/options?{urlParams}
#### URL paramaters

Param | Input | Output
---------|----------|---------
 where | MongoDB style query object | All projects that match the query

#### Returns as 
```
{
    "label": "String that shows in dropdowns",
    "value": "Value used when filtering and saving"
}
```
#### If no params are supplied all projects are returned

## Update
#### PUT - {backendUrl}/project/update/{label}
#### Body - same as Create, but only updates the fields supplied in the body

## Delete
#### DELETE - {backendUrl}/project/delete/{_id}
