const router = require('express').Router()
const db = require('../util/db.config')
const sequelize = db.sequelize
const User = db.user

// Get all users
router.get('/all', async (req, res) => {
  const users = await User.findAll()
  res.status(200).send({
    status: 'success',
    response: users
  })
})

// Get user with id
router.get('/:id', async (req, res) => {
  const userId = req.params.id

  if (userId) {
    user = await User.findByPk(userId)
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
    response: updateUser === 1 ? 'user update.' : 'user not update.'
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
    response: userDestroy
  })
})

module.exports = router
