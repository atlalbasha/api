const router = require('express').Router()
const User = require('../model/User')
const Work = require('../model/Work')

// get all woks
router.get('/work', (req, res) => {
  Work.find((err, work) => {
    if (err) {
      return res.status(400).send('works Not Found')
    } else {
      res.send(work)
    }
  })
})

// get specific work
router.get('/work/:id', (req, res) => {
  Work.findOne({ _id: req.params.id }, (err, work) => {
    if (err) {
      return res.status(400).send('work Not Found')
    } else {
      res.send(work)
    }
  })
})

// delete specific work
router.delete('/work/:id', (req, res) => {
  Work.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      return res.status(400).send('Something went wrong')
    } else {
      res.send('Successfully deleted work!')
    }
  })
})

router.put('/work/:id', (req, res) => {
  Work.updateOne(
    { _id: req.params.id },
    {
      address: req.body.address,
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,
      start: req.body.start,
      end: req.body.end
    },
    (err) => {
      if (err) {
        return res.status(400).send('Something went wrong')
      } else {
        res.send('Successfully update work!')
      }
    }
  )
})

module.exports = router
