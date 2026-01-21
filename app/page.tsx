import Image from "next/image";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";


export default async function Home() {
const users = await db.user.findMany();
  return (
  <div>
<Button className="bg-blue-500 hover:bg-blue-700 ">Get Started</Button>
  </div>
  );
}
