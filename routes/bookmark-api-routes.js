const db = require('../models')

module.exports = function (app) {
  //* GET route for getting all of the bookmarks
  app.get('/api/bookmark', function (req, res) {
    // console.log(`testVals: ${testVals}`)
    // console.log('line12',testObj.passport.user.id)

    if (req.query.user_id) {
      query.UserId = req.query.user_id
    }

    db.Bookmark.findAll({
      include: [db.User]
    }).then(function (dbBookmark) {
      // console.log("Bookmark response line 22", db.Bookmark)
      res.json(dbBookmark)
    })
  })

  //* Get route for retrieving a single post-- NOT USING
  app.get('/api/bookmark/:id', function (req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    db.Bookmark.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function (dbBookmark) {
      res.json(dbBookmark)
    })
  })

  //* GET rout to get all bookmarks within a specific category.
  app.get('/category', function (req, res) {
    console.log('PARAMS', req.params)
    db.Bookmark.findAll({
      where: {
        category: req.params.category
      }
      // include: [db.User]
    }).then(function (dbCategory) {
      res.json(dbCategory)
    })
  })

  //* POST route for saving a new bookmark
  app.post('/api/bookmark', function (req, res) {
    // console.log(req.body);

    db.Bookmark.create({
      category: req.body.category,
      keyword: req.body.keyword,
      url: req.body.url,
      UserId: req.user.id
    }).then(function (dbBookmark) {
      res.json(dbBookmark)
      // add a .catch
    })
  })

  //**PUT update Route
  app.put('/api/bookmark/:id', function (req, res) {
    db.Bookmarks.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function (dbBookmark) {
      res.json(dbBookmark)
    })
  })
}
