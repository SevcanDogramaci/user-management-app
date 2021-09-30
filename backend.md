# Backend REST API
## Get Users
`GET` /users

Use this endpoint to get all users.

**Request Sample**  
`GET http://localhost:8080/users`

**Response Sample**
 ```
 HTTP/1.1  200 OK Content-Type: application/json
[
	{
		"id": "12345",
		"name": "Sevcan",
		"surname": "Doğramacı"
	},
	{
		"id": "12346",
		"name": "Ziya",
		"surname": "Doğramacı"
	}
]
```

## Get User
`GET` /user/{id}

Use this endpoint to get a user with the UserID.

<ins>**URL Params**</ins>
| Parameter| Description            |
| :---     | :----                  |
| id       | The id defined by user.| 

**Request Sample**  
`GET http://localhost:8080/user/12345`

**Response Sample**
```
HTTP/1.1  200 OK Content-Type: application/json
{
	"id": "12345",
	"name": "Sevcan",
	"surname": "Doğramacı"
}
```

## Create User
`POST` /user

Use this endpoint to create a user.

<ins>**Request Data**</ins>
| Parameter | Description            |
| :---      | :---                   |
| id	    | The id defined by user.| 
| name	    | User's name.           | 
| surname   | User's surname.        | 

**Request Sample**  
`POST http://localhost:8080/user`
```json
{
	"id": "12345",
	"name": "Sevcan",
	"surname": "Doğramacı"
}
```
**Response Sample**

`HTTP/1.1  204 OK `

## Update User
`PUT` /user/{id}

Use this endpoint to update a user with the UserID. 

<ins>**URL Params**</ins>
| Parameter| Description            |
| :---     | :----                  |
| id       | The id defined by user.| 

<ins>**Request Data**</ins>
| Parameter | Description            |
| :---      | :---                   |
| id	    | The id defined by user.| 
| name	    | User's name.           | 
| surname   | User's surname.        | 

**Request Sample**  
`PUT http://localhost:8080/user/12345`
```json
{
	"id": "12346",
	"name": "Sevcan",
	"surname": "Doğramacı"
}
```
**Response Sample** (Returns updated user)
```
HTTP/1.1  200 OK Content-Type: application/json
{
	"id": "12346",
	"name": "Sevcan",
	"surname": "Doğramacı"
}
```
## Delete User
`DELETE` /user/{id}

Use this endpoint to delete a user with the UserID.

<ins>**URL Params**</ins>
| Parameter| Description            |
| :---     | :----                  |
| id       | The id defined by user.| 

**Request Sample**  
`DELETE http://localhost:8080/user/12345`

**Response Sample** 

`HTTP/1.1  204 OK `

## Error Responses
Error messages are accessible through **error** field of the response.

**Error Response Sample** 
```
HTTP/1.1  400 Bad Request 
{
	"error": "invalid input"
}
```
