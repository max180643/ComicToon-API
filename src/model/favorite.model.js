module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('favorite', {
    id: {
      type: DataTypes.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    book_id: {
      type: DataTypes.INTEGER,
      field: 'book_id',
      allowNull: false
    }
  })
  return Favorite
}
