module.exports = (sequelize , Datatypes) => {

    const systemConfig = sequelize.define('system_config',{
        system_id: {
            type : Datatypes.INTEGER,
            primaryKey: true,
        },
        type: Datatypes.STRING,
        key: Datatypes.STRING,
        value: Datatypes.STRING,

    },
    {
        freezeTableName: true
    });
    systemConfig.associate = (models) => {
        // associations can be defined here
        systemConfig.belongsTo(models.ModelMapRoleName);
    };

    return systemConfig;
}