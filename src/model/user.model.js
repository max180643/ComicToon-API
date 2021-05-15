module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.STRING,
      field: 'id',
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    frist_name: {
      type: DataTypes.STRING,
      field: 'frist_name',
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING,
      field: 'last_name',
      allowNull: true
    },
    image_path: {
      type: DataTypes.STRING,
      field: 'image_path',
      allowNull: true
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
      field: 'role',
      defaultValue: 'user'
    },
    dob: {
      type: DataTypes.DATE,
      field: 'dob',
      allowNull: true
    },
    coin: {
      type: DataTypes.INTEGER,
      field: 'coin',
      defaultValue: 0
    }
  })
  return User
}
