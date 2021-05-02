const filterComicData = (data) => {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    cover: data.cover,
    date: data.date
  }
}

const filterEpisode = (data) => {
  return {
    id: data.id,
    title: data.title,
    price: data.price,
    date: data.date
  }
}

const filterEpisodeURL = (data) => {
  return {
    id: data.id,
    path: data.path
  }
}

module.exports = {
  filterComicData,
  filterEpisode,
  filterEpisodeURL
}
