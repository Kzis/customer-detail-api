import sequelize from '../../utils/database-utils';
const Sequelize = require('sequelize');

const db = {
    ModelMasterRole: sequelize.getConnectionsORM().import('./masterRole'),
    ModelMapRoleMenu: sequelize.getConnectionsORM().import('./mapRoleMenu'),
    ModelMasterMenu: sequelize.getConnectionsORM().import('./masterMenu'),
    ModelMasterSubMenu: sequelize.getConnectionsORM().import('./masterSubMenu')
}

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

(async () => {
    await sequelize.getConnectionsORM().sync();
})();

db.sequelize = sequelize.getConnectionsORM();
db.Sequelize = Sequelize;

module.exports = db;