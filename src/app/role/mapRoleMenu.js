module.exports = (sequelize, Datatypes) => {
    const mapRoleMenu = sequelize.define(
        'map_role_menu', {
            map_role_id: {
            type: Datatypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        role_id: Datatypes.INTEGER,
        menu_id: Datatypes.INTEGER,
        sub_menu_id: Datatypes.INTEGER,
        api_id: Datatypes.INTEGER,
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

    mapRoleMenu.associate = (models) => {
        mapRoleMenu.hasOne(models.ModelMasterRole);
        mapRoleMenu.hasOne(models.ModelMasterMenu);
        mapRoleMenu.hasOne(models.ModelMasterSubMenu);
    };

    return mapRoleMenu;
}