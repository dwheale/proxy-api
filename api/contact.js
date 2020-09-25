const express = require('express')
const router = express.Router()
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

router.post('/', (req, res) => {
  const query = req.query
  const body = req.body
  const bodySize = Object.keys(body).length
  if(bodySize !== 0 && Object.keys(query).length !== 0) {
    console.log('body: ', body)
    console.log('query', query)
    res.status(400).send('Do not include both a body and query.');
    return;
  }
  let msg = {}
  if(bodySize > 0) {
    msg = {
      to: 'david@whealetech.com',
      from: 'contactme@davidwheale.com',
      subject: 'Contact from davidwheale.com',
      text: body.message,
      reply_to: body.email
    }
    delete body.email;
    delete body.message;
    for(const field in body) {
      msg.text = msg.text.concat(`\n${field}: ${body[field]}`)
    }
  } else {
    msg = {
      to: 'david@whealetech.com',
      from: 'contactme@davidwheale.com',
      subject: 'Contact from davidwheale.com',
      text: query.message,
      reply_to: query.email
    }
    delete query.email;
    delete query.message;
    for(const field in query) {
      msg.text = msg.text.concat(`\n${field}: ${query[field]}`)
    }
  }

  sgMail.send(msg, (error, result) => {
    if (error) {
      res.status(500).send(error.message)
    } else {
      res.status(202).send(result);
    }
  })
})

module.exports = router