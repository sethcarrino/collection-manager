const express = require('express');
const routes = express.Router();

const Collection = require('../models/collection');



routes.get('/', (req, res) => {
  Collection.find()

    .then(collections => res.render('listCollections', { collections: collections }))

    .catch(err => res.send('there was an error :('));
});

routes.get('/collectionForm', (req, res) => {
  if (req.query.id) {
    Collection.findById(req.query.id)
      .then(collection => res.render('collectionForm', { collection: collection }));
  } else {
    res.render('collectionForm');
  }
});

routes.post('/saveCollection', (req, res) => {
  if (req.body.id) {
      Collection.findByIdAndUpdate(req.body.id, req.body, { upsert: true })

      .then(() => res.redirect('/'))
    } else {
      new Collection(req.body)
        .save()
        // then redirect to the homepage
        .then(() => res.redirect('/'))
        // catch validation errors
        .catch(err => {
          console.log(err);
          res.render('collectionForm', {
            errors: err.errors,
            collection: req.body
          });
        });
    }


  // Collection.findByIdAndUpdate(req.body.id, req.body, { upsert: true })
  //   .then(() => res.redirect('/'))
  //
  //   .catch(err => {
  //     console.log(err);
  //     res.render('collectionForm', {
  //       errors: err.errors,
  //       collection: req.body
  //     });
  //   });
});

routes.get('/deleteCollection', (req, res) => {
  Collection.findById(req.query.id)
    .remove()

    .then(() => res.redirect('/'));
});

module.exports = routes;
