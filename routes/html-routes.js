// Require path
let path = require('path')
const api_helper = require('./api-helper')
const isAuthenticated = require('../config/middleware/isAuthenticated')
var _ = require('lodash')
const db = require('../models')

// Front-End Routes
module.exports = function (app) {
  // Index Route: Login page for users to login
  app.get('/', function (req, res) {
    if (req.user) {
      res.redirect('/members')
    }
    res.render('login')
  })

  // Signup Route: Sign Up Page for Users to create an account
  app.get('/login', function (req, res) {
    if (req.user) {
      res.redirect('/members')
    }
    res.render('login')
  })

  // Members Route: Page a signed in user will view
  app.get('/members', function (req, res) {
    console.log(req.query.filtered)
    db.Bookmark.findAll({
      include: [db.User]
    })
      .then(response => {
        // console.log(response)

        let newCategory = _.groupBy(response, 'category')
        const categories = Object.keys(newCategory)
        res.render('members', {
          bookmarks: newCategory,
          categories: categories
        })
      })
      .catch(error => {
        res.send(error)
      })
  })
  //route to display just the selected category
  app.get('/category', function (req, res) {
    // const category = '';

    db.Bookmark.findAll({
      include: [db.User]
    })
      .then(response => {
        // console.log(response)

        let newCategory = _.groupBy(response, 'category')
        const categories = Object.keys(newCategory)
        res.render('members', {
          bookmarks: newCategory,
          categories: categories
        })
      })
      .catch(error => {
        res.send(error)
      })
  })

  // app.get('/category', function (req, res) {
  // 	api_helper
  // 		.api_get('http://localhost:8080/api/bookmark/:category')
  // 		.then((response) => {
  // 			console.log('category response', response);

  // 			let newCategory = _.groupBy(response, 'category');
  // 			console.log(newCategory);
  // 			res.render('categories', {
  // 				bookmarks: newCategory,
  // 			});
  // 		})
  // 		.catch((error) => {
  // 			res.send(error);
  // 		});
  // });

  // app.get('/api/bookmark/:category', function (req, res) {
  // 	db.Bookmark.findAll({
  // 		where: {
  // 			category: req.params.category,
  // 		},
  // 		// include: [db.User]
  // 	}).then(function (dbBookmarks) {
  // 		res.json(dbBookmarks);
  // 	});
  // });

  // app.get('/category', function (req, res) {
  // 	const data = api_helper.api_get('/api/bookmark/:category');
  // 	return res.json(data);
  // });

  //to view a single bookmark - not currently used.
  app.delete('/api/bookmark/:id', function (req, res) {
    db.Bookmark.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbBookmark) {
      res.json(dbBookmark)
    })
  })

  app.get('/members', isAuthenticated, function (req, res) {
    res.render('members')
  })

  // making this explicit because of link on signup page to login page
  app.get('/signup', function (req, res) {
    res.render('signup')
  })
}
