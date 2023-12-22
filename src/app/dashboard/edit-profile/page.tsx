"use client"
import BoxModel from '@/components/BoxModel'
import ModalDialog from '@/components/ModalDialog'
import { SelectWithSearch } from '@/components/form/SelectWithSearch'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import SoftwareSkills from '@/lib/data/SoftwareSkills'
import SpecializedIn from '@/lib/data/SpecializedIn'
import { bg1 } from '@/lib/data/colors'
import countries from '@/lib/data/countries'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'


const formSchema = z.object({
    fullName: z.string().min(3, {
        message: "Name must be at least 3 characters",
    }),
    introduction: z.string().min(10, {
        message: "Introduction must be at least 10 characters",
    }),
    about: z.string().min(10, {
        message: "About must be at least 10 characters",
    }),
    country: z.string().refine(value => countries.includes(value), {
        message: "Select a country",
    }),
    city: z.string(),
    softwareSkills: z.string().array(),
    specializedIn: z.string().array(),
})

const EditProfile = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            introduction: "",
            about: "",
            country: "",
            city: "",
            softwareSkills: [],
            specializedIn: [],
        }
    })

    const [profilePic, setProfilePic] = useState(new Blob());

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (!form.formState.isValid) {
            return
        }
        console.table(values)
    }

    const handleImageSelect = async(e: React.ChangeEvent<HTMLInputElement>)=>{
        const dataURI = URL.createObjectURL(e.target.files![0])
        const blob = await fetch(dataURI).then((res) => res.blob());
        // setProfilePic(blob);
        setProfilePic(e.target.files![0]);
    }

    console.table(form.getValues())

    return (
        <>
            <div className="absolute top-0 left-0 right-0 px-4 py-1 bg-white border-b-slate-200 border-b z-10" style={{ background: bg1 }}>
                <div className="flex items-center justify-between py-1">
                    <p className="text-white text-lg">New Question</p>

                    <div className="flex items-center gap-2">
                        <Button className="bg-transparent">Cancel</Button>

                        <Button className="bg-orange-500 hover:bg-orange-600"
                        // onClick={uploadFiles}
                        >Update Profile</Button>
                    </div>
                </div>
            </div>



            <div className="container max-w-3xl py-4">

                <div className='flex items-center justify-center flex-col my-2'>

                    {/* {profilePic && <Image  src={{uri:profilePic}} width={200} height={200} />} */}

                    {/* <Avatar src={profilePic} /> */}


                    <label htmlFor="avatar">Change Picture</label>

                    <Input id="avatar" type="file" className='hidden' onChange={handleImageSelect} accept=".jpg,.jpeg,.png" />





                </div>

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
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="introduction"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel>Email address</FormLabel>
                                    <FormControl className="focus:ring focus-visible:ring-cyan-400 focus-visible:ring-offset-0">
                                        <Input placeholder="Write a short tagline about yourself..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="about"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel>About</FormLabel>
                                    <FormControl className="focus:ring focus-visible:ring-cyan-400 focus-visible:ring-offset-0">
                                        <Textarea placeholder="Describe yourself, your interests and specialities..." rows={5} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <div className="flex gap-5 flex-col sm:flex-row">
                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem className='sm:w-1/2'>
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
                                name="city"
                                render={({ field }) => (
                                    <FormItem className='sm:w-1/2'>
                                        <FormLabel>City</FormLabel>
                                        <FormControl className="focus:ring focus-visible:ring-cyan-400 focus-visible:ring-offset-0">
                                            <Input placeholder="Enter your city" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>


                        <div className='my-3'>

                            <FormField
                                control={form.control}
                                name="softwareSkills"
                                render={({ field }) => (
                                    <FormItem className='flex items-center justify-between'>
                                        <FormLabel>Software Skills</FormLabel>
                                        <FormControl className="focus:ring focus-visible:ring-cyan-400 focus-visible:ring-offset-0">
                                            <ModalDialog selectedItems={field.value} title='Edit Software Skills'>
                                                <BoxModel data={SoftwareSkills} max={4} selectedItems={field.value} handleSave={field.onChange} />
                                            </ModalDialog>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {
                                form.watch('softwareSkills').map((item) => (
                                    <Button variant="outline" type='button' className='px-2 py-1 text-xs h-6 mr-1 select-none'>{item}</Button>
                                ))
                            }
                        </div>

                        <div className='my-3'>
                            <FormField
                                control={form.control}
                                name="specializedIn"
                                render={({ field }) => (
                                    <FormItem className='flex items-center justify-between'>
                                        <FormLabel>Specialized In</FormLabel>
                                        <FormControl className="focus:ring focus-visible:ring-cyan-400 focus-visible:ring-offset-0">
                                            <ModalDialog selectedItems={field.value} title='Edit specializations'>
                                                <BoxModel data={SpecializedIn} max={4} selectedItems={field.value} handleSave={field.onChange} />
                                            </ModalDialog>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {
                                form.watch('specializedIn').map((item) => (
                                    <Button variant="outline" type='button' className='px-2 py-1 text-xs h-6 mr-1 select-none'>{item}</Button>
                                ))
                            }
                        </div>





                        <div>

                        </div>
                    </form>
                </Form>

            </div>
        </>
    )
}

export default EditProfile