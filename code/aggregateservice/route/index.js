const { Router } = require('express')
const router = Router();
const request = require('request');


router.get('/orderdetails/:id', async (request, response) => {

    try 
    {
        
        let id = request.params.id;
        console.log(id)
        
        let userDetails = await getUserData(id);
        let orderDetails = await getOrdersData(id);

        let aggregateData={
            "userDetails": JSON.parse(userDetails),
            "orders": JSON.parse(orderDetails).orders
        };            
        response.status(200).send(aggregateData);
    }
    catch (error) 
    {
        console.log(error)
        response.status(500).send("Something went wrong!");
    }

});

const getUserData = (id) => {
 return new Promise(function(resolve, reject) {
   request.get(`http://localhost:61550/users/${id}`, function(error, response, body) {
     if (error) {
       reject(error);
     } else {
       resolve(body);
     }
   })
 })
}

const getOrdersData = (id) => {
return new Promise(function(resolve, reject) {
  request.get(`http://localhost:61551/orders/${id}`, function(error, response, body) {
    if (error) {
      reject(error);
    } else {
      resolve(body);
    }
  })
})
}
module.exports = router;