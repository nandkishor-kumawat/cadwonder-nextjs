"use client"
import BoxModel from '@/components/BoxModel'
import Overlay from '@/components/loaders/overlay'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import UploadFileCard from '@/components/upload-file-card'
import { categories, bg1 } from '@/data'
import { createSlug } from '@/lib/functions'
import { Files, Model } from '@prisma/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from '@/hooks'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { postModel } from '@/actions'
import { toast } from 'sonner'


const formSchema = z.object({
  modelName: z.string().min(5, {
    message: "Must be at least 5 characters"
  }),
  description: z.string().min(10, {
    message: "Must be at least 10 characters"
  }),
  category: z.array(z.string()),
  files: z.array(z.instanceof(File)).refine((files) => files.length > 0, {
    message: "Please select at least one file"
  })
})

function NewModal() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      modelName: "",
      description: "",
      category: [],
      files: []
    }
  })

  const router = useRouter();
  const { session } = useSession()
  const [uploadProgress, setUploadProgress] = useState<Record<number, number>>({})
  const [isLoading, setIsLoading] = useState(false);


  const handleRemoveFile = (fileToRemove: File) => {
    const updatedFiles = form.getValues('files').filter(file => file !== fileToRemove);
    form.setValue('files', updatedFiles);
  };

  const handleUploadFiles = async (files: File[]) => {
    if (!files) return [];
    //TODO

    // const uploadPromises = files.map((file, index) => {
    //   return uploadFileWithProgress(file, index, (progressIndex, progress) => {
    //     setUploadProgress((prevProgress) => ({
    //       ...prevProgress,
    //       [progressIndex]: progress,
    //     }));
    //   });
    // });

    // try {
    //   const results = await Promise.all(uploadPromises);

    //   return results;
    // } catch (error) {
    //   console.error('Error uploading files:', error);
    // }
  };



  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { files, ...other } = values;
    setIsLoading(true)
    let fileDetails: Files[] = [];

    if (files.length) {
      fileDetails = await handleUploadFiles(files) as Files[];
    }

    const slug = await createSlug('models', 'slug', other.modelName);

    const body = {
      ...other,
      slug,
      userId: session?.user.id as string,
      fileDetails
    } as Model & { fileDetails: Files[] };

    const { error } = await postModel(body);
    setIsLoading(false);
    if (error) {
      toast.error(error, {
        style: {
          color: 'red'
        }
      });
      return;
    }

    toast.success(`Model uploaded successfully`, {
      style: {
        color: 'green'
      }
    });
    router.replace(`/library/${slug}`, {
      scroll: false
    });
  }

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-50">
      {isLoading && <Overlay />}
      <div className="sticky top-0 left-0 right-0 px-4 py-2 bg-white border-b-slate-200 border-b z-10 h-header flex items-center" style={{ background: bg1 }}>
        <div className="flex items-center justify-between flex-1">
          <p className="text-white text-lg">New Model</p>

          <div className="flex items-center gap-2">
            <Link href="/dashboard/models" className='text-white py-2 px-3' >Cancel</Link>
            <Button
              disabled={isLoading}
              className="bg-orange-500 text-lg hover:bg-orange-600"
              onClick={form.handleSubmit(onSubmit)}
            >{isLoading ? 'Publishing...' : 'Publish'}</Button>
          </div>
        </div>
      </div>
      <div className="container max-w-[640px] m-auto my-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="modelName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter modal name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter description" {...field} rows={5} />
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
                  <FormLabel>Categories ({field.value.length}/3)</FormLabel>
                  <FormControl>
                    <BoxModel data={categories} max={3} selectedItems={field.value} handleSave={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="files">
              <p className="my-2 mt-4">Attachments</p>
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


            {/* <div className="">
              <Button type="submit" className="my-3 rounded-none bg-orange-500 font-normal hover:bg-orange-600">Publish Model</Button>
            </div> */}

          </form>
        </Form>

        <div className="flex flex-col gap-2 my-2">
          {form.watch('files').map((file, index) => (
            <UploadFileCard key={index} file={file} index={index} handleRemoveFile={handleRemoveFile} progress={uploadProgress[index]} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default NewModal
