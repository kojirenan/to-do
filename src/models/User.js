const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                email: DataTypes.STRING,
                password: DataTypes.STRING,
            },
            {
                sequelize,
                tableName: 'users',
            }
        );
    }

    static associate(models) {
        this.hasMany(models.Note, { foreignKey: 'user_id', as: 'notes' });
    }
}

module.exports = User;
