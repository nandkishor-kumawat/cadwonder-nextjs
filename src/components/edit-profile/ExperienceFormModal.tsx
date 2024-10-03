"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
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
import { Experience } from '@prisma/client'
import { MONTHS, YEARS } from '@/data/time-period'
import { dashboardActions } from '@/actions'
import { useSession } from '@/hooks'
import { useFormStatus } from 'react-dom'
import Overlay from '../loaders/overlay'

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
    const { session } = useSession();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            company: "",
            position: "",
            startYear: "",
            startMonth: "",
            endYear: "",
            endMonth: "",
            description: "",
        }
    });

    useEffect(() => {
        if (data) {
            form.reset({
                company: data?.company,
                position: data?.position,
                startYear: data?.startYear,
                startMonth: data?.startMonth,
                endYear: data?.endYear,
                endMonth: data?.endMonth,
                description: data?.description
            })
        }
    }, [data, form])

    const [isLoading, setIsLoading] = React.useState(false);
    const closeBtnRef = React.useRef<HTMLButtonElement>(null);
    const [isPending, startTransition] = React.useTransition();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        startTransition(async () => {
            setIsLoading(true);
            const res = await dashboardActions.addExperience({ id: data?.id!, userId: session?.user.id!, ...values }, session?.user)
            form.reset()
            console.table(res);
            setIsLoading(false);
            closeBtnRef.current?.click();
        })
    }


    const DeleteButton = () => {
        const { pending } = useFormStatus()
        return (
            <>
                {pending && <Overlay />}
                <Button variant="destructive" disabled={pending}>{pending ? "Deleting..." : "Delete"}</Button>
            </>
        )
    }


    if (!data) return null;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size={"icon"}>{data ? <FaEdit size={18} /> : <AiOutlineAppstoreAdd size={20} />}</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                {isLoading && <Overlay />}
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
                                        <FormControl>
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
                                        <FormControl>
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
                                                <FormControl>
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
                                                <FormControl>
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
                                                <FormControl>
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
                                                <FormControl>
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
                            <form action={dashboardActions.deleteExperience}>
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
                        <Button ref={closeBtnRef} type="reset" variant="outline" onClick={() => form.reset()} >
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}

export default ExperienceFormModal