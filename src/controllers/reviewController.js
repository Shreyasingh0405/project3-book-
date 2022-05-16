//================ imports ===============================//

const bookModel = require('../models/bookModel');

const reviewModel = require('../models/reviewModel');

const validators = require('../validators/validator');

//================ POST /books/:bookId/review route handler ===============================//

const createReview = async function(req,res)
{
    try
    {
        if(!validators.isValidRequestBody(req.body))
            return res.status(400).send({status : false, message : "Invalid request body. Please provide review details."});
        
        if(req.params.bookId==undefined)
            return res.status(400).send({status : false, message : "bookId is required."});
        
        const bookId = req.params.bookId;
        
        if(!validators.isValidObjectId(bookId))
            return res.status(400).send({status : false, message : "The given bookId is not a valid ObjectId."})
        
        let bookExists = await bookModel.findOne({_id : bookId, isDeleted : false});
        
        if(!bookExists)
            return res.status(404).send({status : false, message : "Book not found!"});
        
        let {review,rating,reviewedBy} = req.body;

        if(!validators.isValidField(rating))
            return res.status(400).send({status : false, message : "rating is required."});
        
        if(!(/[1-5]/.test(rating)))
            return res.status(400).send({status : false, message : "rating should be a number from 1 to 5."});
 
        const reviewData = {bookId,reviewedBy,reviewedAt : new Date(),rating,review};

        if(review==undefined)
            delete reviewData.review;

        const newReview = await reviewModel.create(reviewData);
        
        const updatedBook = await bookModel.findOneAndUpdate({_id : bookId, isDeleted : false},{$inc : {reviews : 1}},{new : true});

        return res.status(201).send({status : true,message : "Review created successfully.", data : {...updatedBook.toObject(),newReview}});
    }
    catch(error)
    {
        return res.status(500).send( { status : false, message : error.message } );
    }
};

//================ PUT /books/:bookId/review/:reviewId route handler ===============================//

const updateReview = async function(req,res)
{
    try
    {
        if(req.params.bookId==undefined)
            return res.status(400).send({status : false, message : "bookId is required."});
    
        const bookId = req.params.bookId;
        
        if(!validators.isValidObjectId(bookId))
            return res.status(400).send({status : false, message : "The given bookId is not a valid ObjectId."})
        
        let bookExists = await bookModel.findOne({_id : bookId, isDeleted : false});

        if(!bookExists)
            return res.status(404).send({status : false, message : "Book not found!"});

        if(req.params.reviewId===undefined)
            return res.status(400).send({status : false, message : "Invalid request parameter. Please provide reviewId."});
        
        const reviewId = req.params.reviewId;
            
        if(!validators.isValidObjectId(reviewId))
            return res.status(400).send({status : false, message : "The given reviewId is not a valid ObjectId."});
        
        let reviewExists = await reviewModel.findOne({_id : reviewId,bookId,isDeleted : false});
        
        if(!reviewExists)
            return res.status(404).send({status : false,message : "Review not found!"});

        if(!validators.isValidRequestBody(req.body))
            return res.status(400).send({status : false, message : "Invalid request body. Please provide review details to be updated in request body."});
        
        let requestBody = req.body;

        let updatedReviewDetails={};
        
        if(validators.isValidField(requestBody.review))
            updatedReviewDetails['review']=requestBody.review;
        
        if(validators.isValidField(requestBody.rating))
            updatedReviewDetails['rating']=requestBody.rating;
        
        if(validators.isValidField(requestBody.reviewedBy))
            updatedReviewDetails['reviewedBy']=requestBody.reviewedBy;

        let updatedReview = await reviewModel.findByIdAndUpdate(reviewId,updatedReviewDetails,{new : true});
        
        return res.status(200).send({status : true, message : "Review updated successfully.",data : updatedReview});
    }
    catch(error)
    {
        return res.status(500).send({status : false, message : error.message});
    }
};

//================ DELETE /books/:bookId/review/:reviewId route handler ===============================//

const deleteReview = async function(req,res)
{
    try
    {
        if(req.params.bookId==undefined)
            return res.status(400).send({status : false, message : "bookId is required."});
        
        const bookId = req.params.bookId;
        
        if(!validators.isValidObjectId(bookId))
            return res.status(400).send({status : false, message : "The given bookId is not a valid ObjectId."})
        
        let bookExists = await bookModel.findOne({_id : bookId, isDeleted : false});
        
        if(!bookExists)
            return res.status(404).send({status : false, message : "Book not found!"});
            
        if(req.params.reviewId===undefined)
            return res.status(400).send({status : false, message : "Invalid request parameter. Please provide reviewId."});
            
        const reviewId = req.params.reviewId;
            
        if(!validators.isValidObjectId(reviewId))
            return res.status(400).send({status : false, message : "The given bookId is not a valid ObjectId."});
        
        let reviewAlreadyExists = await reviewModel.findOne({_id : reviewId,bookId,isDeleted : false});
        
        if(!reviewAlreadyExists)
            return res.status(404).send({status : false,message : "Review not found!"});
        
        await reviewModel.findByIdAndUpdate(reviewId,{$set : {isDeleted : true}});
        
        await bookModel.findByIdAndUpdate(bookId,{$inc : {reviews : -1}});

        return res.status(200).send({status : true, message : "review deleted successfully."});
    }
    catch(error)
    {
        return res.status(500).send({status : false, message : error.message});
    }
};

//================ exports ===============================//

module.exports={createReview,updateReview,deleteReview};