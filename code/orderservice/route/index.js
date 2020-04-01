const { Router } = require('express')
const router = Router();
const fs = require('fs');
var ordersData;
fs.readFile(__dirname + '\\orders.json', 'utf-8',function(err,data){
    if(err) console.log(err)
    ordersData=data
    console.log(data)
});

router.get('/orders/:id', async (request, response) => {

    try 
    {
        
        let id = request.params.id;
        console.log("orderId :"+id);
        response.status(200).send(ordersData);

    }

    catch (error) {
        response.status(500).send("Something went wrong!");
    }

});

module.exports = router;