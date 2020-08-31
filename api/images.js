const express = require('express')
const router = express.Router()
const axios = require('axios')
const cheerio = require('cheerio')

// services that can be scraped
const serviceTypes = {
  PRNT_SC: 'prnt.sc'
}

// asynchronous function to get html from data source
const getHTML = async (address) => {
  const result = await axios.get(address)
  return result.data
}

// function to parse images from print.sc
const parsePrint_scImages = (html) => {
  let images = []
  const $ = cheerio.load(html)
  $('img').each((i, element) => {
    // img located at element.attribs.src
    // the second ensures that the image hasn't been removed
    if (element.attribs.class === 'no-click screenshot-image' &&
        element.attribs.src.substring(0, 2) !== '//') {
      images.push(element.attribs.src)
    }
  })
  return images
}

router.get('/', (req, res) => {
  const address = req.body.address
  const service = req.body.service

  // check which service is in use and extract the appropriate images
  switch (service) {
    case serviceTypes.PRNT_SC: {
      // Load HTML
      getHTML(address)
          .then(html => {
            // parse the images from the html
            let images = parsePrint_scImages(html)
            res.status(200).send(images)
          })
          .catch(error => {
            res.status(500).send(error)
          })
    }

  }
  res.set('Content-Type', 'text/json')
})

module.exports = router