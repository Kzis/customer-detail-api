module.exports = (sequelize , Datatypes) => {

    const masterSubMenu = sequelize.define('master_sub_menu',{
        sub_menu_id: {
            type : Datatypes.INTEGER,
            primaryKey: true,
        },
        key: Datatypes.STRING,
        name: Datatypes.STRING,
        createDate: Datatypes.DATE,
        updateDate: Datatypes.DATE,
        createBy: Datatypes.STRING,
        updateBy: Datatypes.STRING
    },
    {
        freezeTableName: true
    });
    masterSubMenu.associate = (models) => {
        // associations can be defined here
        masterSubMenu.belongsTo(models.ModelMapRoleMenu);
    };

    return masterSubMenu;
}