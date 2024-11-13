"use client"
import { UserButton, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Image from "next/image";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { user } = useUser();
  // console.log(user);
  const [userList, setUserList] = useState([])

// "_id": "6729b279b668b26e0c4538d5",
//     "clerkId": "6901",
//     "__v": 0,
//     "createdAt": "2024-11-05T05:51:53.547Z",
//     "email": "ola@example.com",
//     "name": "olaniyi arokoyu",
//     "role": "user"



  useEffect(() => {
    // getAllUsers();
   user && createUsers()
    console.log('this is home')
    
  }, [])

  const createUsers = async () => {
    try {
      const data = {
          clerkId: user?.id,
          name: user?.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
          createdAt: user?.createdAt
      }
      GlobalApi.createUser(data).then(resp => {
        console.log(resp)
          console.log(resp)
          console.log('user created')
      })
    } catch (error) {
      console.log('user created')
    }
  }
  
  
  const getAllUsers = async () => {
    try {
      GlobalApi.getUsers().then(resp => {
        setUserList(resp.data)
        console.log(resp.data)
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      the home page
      <p>welcome, {user?.firstName}</p>
      <button onClick={getAllUsers} className="bg-black p-1 rounded text-white cursor-pointer">get user now</button>
      <button onClick={createUsers}>test create User</button>
      {userList.map((item) => {
        return <div>{item?.clerkId}</div>
      })}
      <UserButton />
      {/* <Button>ShadCN</Button> */}
    </div>
  );
}
