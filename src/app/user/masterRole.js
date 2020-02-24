module.exports = (sequelize, Datatypes) => {
    const masterRole = sequelize.define(
        'master_role', {
        role_id: {
            type: Datatypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: Datatypes.STRING,
        create_date: Datatypes.DATE,
        update_date: Datatypes.DATE,
        create_by:  Datatypes.STRING,
        update_by: Datatypes.STRING
    },
        {
            timestamps: false,
            freezeTableName: true
        }
    );

    masterRole.associate = (models) => {
        // associations can be defined here
        masterRole.belongsTo(models.ModelUser);
    };
    return masterRole;
}