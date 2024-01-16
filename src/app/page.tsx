// "use client"
// import { useSession } from "next-auth/react"

import { auth } from "@/firebase"


export default function Home() {

  // const { data } = useSession();

  return (
    <pre>
      {JSON.stringify(auth.currentUser, null, 2)}
    </pre>
  )
}
