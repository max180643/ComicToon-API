module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      field: 'id',
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    frist_name: {
      type: DataTypes.STRING,
      field: 'frist_name'
    },
    last_name: {
      type: DataTypes.STRING,
      field: 'last_name'
    },
    image_path: {
      type: DataTypes.STRING,
      field: 'image_path'
    },
    email: {
      type: DataTypes.STRING,
      field: 'email',
      validate: {
        isEmail: true
      },
      allowNull: false,
      unique: true
    },
    role: {
      type: DataTypes.STRING,
      field: 'role'
    },
    dob: {
      type: DataTypes.DATE,
      field: 'dob'
    },
    coin: {
      type: DataTypes.INTEGER,
      field: 'coin'
    }
  })
  return User
}
