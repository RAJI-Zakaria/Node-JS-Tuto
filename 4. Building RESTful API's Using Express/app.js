//RESTFul api/services
//==> REST = Representational State Transfer was introduced by a PHD student
//==> CRUD Operations : Create, Read, update, Delete

// Ex : https://website.com/api/customers

//==============================>

//Read :  Get Customers :
//GET /api/customers
//===> response :
/* Array of customers
[
{
id:1, name:"zak"
},
{
id:2, name:"mac"
}
...
]
 */


//==============================>

//Read :  Get A Customer :
//GET /api/customer/1
//===> response :
/* object of customer
{
id:1, name:"zak"
}
 */


//==============================>

//Update : PUT A Customer :
//PUT /api/customer/1
//===>Request :
//{name:'new name'}
//===> response :
/* object of customer
{
id:1, name:"new name"
}
 */



//==============================>

//Delete : delete A Customer :
//delete /api/customer/1


//==============================>

//Create :  POST A Customer :
//POST /api/customer
//===> request :
/* object of customer
{
    name:"new-zak"
}
 */








//
// GET/api/customers
// GET/api/customers/1
// PUT/api/customers/1
// DELETE/api/customers/1
// POST/api/customers
//

