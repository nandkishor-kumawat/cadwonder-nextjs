"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';


const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    })
})

const Page = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: ''
        }
    })

    const resetPassword = (values: z.infer<typeof formSchema>) => {
        if (!values.email) return;
        // TODO
    }

    return (
        <div className="flex h-full justify-center">
            <div className="w-1/2 my-6 space-y-3">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(resetPassword)} className="space-y-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email address</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Enter your email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type='submit' variant={'secondary'}>Send reset link</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Page