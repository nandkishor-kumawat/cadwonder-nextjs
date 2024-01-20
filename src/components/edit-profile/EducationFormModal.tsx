"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import React, { startTransition, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { SelectWithSearch } from '../form/SelectWithSearch'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FaEdit } from 'react-icons/fa'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import { Button } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'
import { Education } from '@/lib/types/types'
import { YEARS } from '@/lib/data/time-period'
import { addEducation, deleteEducation } from '@/app/dashboard/action'
import { useSession } from 'next-auth/react'
import { useFormStatus } from 'react-dom'
import Overlay from '../loaders/overlay'

const formSchema = z.object({
    school: z.string().min(1, 'Required'),
    field: z.string().min(1, 'Required'),
    degree: z.string().min(1, 'Required'),
    startYear: z.string().min(1, 'Required'),
    endYear: z.string().min(1, 'Required'),
    description: z.string().min(1, 'Required'),
})

interface EducationFormProps {
    data?: Education
}


const EducationFormModal = ({ data }: EducationFormProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            school: "",
            field: "",
            degree: "",
            startYear: "",
            endYear: "",
            description: "",
        }
    });

    useEffect(() => {
        if (data) {
            form.reset({
                school: data?.school,
                field: data?.field,
                degree: data?.degree,
                startYear: data?.startYear,
                endYear: data?.endYear,
                description: data?.description
            })
        }
    }, [data, form])

    const { data: session } = useSession();
    const [isLoading, setIsLoading] = React.useState(false);
    const closeBtnRef = React.useRef<HTMLButtonElement>(null);

    function onSubmit(values: z.infer<typeof formSchema>) {
        //save to db
        console.table(values)
        setIsLoading(true);
        startTransition(() => {
            addEducation({ id: data?.id, ...values }, session?.user)
                .then((data) => {
                    form.reset()
                    console.table(data);
                    setIsLoading(false);
                    closeBtnRef.current?.click();
                });
        })
    }


    const DeleteButton = () => {
        const { pending } = useFormStatus()
        return (
            <>
            {pending&& <Overlay />}
             <Button variant="destructive" disabled={pending}>{pending ? "Deleting..." : "Delete"}</Button>
            </>
         )
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size={"icon"}>{data ? <FaEdit size={18} /> : <AiOutlineAppstoreAdd size={20} />}</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                {isLoading && <Overlay />}
                <DialogHeader>
                    <DialogTitle>Add Education</DialogTitle>
                </DialogHeader>

                <ScrollArea className="max-h-[450px]">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1 p-1">
                            <FormField
                                control={form.control}
                                name="school"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>School</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ex: Stanford University" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="field"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Field</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ex: Mechanical Engineer" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="degree"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Degree</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ex: Bachelor's" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex gap-5 flex-col sm:flex-row">
                                <FormField
                                    control={form.control}
                                    name="startYear"
                                    render={({ field }) => (
                                        <FormItem className='sm:w-1/2'>
                                            <FormLabel>From Year</FormLabel>
                                            <FormControl>
                                                <SelectWithSearch data={YEARS} type='Year' defaultValue={field.value} onSelect={field.onChange} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="endYear"
                                    render={({ field }) => (
                                        <FormItem className='sm:w-1/2'>
                                            <FormLabel>To Year</FormLabel>
                                            <FormControl>
                                                <SelectWithSearch data={YEARS} type='Year' defaultValue={field.value} onSelect={field.onChange} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea rows={4} placeholder="description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </ScrollArea>

                <DialogFooter className="sm:justify-end px-3">
                    <div className="flex gap-2">
                        {data &&
                            <form action={deleteEducation}>
                                <Input type="hidden" name='id' value={data.id} />
                                <Input type="hidden" name='user_id' value={session?.user?.id} />
                                <DeleteButton />
                            </form>}
                        <Button
                            type="submit"
                            variant="outline"
                            disabled={isLoading}
                            onClick={form.handleSubmit(onSubmit)}>{isLoading ? 'Saving...' : 'Save'}</Button>
                    </div>

                    <DialogClose asChild>
                        <Button ref={closeBtnRef} type="reset" variant="secondary" onClick={() => form.reset()} >
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EducationFormModal