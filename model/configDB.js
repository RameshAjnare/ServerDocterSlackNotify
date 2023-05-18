const Sequelize = require("sequelize");

const sequelize = new Sequelize('server_doctor3', 'postgres', '123456', {
    host: 'localhost',
    logging : false,
    dialect: 'postgres',
   define: {
      freezeTableName : true
    }  
  });
sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});


module.exports = sequelize