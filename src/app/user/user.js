module.exports = (sequelize, Datatypes) => {
    const user = sequelize.define(
        'user', {
        user_id: {
            type: Datatypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        employee_id: Datatypes.STRING,
        role_id: Datatypes.INTEGER,
        active: Datatypes.STRING,
        create_date: Datatypes.DATE,
        update_date: Datatypes.DATE,
        create_by: Datatypes.STRING,
        update_by: Datatypes.STRING

    },
        {
            timestamps: false,
            freezeTableName: true
        }
    );

    user.associate = (models) => {
        user.hasOne(models.ModelMasterRole);
    };

    return user;
}