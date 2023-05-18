const Sequelize = require('sequelize');
const sequelize = require('./configDB');
const User = require('./user.model')
const Project = require('./project.model')
const Domain = require('./domain.model')

const Notification = sequelize.define('sent_notification', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    slack_bot_auth_key: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slack_sign_key: {
        type: Sequelize.STRING,
        allowNull: false
    },
    channel_name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

User.hasOne(Notification);
Notification.belongsTo(User);

Project.hasOne(Notification);
Notification.belongsTo(Project);

Domain.hasOne(Notification);
Notification.belongsTo(Domain);
(async () => {
    await sequelize.sync({alert:true});
  })();

module.exports = Notification;