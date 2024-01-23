import { redirect } from 'next/navigation';
import React from 'react'

const Page = ({searchParams}:{
  searchParams: {
    mode?: string;
    oobCode?: string;
    continueUrl?: string;
    lang?: string;
  }
}) => {

  const { mode, oobCode, continueUrl, lang = "en" } = searchParams;
  if(!mode || !oobCode || !continueUrl) redirect("/");
  
  return (
    <div>Page</div>
  )
}

export default Page