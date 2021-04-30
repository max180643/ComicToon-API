module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      field: 'id',
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    frist_name: {
      type: Sequelize.STRING,
      field: 'frist_name'
    },
    last_name: {
      type: Sequelize.STRING,
      field: 'last_name'
    },
    image_path: {
      type: Sequelize.STRING,
      field: 'image_path'
    },
    email: {
      type: Sequelize.STRING,
      field: 'email',
      validate: {
        isEmail: true
      },
      allowNull: false,
      unique: true
    },
    role: {
      type: Sequelize.STRING,
      field: 'role'
    },
    dob: {
      type: Sequelize.DATE,
      field: 'dob'
    },
    coin: {
      type: Sequelize.INTEGER,
      field: 'coin'
    }
  })
  return User
}
