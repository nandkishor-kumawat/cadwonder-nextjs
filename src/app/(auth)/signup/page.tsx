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
import PasswordInput from "@/components/form/PasswordInput";
import { SelectWithSearch } from "@/components/form/SelectWithSearch";
import countries from "@/lib/data/countries";
import roles from "@/lib/data/roles";
import { useState } from "react";
import Spinner from "@/components/loaders/Spinner";
import Overlay from "@/components/loaders/overlay";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { loginUser } from "../login/action";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Please enter your full name.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string(),
  country: z.string().refine(value => countries.includes(value), {
    message: "Select a country",
  }),
  college: z.string().optional(),
  role: z.string().refine(value => roles.includes(value), {
    message: "Select a role",
  })
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
})

export default function ProfileForm() {

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      country: "",
      college: "",
      role: "",
    },
  })

  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const username = values.name
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .trim()
      .replace(/\s+/g, '-')
    setIsLoading(true);

    const data = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...values, username })
    }).then(res => res.json())

    console.table(data.user);
    

    if (data.error) {
      alert(data.error);
      setIsLoading(false)
      return
    }

    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    })
    await loginUser("/");
    setIsLoading(false)

  }


  return (
    <div className="container max-w-md m-auto my-2">
      {isLoading && <Overlay />}
      <h1 className="text-3xl font-bold my-4">Create your account</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem aria-required>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter your full Name" {...field} />
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <PasswordInput {...field} ref={field.ref} />
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <PasswordInput {...field} ref={field.ref} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <SelectWithSearch defaultValue={field.value} data={countries} type="country" onSelect={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="college"
            render={({ field }) => (
              <FormItem >
                <FormLabel>College</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter your college" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <SelectWithSearch defaultValue={field.value} data={roles} type="role" onSelect={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <div className="mt-3">
            <Button type="submit" className="text-lg w-full bg-orange-500 mt-3 hover:bg-orange-600">
              {isLoading && <Spinner className='w-5 h-5 mr-2' />}SignUp</Button>
          </div>
        </form>
      </Form>
      <div className="my-2">
        <div>
          <Link href="/login">Already have an account? Login</Link>
        </div>

      </div>
    </div>
  )
}
