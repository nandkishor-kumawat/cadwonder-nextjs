"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react";
import PasswordInput from "@/components/form/PasswordInput";

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <div className="container max-w-md m-auto sm:my-32 my-28">
      <h1 className="text-3xl font-bold my-4">Login to your account</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem >
                <FormLabel>Email address</FormLabel>
                <FormControl className="focus:ring focus-visible:ring-cyan-400 focus-visible:ring-offset-0">
                  <Input type="email" placeholder="Enter your email" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
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
          <div className="mt-3">
            <Button type="submit" className="w-full bg-orange-500 text-lg mt-3 hover:bg-orange-600">Submit</Button>
          </div>
        </form>
      </Form>
      <div className="my-2">
        <div>
          <Link href="/forgot-password">Forgot your password?</Link>
        </div>
        <div>
          <Link href="/signup">Don&apos;t have an account? </Link>
        </div>

      </div>
    </div>
  )
}
