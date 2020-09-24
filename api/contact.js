const express = require('express')
const router = express.Router()
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

router.post('/', (req, res) => {
  const params = req.params
  console.log(params)
  const msg = {

  }
  res.status(200).send(params)
})

module.exports = router