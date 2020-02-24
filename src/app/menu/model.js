import sequelize from '../../utils/database-utils';
const Sequelize = require('sequelize');

const db = {
    ModelMapRoleName: sequelize.getConnectionsORM().import('./mapRoleMenu'),
    ModelMasterMenu: sequelize.getConnectionsORM().import('./masterMenu'),
    ModelMasterSubMenu: sequelize.getConnectionsORM().import('./masterSubMenu'),
    ModelSystemConfig: sequelize.getConnectionsORM().import('./systemConfig'),
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