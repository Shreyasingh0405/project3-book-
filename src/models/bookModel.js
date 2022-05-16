// ================ imports ===========================================================================================//

const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

// ================ Book Schema ===========================================================================================//

const bookSchema = new mongoose.Schema(
{
  title : {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase:true,
          },
  excerpt : {
              type: String,
              required: true,
              trim: true
            },
  userId :  {
              type: ObjectId,
              required: true,
              ref: 'users',
            },
  ISBN :  {
            type: String,
            required: true,
            unique: true,
            trim: true
          },
  category :  {
                type: String,
                required: true,
                trim: true
              },
  subcategory : {
                  type: [String],
                  required: true,
                  trim: true
                },
  reviews : {
              type: Number,
              default: 0,
              // Holds number of reviews of this book.
            },
  deletedAt : {
                type: Date
              },
  isDeleted : {
                type: Boolean,
                default: false
              },
  releasedAt : {
                  type: String,
                  required: true
               },
},{ timestamps: true }
);

// ================ exports ===========================================================================================//

module.exports = mongoose.model("books", bookSchema);