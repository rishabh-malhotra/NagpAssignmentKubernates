const { Router } = require('express')
const router = Router();
const fs = require('fs');
var userData
fs.readFile(__dirname + '\\users.json', 'utf-8',function(err,data){
    if(err) console.log(err)
    userData=data
    console.log(data)
});

router.get('/users/:id', async (request, response) => {

    try {
        
        let id = request.params.id;
        console.log("userId :"+id);
        response.status(200).send(userData);

    } catch (error) {
        response.status(500).send("Something went wrong!");
    }

});

module.exports = router;
