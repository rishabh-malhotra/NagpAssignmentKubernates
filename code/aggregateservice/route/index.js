const { Router } = require('express')
const router = Router();
const request = require('request');


router.get('/orderdetails/:id', async (request, response) => {

    try 
    {
        
        let id = request.params.id;
        console.log("Id for which data is requested in aggrgate service:"+id)
        
        let userData = await getUserData(id);
        let orderData = await getOrdersData(id);

        let aggregateData={
            "userDetails": JSON.parse(userData),
            "orders": JSON.parse(orderData).orders
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
   request.get(`http://${process.env.userServiceURL}/users/${id}`, function(error, response, body) {
     if (error) {
       reject(error);
       console.log(error)
     } else {
       resolve(body);
     }
   })
 })
}



const getOrdersData = (id) => {
return new Promise(function(resolve, reject) {
  request.get(`http://${process.env.orderServiceURL}/orders/${id}`, function(error, response, body) {
    if (error) {
      reject(error);
      console.log(error)
    } else {
      resolve(body);
    }
  })
})
}
module.exports = router;