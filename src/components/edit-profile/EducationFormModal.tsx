import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
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
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FaEdit } from 'react-icons/fa'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import { Button } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'
import { Education } from '@/lib/types'
import { YEARS } from '@/lib/data/time-period'

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
            school: data?.school ?? "",
            field: data?.field ?? "",
            degree: data?.degree ?? "",
            startYear: data?.startYear ?? "",
            endYear: data?.endYear ?? "",
            description: data?.description ?? "",
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        //save to db

        console.table(values)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size={"icon"}>{data ? <FaEdit size={18} /> : <AiOutlineAppstoreAdd size={20} />}</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
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
                                        <FormControl className="focus:ring focus-visible:ring-cyan-400 focus-visible:ring-offset-0">
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
                                        <FormControl className="focus:ring focus-visible:ring-cyan-400 focus-visible:ring-offset-0">
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
                                        <FormControl className="focus:ring focus-visible:ring-cyan-400 focus-visible:ring-offset-0">
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
                                            <FormControl className="focus:ring focus-visible:ring-cyan-400 focus-visible:ring-offset-0">
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
                                            <FormControl className="focus:ring focus-visible:ring-cyan-400 focus-visible:ring-offset-0">
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
                                        <FormControl className="focus:ring focus-visible:ring-cyan-400 focus-visible:ring-offset-0">
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
                        {data && <Button variant="destructive">Delete</Button>}
                        <Button type="submit" variant="outline" onClick={form.handleSubmit(onSubmit)}>Save</Button>
                    </div>

                    <DialogClose asChild>
                        <Button type="reset" variant="secondary" onClick={() => form.reset()} >
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EducationFormModal