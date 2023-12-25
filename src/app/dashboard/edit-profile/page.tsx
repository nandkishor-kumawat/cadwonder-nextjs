"use client"
import BoxModel from '@/components/BoxModel'
import ModalDialog from '@/components/ModalDialog'
import EducationDetailCard from '@/components/edit-profile/EducationDetailCard'
import EducationFormModal from '@/components/edit-profile/EducationFormModal'
import ExperienceDetailCard from '@/components/edit-profile/ExperienceDetailCard'
import ExperienceFormModal from '@/components/edit-profile/ExperienceFormModal'
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
    name: z.string().min(3, {
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
            name: "",
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

    const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const dataURI = URL.createObjectURL(e.target.files![0])
        const blob = await fetch(dataURI).then((res) => res.blob());
        // setProfilePic(blob);
        setProfilePic(e.target.files![0]);
    }

    const [Experience, setExperience] = useState([
        {
            "company": "ABC Corporation",
            "position": "Software Engineer",
            "startYear": "2020",
            "startMonth": "January",
            "endYear": "2022",
            "endMonth": "December",
            "description": "Developed and maintained software applications for the company."
        },
        {
            "company": "XYZ Tech Solutions",
            "position": "Data Analyst",
            "startYear": "2019",
            "startMonth": "June",
            "endYear": "2021",
            "endMonth": "November",
            "description": "Analyzed and interpreted data to provide insights for business decision-making."
        },
        {
            "company": "123 Marketing Agency",
            "position": "Digital Marketing Specialist",
            "startYear": "2018",
            "startMonth": "March",
            "endYear": "2020",
            "endMonth": "September",
            "description": "Executed digital marketing campaigns and optimized online presence."
        },
        {
            "company": "Tech Innovators Inc.",
            "position": "Product Manager",
            "startYear": "2017",
            "startMonth": "August",
            "endYear": "2019",
            "endMonth": "July",
            "description": "Led cross-functional teams in the development and launch of innovative products."
        },
        {
            "company": "Global Finance Group",
            "position": "Financial Analyst",
            "startYear": "2016",
            "startMonth": "January",
            "endYear": "2018",
            "endMonth": "May",
            "description": "Conducted financial analysis and prepared reports for investment decisions."
        }
    ])

    const [Education, setEducation] = useState([
        {
            "school": "University A",
            "field": "Computer Science",
            "degree": "Bachelor of Science",
            "startYear": "2018",
            "endYear": "2022",
            "description": "Studied computer science with a focus on algorithms and software development."
        },
        {
            "school": "College B",
            "field": "Business Administration",
            "degree": "Master of Business Administration",
            "startYear": "2016",
            "endYear": "2018",
            "description": "Pursued an MBA with a specialization in strategic management and entrepreneurship."
        },
        {
            "school": "High School C",
            "field": "Science",
            "degree": "High School Diploma",
            "startYear": "2012",
            "endYear": "2016",
            "description": "Completed high school with a focus on science subjects and extracurricular activities."
        },
        {
            "school": "Technical Institute D",
            "field": "Electrical Engineering",
            "degree": "Associate Degree",
            "startYear": "2014",
            "endYear": "2016",
            "description": "Studied electrical engineering with hands-on experience in circuits and electronics."
        },
        {
            "school": "Language School E",
            "field": "Languages",
            "degree": "Certificate in French",
            "startYear": "2019",
            "endYear": "2020",
            "description": "Attended language school to obtain a certificate in French language proficiency."
        }
    ])


    return (
        <>
            <div className="fixed top-0 left-0 right-0 px-4 py-1 bg-white border-b-slate-200 border-b z-10" style={{ background: bg1 }}>
                <div className="flex items-center justify-between py-1">
                    <p className="text-white text-lg">Edit Profile</p>

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
                            name="name"
                            render={({ field }) => (
                                <FormItem aria-required>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
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
                                    <FormLabel>Introduction</FormLabel>
                                    <FormControl>
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
                                    <FormControl>
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
                                        <FormControl>
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
                                        <FormControl>
                                            <ModalDialog edit={!!field.value.length} title='Edit Software Skills'>
                                                <BoxModel data={SoftwareSkills} max={4} selectedItems={field.value} handleSave={field.onChange} />
                                            </ModalDialog>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <div className='flex flex-wrap gap-1'>
                                {
                                    form.watch('softwareSkills').map((item, index) => (
                                        <Button key={index} variant="outline" type='button' className='px-2 py-1 text-xs h-6 mr-1 select-none'>{item}</Button>
                                    ))
                                }
                            </div>
                        </div>

                        <div className='my-3'>
                            <FormField
                                control={form.control}
                                name="specializedIn"
                                render={({ field }) => (
                                    <FormItem className='flex items-center justify-between'>
                                        <FormLabel>Specialized In</FormLabel>
                                        <FormControl>
                                            <ModalDialog edit={!!field.value.length} title='Edit specializations'>
                                                <BoxModel data={SpecializedIn} max={4} selectedItems={field.value} handleSave={field.onChange} />
                                            </ModalDialog>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <div className='flex flex-wrap gap-1'>
                                {
                                    form.watch('specializedIn').map((item, index) => (
                                        <Button key={index} variant="outline" type='button' className='px-2 py-1 text-xs h-6 mr-1 select-none'>{item}</Button>
                                    ))
                                }
                            </div>
                        </div>



                    </form>
                </Form>

                <div className='my-3'>
                    <div className="flex items-center justify-between">
                        <p>Work Experience</p>
                        <ExperienceFormModal />
                    </div>
                    <div className="flex flex-col gap-2">
                        {Experience.map((data, index) => (
                            <ExperienceDetailCard key={index} data={data} />
                        ))}
                    </div>
                </div>

                <div className='my-3'>
                    <div className="flex items-center justify-between">
                        <p>Education</p>
                        <EducationFormModal />
                    </div>
                    <div className="flex flex-col gap-2">
                        {Education.map((data, index) => (
                            <EducationDetailCard key={index} data={data} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProfile