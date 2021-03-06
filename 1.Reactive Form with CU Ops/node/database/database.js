const Sequelize = require('sequelize');


const sequelize = new Sequelize('goodname', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

const  Users = sequelize.define('records',{
   id:{
     type: Sequelize.INTEGER,
     primaryKey: true

   } ,
  firstName: {
        type: Sequelize.STRING,
        allowNull: false,  
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
    

},{
    timestamps: false
});

module.exports = { connection:function(){
    sequelize
    .authenticate()
    .then(() =>{
        console.log('connection has been stablished');
    })
    .catch(err =>{
        console.log('unable to connect to the data base:' ,err);
    });
},
Users
};