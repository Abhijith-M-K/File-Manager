const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema(
    {
        userid:{
            type:String,
            require:true,
        },
        fileid:{
            type:String,
            require:true,
        },
        filename:{
            type:String,
            require:true,
        }
    },{
        timestamps: true,
    }
);

const fileModel = mongoose.model("files",FileSchema)
module.exports = fileModel;