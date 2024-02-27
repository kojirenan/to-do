const { Model, DataTypes } = require('sequelize');

class Note extends Model {
    static init(sequelize) {
        super.init(
            {
                title: DataTypes.STRING,
                description: DataTypes.STRING,
                date: DataTypes.DATE,
                done: DataTypes.BOOLEAN,
            },
            {
                sequelize,
                tableName: 'notes',
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'owner' });
    }
}

module.exports = Note;
