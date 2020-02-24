module.exports = (sequelize, Datatypes) => {
    const mapRoleName = sequelize.define('map_role_menu', {
        map_role_id:{
            type : Datatypes.INTEGER,
            primaryKey: true,
        },
        roleId: Datatypes.INTEGER,
        menuId: Datatypes.INTEGER,
        subMenuId: Datatypes.INTEGER,
        is_admin: Datatypes.INTEGER,
        createDate: Datatypes.DATE,
        updateDate: Datatypes.DATE,
        createBy: Datatypes.INTEGER,
        updateBy: Datatypes.INTEGER
    },
        {
            freezeTableName: true
        });

    mapRoleName.associate = (models) => {
        mapRoleName.hasOne(models.ModelMasterSubMenu);
        mapRoleName.hasOne(models.ModelMasterMenu);
        mapRoleName.hasOne(models.ModelSystemConfig);
    };

    return mapRoleName;
}