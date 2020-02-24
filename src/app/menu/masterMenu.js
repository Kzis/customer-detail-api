module.exports = (sequelize , Datatypes) => {

    const masterMenu = sequelize.define('master_menu',{
        menu_id: {
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
    masterMenu.associate = (models) => {
        // associations can be defined here
        masterMenu.belongsTo(models.ModelMapRoleName);
    };

    return masterMenu;
}