// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
//const faculties = require("../models/faculties");

// define the faculty model
let faculties = require('../models/faculties');

/* GET faculties List page. READ */
router.get('/', (req, res, next) => {
  // find all faculties in the faculties collection
  faculties.find((err, faculties) => {
    if (err) {
      return console.error(err);
    } else {
      res.render('faculties/index', {
        title: 'Faculties',
        faculties: faculties,
      });
    }
  });
});

//  GET the faculty Details page in order to add a new faculty
router.get('/add', (req, res, next) => {

  res.render('faculties/details', { title: 'Add Faculties', faculties:''})
});/////////////

// POST process the faculty  Details page and create a new faculty  - CREATE
router.post('/add', (req, res, next) => {

  let newFaculties = faculties({
    "facultiesname": req.body.facultiesname,
    "department": req.body.department,
    "subject": req.body.subject,
    "facultyid": req.body.facultyid,
    
  });

  faculties.create(newFaculties, (err, faculties) =>{
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else
    {
        // refresh the book list
        res.redirect('/faculties');
    }
});

  /*****************
   * ADD CODE HERE *
   *****************/
});

// GET the faculty  Details page in order to edit an existing faculty
router.get('/:id', (req, res, next) => {

  let id = req.params.id;

  faculties.findById(id, (err, facultiesToEdit) => {
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else
    {
        //show the edit view
        res.render('faculties/edit', {title: 'Edit Faculties', faculties: facultiesToEdit})
    }
 });
  /*****************
   * ADD CODE HERE *
   *****************/
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
  let id = req.params.id;

  let updateFaculties = faculties({
    _id: id,
    facultiesname: req.body.facultiesname,
    department: req.body.department,
    subject: req.body.subject,
    facultyid: req.body.facultyid,

  });

  faculties.updateOne({_id: id}, updateFaculties, (err) => {
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else
    {
        // refresh the book list
        res.redirect('/faculties');
    }
 });

  /*****************
   * ADD CODE HERE *
   *****************/
});

// GET - process the delete
router.get('/delete/:id', (req, res, next) => {

  let id = req.params.id;

  faculties.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the book list
             res.redirect('/faculties');
        }
    });
  /*****************
   * ADD CODE HERE *
   *****************/
});

module.exports = router;
