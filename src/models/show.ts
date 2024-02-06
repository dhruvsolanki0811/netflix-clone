    import mongoose from "mongoose";
    const ShowSchema=new mongoose.Schema({
        backdrop_path: { type: String, default: null },
        media_type: { type: String, default: null },
        id: { type: String, required: true },
        overview: { type: String, required: true },
        poster_path: { type: String, default: null },
        release_date: { type: String, default: null },
        title: { type: String, default: null },
        vote_average: { type: Number, default: 0 },
    })
    const FavShowSchema= new mongoose.Schema({
        email:{
            type:String,
            required:true
        },
        favoriteShow: { type: ShowSchema, required: true }, 
    },{
        timestamps:true
    })
    const FavShowModel=mongoose.models.FavShow|| mongoose.model("FavShow",FavShowSchema)

    export {FavShowModel}