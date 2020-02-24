import sequelize from '../../utils/database-utils';
const Sequelize = require('sequelize');

const db = {
    ModelUser: sequelize.getConnectionsORM().import('./user'),
    ModelMasterRole: sequelize.getConnectionsORM().import('./masterRole')
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