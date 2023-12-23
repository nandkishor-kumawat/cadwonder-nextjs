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
import { Experience } from '@/lib/types'
import { MONTHS, YEARS } from '@/lib/data/time-period'

const formSchema = z.object({
    company: z.string().min(1, 'Required'),
    position: z.string().min(1, 'Required'),
    startYear: z.string().min(1, 'Required'),
    startMonth: z.string().min(1, 'Required'),
    endYear: z.string().min(1, 'Required'),
    endMonth: z.string().min(1, 'Required'),
    description: z.string().min(1, 'Required'),
})


interface ExperienceFormProps {
    data?: Experience
}

const ExperienceFormModal = ({ data }: ExperienceFormProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            company: data?.company ?? "",
            position: data?.position ?? "",
            startYear: data?.startYear ?? "",
            startMonth: data?.startMonth ?? "",
            endYear: data?.endYear ?? "",
            endMonth: data?.endMonth ?? "",
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
                    <DialogTitle>Add Experience</DialogTitle>
                </DialogHeader>

                <ScrollArea className="max-h-[450px]">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1 p-1">
                            <FormField
                                control={form.control}
                                name="company"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company</FormLabel>
                                        <FormControl className="focus:ring focus-visible:ring-cyan-400 focus-visible:ring-offset-0">
                                            <Input placeholder="Ex: Siemens PLM Software" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="position"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Position</FormLabel>
                                        <FormControl className="focus:ring focus-visible:ring-cyan-400 focus-visible:ring-offset-0">
                                            <Input placeholder="Ex: Mechanical Engineer" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <div className="space-y-2">
                                <label htmlFor="">Start Time</label>
                                <div className="flex gap-5 flex-col sm:flex-row">
                                    <FormField
                                        control={form.control}
                                        name="startYear"
                                        render={({ field }) => (
                                            <FormItem className='sm:w-1/2'>
                                                {/* <FormLabel>From Year</FormLabel> */}
                                                <FormControl className="focus:ring focus-visible:ring-cyan-400 focus-visible:ring-offset-0">
                                                    <SelectWithSearch data={YEARS} type='Year' defaultValue={field.value} onSelect={field.onChange} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="startMonth"
                                        render={({ field }) => (
                                            <FormItem className='sm:w-1/2'>
                                                {/* <FormLabel>To Year</FormLabel> */}
                                                <FormControl className="focus:ring focus-visible:ring-cyan-400 focus-visible:ring-offset-0">
                                                    <SelectWithSearch data={MONTHS} type='Month' defaultValue={field.value} onSelect={field.onChange} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="">Start Time</label>
                                <div className="flex gap-5 flex-col sm:flex-row">

                                    <FormField
                                        control={form.control}
                                        name="endYear"
                                        render={({ field }) => (
                                            <FormItem className='sm:w-1/2'>
                                                {/* <FormLabel>From Year</FormLabel> */}
                                                <FormControl className="focus:ring focus-visible:ring-cyan-400 focus-visible:ring-offset-0">
                                                    <SelectWithSearch data={YEARS} type='Year' defaultValue={field.value} onSelect={field.onChange} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="endMonth"
                                        render={({ field }) => (
                                            <FormItem className='sm:w-1/2'>
                                                {/* <FormLabel>To Year</FormLabel> */}
                                                <FormControl className="focus:ring focus-visible:ring-cyan-400 focus-visible:ring-offset-0">
                                                    <SelectWithSearch data={MONTHS} type='Month' defaultValue={field.value} onSelect={field.onChange} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
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
                        <Button type="submit" variant="secondary" onClick={form.handleSubmit(onSubmit)}>Save</Button>
                    </div>

                    <DialogClose asChild>
                        <Button type="reset" variant="outline" onClick={() => form.reset()} >
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}

export default ExperienceFormModal