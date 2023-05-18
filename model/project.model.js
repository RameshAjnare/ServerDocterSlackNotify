const Sequelize = require('sequelize');
const sequelize = require('./configDB');
const User = require('./user.model')
const Project = sequelize.define('project_info', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    project_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

User.hasMany(Project)
Project.belongsTo(User);

(async () => {
    await sequelize.sync({alert:true});
  })();

module.exports = Project;