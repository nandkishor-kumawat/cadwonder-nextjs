import { getServerSession } from "next-auth";
import { getAuth } from "./api/auth/[...nextauth]/options";
import { RedirectType, redirect } from "next/navigation";


export default async function Home() {

  redirect('/questions', RedirectType.replace);
  const session = await getAuth();

  return (
    <pre>
      {JSON.stringify(session, null, 2)}
    </pre>
  )
}
