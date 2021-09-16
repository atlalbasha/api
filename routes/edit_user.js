const router = require('express').Router()
const User = require('../model/User')
const Work = require('../model/Work')

// get all users
router.get('/user', async (req, res) => {
  const user = await User.find()
  if (user.length === 0) {
    return res.status(400).send('Users Not Found')
  } else {
    res.send(user)
  }
})

// get specific user
router.get('/user/:id', async (req, res) => {
  const user = await User.findOne({ _id: req.params.id })
  if (!user) {
    return res.status(400).send('User Not Found')
  } else {
    res.send(user)
  }
})

// delete specific user
router.delete('/user/:id', (req, res) => {
  User.deleteOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(400).send('Something went wrong')
    } else {
      res.send('Successfully deleted user!')
    }
  })
})

/* router.put('/user/:id', async (req, res) => {
  var date = new Date()
  date.now

  const works = new Work({
    address: 'workes',
    startAt: date,
    endAt: date
  })
  const saved = await works.save()

  const user = await User.findOne({ _id: req.params.id })

  if (!user) {
    return res.status(400).send('User Not Found')
  } else {
    user.todo.push(saved)
    await user.save()
    res.send(user)
  }
}) */

router.put('/user/:id', (req, res) => {
  User.updateOne(
    { _id: req.params.id },
    {
      name: req.body.name,
      password: req.body.password,
      mobile: req.body.mobile
    },
    (err) => {
      if (err) {
        return res.status(400).send('Something went wrong')
      } else {
        res.send('Successfully update user!')
      }
    }
  )
})

module.exports = router
