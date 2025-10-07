"use server";
import { db } from "@/lib/db";
import { auth } from "@/auth";



export const getUserById = async (id : string)=>{
    try {
        const user = await db.user.findUnique({
            where:{id},
            include:{
                Account:true
            }


        })
    } catch (error) {
        
    }

     
}