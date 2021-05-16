const router = require('express').Router()
const db = require('../util/db.config')
const sequelize = db.sequelize
const User = db.user
const Favorite = db.favorite
const EpisodeRead = db.episodeRead
const EpisodeBuy = db.episodeBuy

// Get all users
router.get('/get/all', async (req, res) => {
  const users = await User.findAll()
  // const users = await User.findAll({
  //   include: ['favorite', 'episodeRead', 'episodeBuy']
  // })
  res.status(200).send({
    status: 'success',
    response: users || 'users not found.'
  })
})

// Get user with id
router.get('/get/:id', async (req, res) => {
  const userId = req.params.id
  let user = null

  if (userId) {
    user = await User.findByPk(userId)
    // user = await User.findByPk(userId, {
    //   include: ['favorite', 'episodeRead', 'episodeBuy']
    // })
  }

  res.status(200).send({
    status: 'success',
    response: user || 'user not found.'
  })
})

// Create user
router.post('/create', async (req, res) => {
  const user = req.body
  let newUser = null

  if (user) {
    newUser = await sequelize.transaction((t) => {
      return User.create(user, { transaction: t })
    })
  }

  res.status(201).send({
    status: 'success',
    response: newUser || 'user not create.'
  })
})

// Update user with id
router.put('/update/:id', async (req, res) => {
  const userData = req.body
  const userId = req.params.id
  let updateUser = null

  if (userId && userData) {
    updateUser = await sequelize.transaction((t) => {
      return User.update(
        userData,
        { where: { id: userId } },
        { transaction: t }
      )
    })
  }

  res.status(200).send({
    status: 'success',
    response: updateUser[0] === 1 ? 'user update.' : 'user not update.'
  })
})

// Topup coin with id
router.post('/topup/:id', async (req, res) => {
  const coin = {
    price29: 100,
    price79: 300,
    price129: 500,
    price189: 1000,
    price399: 1500
  }

  const userId = req.params.id
  const userData = req.body
  let user = null
  let updateUser = []
  let currentCoin = null

  if (userId) {
    user = await User.findByPk(userId)
    currentCoin = user.coin
  }

  if (coin[userData.package]) {
    updateUser = await sequelize.transaction((t) => {
      return User.update(
        {
          coin: currentCoin + coin[userData.package]
        },
        { where: { id: userId } },
        { transaction: t }
      )
    })
  }

  res.status(200).send({
    status: 'success',
    response: updateUser[0] === 1 ? 'coin added.' : 'coin not added.'
  })
})

// Delete user with id
router.delete('/delete/:id', async (req, res) => {
  const userId = req.params.id
  let userDestroy = null

  if (userId) {
    const user = await User.findByPk(userId)
    if (user) {
      userDestroy = await user.destroy()
    }
  }

  res.status(200).send({
    status: 'success',
    response: userDestroy || 'delete user fail.'
  })
})

// Add favorite book
router.post('/favorite/add', async (req, res) => {
  const favorite = req.body
  let newFavorite = null

  if (favorite) {
    newFavorite = await sequelize.transaction((t) => {
      return Favorite.create(favorite, { transaction: t })
    })
  }

  res.status(201).send({
    status: 'success',
    response: newFavorite || 'favorite not add.'
  })
})

// Get all favorite book with userId
router.get('/favorite/get/:id', async (req, res) => {
  const userId = req.params.id
  let favorite = null

  if (userId) {
    favorite = await Favorite.findAll({ where: { userId: userId } })
  }

  res.status(200).send({
    status: 'success',
    response: favorite || 'favorite not found.'
  })
})

// Delete favorite book
router.delete('/favorite/delete/:id', async (req, res) => {
  const favoriteId = req.params.id
  let favoriteDestroy = null

  if (favoriteId) {
    const favorite = await Favorite.findByPk(favoriteId)
    if (favorite) {
      favoriteDestroy = await favorite.destroy()
    }
  }

  res.status(200).send({
    status: 'success',
    response: favoriteDestroy || 'delete favorite fail..'
  })
})

// Add read episode
router.post('/episode/add/read', async (req, res) => {
  const episodeRead = req.body
  let newEpisodeRead = null

  if (episodeRead) {
    newEpisodeRead = await sequelize.transaction((t) => {
      return EpisodeRead.create(episodeRead, { transaction: t })
    })
  }

  res.status(201).send({
    status: 'success',
    response: newEpisodeRead || 'read episode not add.'
  })
})

// Get all read episode with userId
router.get('/episode/get/read/:id', async (req, res) => {
  const userId = req.params.id
  let episode = null

  if (userId) {
    episode = await EpisodeRead.findAll({ where: { userId: userId } })
  }

  res.status(200).send({
    status: 'success',
    response: episode || 'favorite not found.'
  })
})

// Add buy episode
router.post('/episode/add/buy', async (req, res) => {
  const episodeBuy = req.body
  let newEpisodeBuy = null

  if (episodeBuy) {
    newEpisodeBuy = await sequelize.transaction((t) => {
      return EpisodeBuy.create(episodeBuy, { transaction: t })
    })
  }

  res.status(201).send({
    status: 'success',
    response: newEpisodeBuy || 'buy episode not add.'
  })
})

// Get all buy episode with userId
router.get('/episode/get/buy/:id', async (req, res) => {
  const userId = req.params.id
  let episode = null

  if (userId) {
    episode = await EpisodeBuy.findAll({ where: { userId: userId } })
  }

  res.status(200).send({
    status: 'success',
    response: episode || 'favorite not found.'
  })
})

module.exports = router
