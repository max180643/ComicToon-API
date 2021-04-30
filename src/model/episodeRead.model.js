module.exports = (sequelize, DataTypes) => {
  const EpisodeRead = sequelize.define('episodeRead', {
    id: {
      type: DataTypes.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    episode_id: {
      type: DataTypes.INTEGER,
      field: 'episode_id',
      allowNull: false
    }
  })
  return EpisodeRead
}
