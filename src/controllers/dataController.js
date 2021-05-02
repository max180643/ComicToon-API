const filterComicData = (data) => {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    cover: data.cover,
    date: data.date
  }
}

module.exports = {
  filterComicData
}
