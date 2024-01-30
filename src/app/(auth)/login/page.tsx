"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState, useTransition } from "react";
import PasswordInput from "@/components/form/password-input";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Overlay from "@/components/loaders/overlay"
import { loginUser } from "@/actions"
import Spinner from "@/components/loaders/spinner"
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  })
})

export default function ProfileForm() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") ?? '/questions';
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values
    setIsLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl
    })

    setIsLoading(false);
    if (res?.error) {
      setErrorMessage("Invalid credentials");
      setTimeout(() => setErrorMessage(""), 2000);
      return;
    }

    startTransition(async () => {
      await loginUser(callbackUrl);

      toast.success(`Logged in successfully`, {
        style: {
          color: 'green'
        },
      });
    })
  }

  const handleGoogleSignIn = async () => {
    const res = await signIn("google", {
      redirect: false,
      // callbackUrl
    })
  }

  // const { data: session } = useSession()
  // if (session?.user) {
  //   router.replace(callbackUrl);
  // }
  // if(session?.user) return null;


  return (
    <div className="container max-w-md m-auto sm:my-32 my-28">
      {isLoading && <Overlay />}
      <h1 className="text-3xl font-bold my-4">Login to your account</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem >
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="my-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <PasswordInput {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-right mt-2">
              <Link href="/reset-password">Forgot your password?</Link>
            </div>
          </div>

          <div className="mt-2">
            {errorMessage && <p className="text-center text-lg text-red-500">{errorMessage}</p>}
          </div>

          <div className="">
            <Button type="submit" disabled={isLoading} className="w-full bg-orange-500 text-lg tracking-wider disabled:bg-orange-400 hover:bg-orange-600">
              {isLoading && <Spinner className='fill-blue-500 w-5 h-5 mr-2' />} Login
            </Button>
          </div>

        </form>
      </Form>
      <div className="my-2">

        <div>
          <Link href="/signup">Don&apos;t have an account? </Link>
        </div>
      </div>
      {/* <div className="my-4">
        <Button type="button" className="w-full text-lg mt-3 bg-slate-50 hover:bg-slate-100 text-black py-3 h-auto" onClick={handleGoogleSignIn}>
          <FcGoogle className="mx-2" size={24} />
          <p className="font-medium">Sign In with Google</p>
        </Button>
      </div> */}
    </div>
  )
}
