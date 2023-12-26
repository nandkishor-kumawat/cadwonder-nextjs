"use client"
import BoxModel from '@/components/BoxModel'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import categories from '@/lib/data/category'
import { bg1 } from '@/lib/data/colors'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  modalName: z.string().min(5, {
    message: "Must be at least 5 characters"
  }),
  description: z.string().min(10, {
    message: "Must be at least 10 characters"
  }),
  categories: z.array(z.string()),
  // modelFiles: z.array(z.string())
})

function NewModal() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      modalName: "",
      description: "",
      categories: []
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
      <div className="absolute top-0 left-0 right-0 px-4 py-2 bg-white border-b-slate-200 border-b z-10" style={{ background: bg1 }}>
        <div className="flex items-center justify-between">
          <p className="text-white text-lg">New Model</p>

          <div className="flex items-center gap-2">
            <Link href="./" className='text-white py-2 px-3' >Cancel</Link>
            <Button
              className="bg-orange-500 text-lg hover:bg-orange-600"
              onClick={form.handleSubmit(onSubmit)}
            >Publish</Button>
          </div>
        </div>
      </div>
      <div className="container max-w-[640px] m-auto mt-12">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="modalName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modal Name</FormLabel>
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
              name="categories"
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



            {/* <div className="mt-3">
              <Button type="submit" className="bg-orange-500 text-lg hover:bg-orange-600">Publish Model</Button>
            </div> */}

          </form>
        </Form>

      </div>
    </>
  )
}

export default NewModal
