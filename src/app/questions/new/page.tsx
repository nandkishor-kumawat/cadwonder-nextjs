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
import { SelectWithSearch } from "@/components/form/SelectWithSearch";
import { bg1 } from "@/lib/data/colors";
import { Textarea } from "@/components/ui/textarea";
import categories, { category1 } from "@/lib/data/category";
import SoftwareSkills from "@/lib/data/SoftwareSkills";
import TagsInput from "@/components/ui/tags-input";
import React, { useState } from "react";
import Link from "next/link";
import { uploadFileWithProgress } from "@/firebase/functions";
import { FileDetails } from "@/lib/types/types";
import { useSession } from "next-auth/react";
import { createSlug } from "@/lib/functions";
import { redirect, useRouter } from "next/navigation";
import UploadFileCard from "@/components/upload-file-card";
import Overlay from "@/components/loaders/overlay";
import { postModel, postQuestion } from "@/actions";
import { toast } from "sonner"


const formSchema = z.object({
  question: z.string().min(10, {
    message: "Question must be at least 10 characters",
  }),
  description: z.string().optional(),
  category: z.string().refine(data => categories.includes(data), { message: "Please select a valid category" }),
  software: z.string(),
  tags: z.array(z.string()).max(6, { message: "You can only add up to 6 tags" }),
  files: z.array(z.instanceof(File)),
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
      tags: [],
      files: []
    }
  })

  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);


  const [uploadProgress, setUploadProgress] = useState<Record<number, number>>({})

  const handleRemoveFile = (fileToRemove: File) => {
    const updatedFiles = form.getValues('files').filter(file => file !== fileToRemove);
    form.setValue('files', updatedFiles);
  };

  const handleUploadFiles = async (files: File[]) => {
    if (!files) return;

    const uploadPromises = files.map((file, index) => {
      return uploadFileWithProgress(file, index, (progressIndex, progress) => {
        setUploadProgress((prevProgress) => ({
          ...prevProgress,
          [progressIndex]: progress,
        }));
      });
    });

    try {
      const results = await Promise.all(uploadPromises);

      return results;
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { files, ...other } = values;
    setIsLoading(true);
    let file_details = [] as FileDetails[];

    if (files.length) {
      file_details = await handleUploadFiles(files) as FileDetails[];
    }

    const slug = await createSlug('questions', 'slug', other.question);

    const body = {
      ...other,
      file_details,
      slug,
      user_id: session?.user?.uid as string,
    }

    const response = await postQuestion(body);
    setIsLoading(false);
    if (response?.error) return alert(response.error);

    toast.success(`Question created successfully`, {
      style: {
        color: 'green'
      }
    });
    
    router.replace(`/questions/${slug}`, {
      scroll: false
    });
  }

  if(!session) redirect('/login?callbackUrl=/questions/new');

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-50">
      {isLoading && <Overlay />}
      <div className="top-0 left-0 right-0 px-4 py-1 bg-white border-b-slate-200 border-b z-10" style={{ background: bg1 }}>
        <div className="flex items-center justify-between py-1">
          <p className="text-white text-lg">New Question</p>

          <div className="flex items-center gap-2">
            <Link href="./" className='text-white py-2 px-3' >Cancel</Link>

            <Button
              className="bg-orange-500 text-lg hover:bg-orange-600"
              onClick={form.handleSubmit(onSubmit)}
            >{isLoading ? 'Publishing...' : 'Publish'}</Button>
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

            <div className="files">
              <p className="my-2">Attachments</p>
              <FormField
                control={form.control}
                name="files"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base cursor-pointer">Attach a file</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".gif,.jpg,.jpeg,.png"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                          form.setValue("files", Array.from(e.target.files || []));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>


            {/* <div className="mt-3">
              <Button type="submit" className="text-lg w-full bg-orange-500 mt-3 hover:bg-orange-600">Submit</Button>
            </div> */}
          </form>
        </Form>

        <div className="flex flex-col gap-2 my-2">
          {form.watch('files').map((file, index) => (
            <UploadFileCard key={index} file={file} index={index} handleRemoveFile={handleRemoveFile} progress={uploadProgress[index]} />
          ))}
        </div>

      </div>
    </div>)
}
