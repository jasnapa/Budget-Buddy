import mongoose from "mongoose"

const expenseSchema = new mongoose.Schema({

    user :  {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'Users' ,
        required : true
      },
    amount: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
    
});

const userModel = mongoose.model("user", userSchema)

export default userModel