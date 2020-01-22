var express = require('express')
var router = express.Router()
const fetch = require('node-fetch')

let data = [{'id': 0,
  'title': 'Title A',
  'cat': 'Category',
  'content': 'Body A'
}, {
  'id': 1,
  'title': 'Title B',
  'cat': 'Category',
  'content': 'Body B'
}, {
  'id': 3,
  'title': 'Title C',
  'cat': 'Category',
  'content': 'Body AAA'
}]

router.get('/', function (req, res, next) {
  console.log('***\nrequest\n***')
  // res = getData('data/data.json')
  res.send(data)
})

const getData = async url => {
  try {
    const response = await fetch(url)
    // const json = await response.json()
    return response
  } catch (error) {
    return console.log(error)
  }
}

module.exports = router
