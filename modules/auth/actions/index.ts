"use server"
import {auth} from "@/auth";
import {db} from "@/lib/db";
import { log } from "console";
import { pl } from "date-fns/locale";

export const getUserById = async (id:string)=>{

  try {
    
const user = await db.user.findUnique({

  where:{id},
  include:{
    accounts:true
  }
  })
  }
return user;
  } catch (error) {
  console.log(error);
  return null;
  }
}


export const getAccountByUserId = async (id:string)=>{

  try {
    const account = await db.account.findFirst({
      where:{userId:id}
    })
    return account;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const currentUser = async ()=>{

  const user = await auth();
  return user?.user;
 catch (error){
 }
  
}