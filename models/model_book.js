const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    author_id: {
        type:String,
        //type: mongoose.Schema.Types.ObjectId,
       // ref: 'Author',
        require:true
    },
    category_id: {
        type: String,
        required: true
    },
    book_title: {
        type: String,
        required: true
    },
    ISBN: {
        type: String,
        required: true
    },
    publication_id: {
        type: String,
        required: true
    },
    edition: {
        type: String,
        required: true
    },
   /* book_in_series: {
        type: boolean,
        required: true
    },*/
    publish_year: {
        type: String,
        required: true
    },
    book_image: {
        type: String,
        required: true

        /* img1: {
             type: String,
             required: true
         },
         img2: {
             type: String,
             required: true
         },
         img3: {
             type: String
         },*/
    },
    approve_status:{
      type:String,
      required:true,
      default:1
    },
    book_file:{type:String,required:true},
    ref_link: {
        type: String,
        required: true
    },
    feedback: {
        email: {
            type: String
        },
        description: {
            type: String,
        }
    },

    status:{type:String,required:true,default:0},
      
    created_date: {
        type: Date,
        default: Date.now()
    }
});
module.exports = mongoose.model('Book', bookSchema);