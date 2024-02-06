import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/utils/db";
import { FavShowModel } from "@/models/show";

export const  POST=async (request:NextRequest)=>{
    try{
        const {imdb} =await request.json()
        if(!imdb){return new NextResponse(`Bad request`,{status:400})}
        const session = await getServerSession()   
        const email =session?.user?.email?session.user.email:""
        if((email).length==0)return new NextResponse(`{error:Unauthenticated user}`,{status:401})

        try{
            await connectDb()
            const show=await FavShowModel.findOne({email:email,"favoriteShow.id":imdb})
            if(!show){
                return new NextResponse(JSON.stringify({"isPresent":false}),{status:200})
            }
            return new NextResponse(JSON.stringify({"isPresent":true}),{status:200})
        }catch(err){
            return new NextResponse("Db error",{status:500})
        }
    }catch(err){
    }
}