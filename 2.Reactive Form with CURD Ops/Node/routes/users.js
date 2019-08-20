var express = require('express');
var router = express.Router();
var db = require('../database/database');
var  Users = require('../database/database');

/* GET users listing. */
router.get('/',async function(req, res, next) {
   return res.status(200).send({
   users: await db.Users.findAll()
  });
});

router.post('/',async function(req, res, next){
  if(!req.body['firstName'] || !req.body['lastName'] || !req.body['dateOfBirth']){
    return res.status(400).send({
      message: "enter all fields"
    });
  }else{
    db.Users.create(req.body);
    return res.status(200).send({
      message: "user inserted succesfully",
      user: req.body
    });
  }
})
router.delete('/:id',async function (req, res) {
  console.log(req.params);
  
  if(req.params){
    await db.Users.destroy({
      where: {
        id: req.params.id
      }
    }).then((resp) => {
      console.log(resp);
      return res.status(200).send({
        message: 'one row deleted',
        data: req.body
      });
    
  }).catch(err=>{
    console.log(err);
    return res.status(400).send({
      message: 'Bad request'
    })
  });
    
  } else {
    res.status(404).send({
      message: 'No row found with the given sno.'
    })
  }
  
})

router.put('/',async function (req, res){
  console.log(req.body);
  if( req.body['firstName'] || req.body['lastName'] ){
    await db.Users.update(req.body,{
      where: {
        id: req.body['id']
      }
})
.then((resp) => {
  console.log(resp);
  return res.status(200).send({
    message: 'row updated',
    data: req.body
  });
}).catch(err=>{
  console.log(err);
  return res.status(400).send({
    message: 'Bad request'
  })
});   
}
else {
  res.status(404).send({
    message: 'No row updated with the given sno.'
  })
}
})

module.exports = router;
