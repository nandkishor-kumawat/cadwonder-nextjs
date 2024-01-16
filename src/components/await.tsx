"use client"
import { useSession } from "next-auth/react"

export default function Await<T>({
  children
}: {
  children: (value: any) => JSX.Element
}) {
  const { data } = useSession();

  return children(data);
}