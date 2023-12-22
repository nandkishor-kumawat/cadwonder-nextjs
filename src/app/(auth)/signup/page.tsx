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
import PasswordInput from "@/components/form/PasswordInput";
import { SelectWithSearch } from "@/components/form/SelectWithSearch";
import countries from "@/lib/data/countries";
import roles from "@/lib/data/roles";

const formSchema = z.object({
  fullName: z.string().min(3, {
    message: "Please enter your full name.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8),
  country: z.string(),
  college: z.string().optional(),
  role: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
})

export default function ProfileForm() {

  // form.setValue("location", language.value)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      country: "",
      college: "",
      role: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.table(values)
  }

  // const handleSelect = (type: string, value: string) => {
  //   form.setValue(type as keyof z.infer<typeof formSchema>, value);
  //   console.log(type, value)
  // };

  return (
    <div className="container max-w-md m-auto my-2">
      <h1 className="text-3xl font-bold my-4">Create your account</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem aria-required>
                <FormLabel>Full Name</FormLabel>
                <FormControl className="focus:ring focus-visible:ring-cyan-400 focus-visible:ring-offset-0">
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
                <FormControl className="focus:ring focus-visible:ring-cyan-400 focus-visible:ring-offset-0">
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
                <PasswordInput {...field} />
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
                <PasswordInput {...field} />
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
                  <SelectWithSearch data={countries} type="country" onSelect={field.onChange} />
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
                <FormControl className="focus:ring focus-visible:ring-cyan-400 focus-visible:ring-offset-0">
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
                  <SelectWithSearch data={roles} type="role" onSelect={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <div className="mt-3">
            <Button type="submit" className="text-lg w-full bg-orange-500 mt-3 hover:bg-orange-600">SignUp</Button>
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
