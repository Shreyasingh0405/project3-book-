// ================ imports ===========================================================================================//

const express = require('express');

const {createUser,loginUser} = require('../controllers/userController');

const {createBook,getBooks,getBookById,updateBookById,deleteBookById} = require('../controllers/bookController');

const {createReview,updateReview,deleteReview} = require('../controllers/reviewController');

const {authentication} = require('../middleware/middleware');

const router = express.Router();

// ================ user apis ===========================================================================================//

router.post('/register',createUser); 

router.post('/login',loginUser); 

// ================ book apis ===========================================================================================//

router.post('/books',authentication,createBook); 

router.get('/books',authentication,getBooks); 

router.get('/books/:bookId',authentication,getBookById); 

router.put('/books/:bookId',authentication,updateBookById); 

router.delete('/books/:bookId',authentication,deleteBookById); 

// ================ review apis ===========================================================================================//

router.post('/books/:bookId/review',createReview); 

router.put('/books/:bookId/review/:reviewId',updateReview); 

router.delete('/books/:bookId/review/:reviewId',deleteReview); 

// =========================== exports =======================================================================================//

module.exports = router;
