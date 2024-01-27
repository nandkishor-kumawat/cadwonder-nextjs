import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";


export default async function Home() {

  redirect('/questions');
  const session = await getServerSession(options);

  return (
    <pre>
      {JSON.stringify(session, null, 2)}
    </pre>
  )
}
