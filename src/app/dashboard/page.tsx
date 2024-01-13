"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaEdit } from 'react-icons/fa'

function Dashboard() {

  // const { data } = useSession()
  const { data, status, update } = useSession({ required: true, onUnauthenticated: () => ({ redirect: '/login' }) });

  const [user, setUser] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!data?.user?.id) return;
    const fetchUser = async () => {
      setIsLoading(true);
      const res = await fetch(`http://localhost:3001/api/users/${data?.user?.id}`);
      const {user} = await res.json();
      console.log(JSON.stringify(user, null, 2));
      setUser(user);
      
      setIsLoading(false);
    }
    fetchUser();
  }, [data?.user?.id]);


  // if (isLoading) return <div>Loading...</div>
  if (!user) return null;

  return (
    <div className="h-full overflow-hidden">
      <div className="top h-full overflow-hidden">

        <div className={`coverPicture flex items-center justify-center h-full relative`}>
          <Image
            src={user.coverPicture as string}
            alt="coverPicture"
            className='w-full h-1/3 object-cover absolute top-0 left-0'
            width={1280}
            height={920}
            priority={true}
          />

          <div className='detail w-[32rem] h-[12rem] m-auto relative' style={{
            background: 'rgb(255 255 255 / 10%)',
            borderRadius: '16px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.47)',
            padding: '1rem',
            marginTop: '10rem',
          }}>
            <div className='absolute top-0 right-0 p-4 cursor-pointer'>
              <Link href='/dashboard/edit-profile'><FaEdit className='text-orange-400' /></Link>
            </div>

            <div className='w-full h-full flex items-center justify-between gap-4 flex-col'>
              <Avatar className='w-20 h-20 -mt-14'>
                <AvatarImage src={user?.profilePicture as string} />
                <AvatarFallback className='text-3xl'>{user?.name[0].toUpperCase()}</AvatarFallback>
              </Avatar>



              <div>
                <h1>{user.name}</h1>
              </div>

              <div className='flex items-center justify-center gap-2 flex-wrap'>
                <p>0 Follower(s), </p>
                <p>0 Question(s), </p>
                <p>0 Models, </p>
                <p>1 Badge received</p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard
