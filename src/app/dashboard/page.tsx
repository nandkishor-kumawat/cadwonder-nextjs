import React, { Suspense } from 'react'
import { Metadata } from 'next'
import { getData } from '@/lib/functions'
import { checkProtected } from '@/actions'
import { getAuth } from '../api/auth/[...nextauth]/options'
import Link from 'next/link'
import { FaEdit } from 'react-icons/fa'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import Await from '@/components/await'

export const metadata: Metadata = {
  title: 'Dashboard',
}

async function Dashboard() {
  // await checkProtected("/dashboard");
  const session = await getAuth();
  if (!session) return null;

  const user = session?.user;

  const userQuestions = getData({
    coll: "questions",
    key: "user_id",
    value: user.id
  });

  const userModels = getData({
    coll: "models",
    key: "user_id",
    value: user.id
  })
  return (
    <div>
      <div className={`h-3/5 relative`}>
        {/* {user.coverPicture ? <Image
        src={user.coverPicture as string}
        alt="coverPicture"
        className='w-full h-full object-cover absolute top-0 left-0'
        width={1280}
        height={920}
        priority={true}
    /> : (
        <div className='w-full h-full object-cover absolute top-0 left-0 bg-[rgb(255,148,57)] bg-cover bg-center' style={{
            background: "radial-gradient(circle, rgba(255,148,57,1) 0%, rgba(71,194,200,1) 7%, rgba(255,148,57,1) 13%, rgba(71,194,200,1) 31%, rgba(255,148,57,1) 100%)"
        }}></div>
    )} */}

        <div className="h-3/5 w-full flex justify-center" style={{
          backgroundImage: user.coverPicture ? `url(${user.coverPicture})` : "radial-gradient(circle, rgba(255,148,57,1) 0%, rgba(71,194,200,1) 7%, rgba(255,148,57,1) 13%, rgba(71,194,200,1) 31%, rgba(255,148,57,1) 100%)",
          backgroundSize: 'cover',
          backfaceVisibility: 'hidden'
        }}>
          <div className='detail w-[32rem] h-[12rem] mx-3 relative' style={{
            background: 'rgb(255 255 255 / 10%)',
            borderRadius: '16px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.47)',
            padding: '1rem',
            marginTop: '10rem',
          }}>
            <Link href='/dashboard/edit-profile'>
              <div className='absolute top-0 right-0 p-4 cursor-pointer'>
                <FaEdit className='text-orange-400' />
              </div>
            </Link>

            <div className='w-full h-full flex items-center justify-between gap-4 flex-col'>
              <Avatar className='w-20 h-20 -mt-14'>
                <AvatarImage src={user?.profilePicture as string} width={96} height={96} />
                <AvatarFallback className='text-3xl'>{user?.name[0].toUpperCase()}</AvatarFallback>
              </Avatar>



              <div>
                <h1>{user.name}</h1>
              </div>

              <div className='flex items-center justify-center gap-2 flex-wrap'>
                <p>0 Follower(s), </p>

                <Await promise={userQuestions}>
                  {questions => <p>{questions.length} Question(s),</p>}
                </Await>

                <Await promise={userModels}>
                  {models => <p>{models.length} Model(s),</p>}
                </Await>

                {/* <p>1 Badge received</p> */}
              </div>

            </div>

          </div>
        </div>
      </div>
    </div >
  )
}

export default Dashboard
