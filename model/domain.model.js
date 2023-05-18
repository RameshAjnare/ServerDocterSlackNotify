const Sequelize = require('sequelize');
const sequelize = require('./configDB');
const Project =  require('./project.model');
const User = require('./user.model');

const Domain = sequelize.define('domains', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    domain_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
});
User.hasMany(Domain);
Domain.belongsTo(User);
Project.hasMany(Domain);
Domain.belongsTo(Project);

(async () => {
    await sequelize.sync({alert:true});
  })();

module.exports = Domain;