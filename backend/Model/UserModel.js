const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('reader', 'admin', 'author'),
    allowNull: false,
    defaultValue: 'reader'
  },
  isBlocked: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});
User.getUserNameById = async function (userId) {
  try {
    const user = await this.findByPk(userId);
    if (!user) {
      return null;
    }
    return user.name;
  } catch (error) {
    console.error(error);
    return null;
  }
};
module.exports = User;
