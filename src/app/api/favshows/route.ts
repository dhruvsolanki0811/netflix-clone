import connectDb from "@/utils/db"
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"

import {FavShowModel} from "@/models/show"
import { NextApiRequest } from "next"

const getCurrentUser=async ()=>{
    const session = await getServerSession()

    
    return session?.user?.email?session.user.email:""
}
export const GET=async(request:NextRequest)=>{
    
    const email=await getCurrentUser()
    if((email).length==0)return new NextResponse(`{error:Unauthenticated user}`,{status:401})

    try{
        await connectDb()
        const shows=await FavShowModel.find({email:email}).sort({createdAt:"desc"})
        return new NextResponse(JSON.stringify(shows),{status:200})
    }catch(err){
        return new NextResponse("Db error",{status:500})
    }
}

export const POST=async(request:NextRequest)=>{

    const email=await getCurrentUser()
    if((email).length==0)return new NextResponse(`{error:Unauthenticated user}`,{status:401})
    try{
        await connectDb()
        const data = await request.json()

        await FavShowModel.create({favoriteShow:data,email:email})
        return new NextResponse("Added successfully",{status:200})
    }catch(err){
        console.log(err)
        return new NextResponse(`Server Error `,{status:500})
    }
}
export const DELETE = async (request: NextRequest) => {
    const email = await getCurrentUser();

    if (email.length === 0) {
        return new NextResponse(`{error: Unauthenticated user}`, { status: 401 });
    }

    try {
        await connectDb();
        // Extract the IMDb ID from the query parameters
        const imdb = request.nextUrl.searchParams.get("imdb");

        // Delete entry from database based on email and imdb
        await FavShowModel.deleteOne({ email: email, "favoriteShow.id": imdb });

        return new NextResponse("Deleted successfully", { status: 200 });
    } catch (err) {
        return new NextResponse(`Server Error`, { status: 500 });
    }
};