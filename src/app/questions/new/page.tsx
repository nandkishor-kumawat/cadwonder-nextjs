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
import { SelectWithSearch } from "@/components/form/SelectWithSearch";
import { bg1 } from "@/lib/data/colors";
import { Textarea } from "@/components/ui/textarea";
import categories, { category1 } from "@/lib/data/category";
import SoftwareSkills from "@/lib/data/SoftwareSkills";
import TagsInput from "@/components/ui/tags-input";
import React from "react";


const formSchema = z.object({
  question: z.string().min(10, {
    message: "Question must be at least 10 characters",
  }),
  description: z.string().optional(),
  category: z.string().refine(data => categories.includes(data), { message: "Please select a valid category" }),
  software: z.string(),
  tags: z.array(z.string()).max(6, { message: "You can only add up to 6 tags" })
}).refine(data => {
  if (category1.includes(data.category)) {
    return SoftwareSkills.includes(data.software);
  }
  return true
}, {
  message: "Please select a valid software",
  path: ["software"],
})


export default function NewQuestion() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      description: "",
      category: "",
      software: "",
      tags: []
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!form.formState.isValid) {
      return
    }
    console.table(values)
  }


  return (
    <>
      <div className="absolute top-0 left-0 right-0 px-4 py-1 bg-white border-b-slate-200 border-b z-10" style={{ background: bg1 }}>
        <div className="flex items-center justify-between py-1">
          <p className="text-white text-lg">New Question</p>

          <div className="flex items-center gap-2">
            <Button className="bg-transparent text-md">Cancel</Button>

            <Button
              className="bg-orange-500 text-lg hover:bg-orange-600"
              onClick={form.handleSubmit(onSubmit)}
            >Publish</Button>
          </div>
        </div>
      </div>
      <div className="container max-w-[640px] m-auto my-12">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Example: How do I export to an STL?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem >
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your question" rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <SelectWithSearch data={categories} type="category" onSelect={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {category1.includes(form.watch("category")) && <FormField
              control={form.control}
              name="software"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Software</FormLabel>
                  <FormControl>
                    <SelectWithSearch data={SoftwareSkills} type="software" onSelect={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />}

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags (up to 6, separate with commas)</FormLabel>
                  <FormControl>
                    <TagsInput tags={field.value} setTags={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <div className="mt-3">
              <Button type="submit" className="text-lg w-full bg-orange-500 mt-3 hover:bg-orange-600">Submit</Button>
            </div> */}
          </form>
        </Form>

      </div>
    </>)
}
