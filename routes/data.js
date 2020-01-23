var express = require('express')
var router = express.Router()
const fs = require('fs')

router.get('/', (req, res, next) => {
  console.log('***\nrequest\n***')
  fs.readFile('data/search-index.json', (err, json) => {
    if (err) console.log(err)
    let obj = JSON.parse(json)
    res.send(obj)
  })
})

module.exports = router
