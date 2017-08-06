# CRUD
## Create
#### POST - {backendUrl}/result/create
```
{
    "label": "String that appears in the sidebar dropdowns",
    "value": "Value used for filtering",
    "sortOrder": "Number representing the order results 
                  appear in the dropdowns"
}
````

## Read
#### GET - {backendUrl}/result/query?{urlParams}
#### URL paramaters

Param | Input | Output
---------|----------|---------
 where | MongoDB style query object | All results that match the query

#### If no parameters are supplied all results are returned

---

#### GET - {backendUrl}/result/options?{urlParams}
#### URL paramaters

Param | Input | Output
---------|----------|---------
 where | MongoDB style query object | All results that match the query

#### Returns as 
```
{
    "label": "String that shows in dropdowns",
    "value": "Value used when filtering and saving"
}
```
#### If no params are supplied all results are returned

## Update
#### PUT - {backendUrl}/result/update/{label}
#### Body - same as Create, but only updates the fields supplied in the body

## Delete
#### DELETE - {backendUrl}/result/delete/{_id}
