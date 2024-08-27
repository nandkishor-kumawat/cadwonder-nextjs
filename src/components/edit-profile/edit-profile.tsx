"use client"
import BoxModel from '@/components/BoxModel'
import ModalDialog from '@/components/ModalDialog'
import EducationDetailCard from '@/components/edit-profile/EducationDetailCard'
import EducationFormModal from '@/components/edit-profile/EducationFormModal'
import ExperienceDetailCard from '@/components/edit-profile/ExperienceDetailCard'
import ExperienceFormModal from '@/components/edit-profile/ExperienceFormModal'
import { SelectWithSearch } from '@/components/form/SelectWithSearch'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FaLink, FaLinkedin, FaTwitterSquare, FaInstagram, } from 'react-icons/fa';
import { InputElement, InputGroup, InputItem } from '@/components/ui/input-group'
import Link from 'next/link'
import { collection, doc, onSnapshot, query } from 'firebase/firestore'
import { db } from '@/firebase'
import { useSession } from '@/hooks'
import ProfilePicUploader from '@/components/edit-profile/profile-pic-uploader'
import Overlay from '@/components/loaders/overlay'
import { updateProfile } from '@/actions'
import { toast } from 'sonner'
import { bg1, countries, SoftwareSkills, SpecializedIn } from '@/data'

interface linkType {
    name: string
    placeholder: string
    Icon: React.FC<React.SVGProps<SVGSVGElement>>
    regex: RegExp
    pattern: string
}

const SocialLinks: linkType[] = [
    {
        name: 'twitter',
        placeholder: "Twitter URL",
        Icon: FaTwitterSquare,
        regex: /https?:\/\/(?:www\.)?twitter\.com\/(?:#!\/)?(\w+)\/?$/,
        pattern: "https?:\/\/(?:www\.)?twitter\.com\/(?:#!\/)?(\w+)\/?$"
    },
    {
        name: 'linkedin',
        placeholder: "LinkedIn URL",
        Icon: FaLinkedin,
        regex: /https?:\/\/(?:www\.)?linkedin\.com\/in\/([\w-]+)\/?$/,
        pattern: "https?:\/\/(?:www\.)?linkedin\.com\/in\/([\w-]+)\/?$"
    },
    {
        name: 'instagram',
        placeholder: "Instagram URL",
        Icon: FaInstagram,
        regex: /https?:\/\/(?:www\.)?instagram\.com\/([\w.-]+)\/?$/,
        pattern: "https?:\/\/(?:www\.)?instagram\.com\/([\w.-]+)\/?$"
    },
    {
        name: 'website',
        placeholder: "Your Website Link",
        Icon: FaLink,
        regex: /https?:\/\/(?:www\.)?([a-zA-Z0-9.-]+)\.[a-zA-Z]{2,}(\/[^\s]*)?$/,
        pattern: "https?:\/\/(?:www\.)?([a-zA-Z0-9.-]+)\.[a-zA-Z]{2,}(\/[^\s]*)?$"
    }
]

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
    const { session } = useSession();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: session?.user?.name ?? "",
            introduction: "",
            about: "",
            country: "",
            city: "",
            softwareSkills: [],
            specializedIn: [],
        }
    });

    const user_id = session?.user?.id as string;

    const [profilePic, setProfilePic] = useState('');
    const [coverPic, setCoverPic] = useState('');

    const socialsRef = React.useRef<React.RefObject<HTMLInputElement>[]>([]);
    const [socialLinks, setSocialLinks] = useState<Record<string, string>>({
        twitter: '',
        linkedin: '',
        instagram: '',
        website: ''
    });


    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(values: z.infer<typeof formSchema>) {

        const [twitter, linkedin, instagram, website] = socialsRef.current.map(ref => ref.current?.value);

        const socials = {
            twitter,
            linkedin,
            instagram,
            website
        }

        setIsLoading(true);

        await updateProfile({ ...values, socials }, user_id)
        setIsLoading(false);

        toast.success(`Profile updated successfully`, {
            style: {
                color: 'green'
            }
        });
    }

    const [Experience, setExperience] = useState([]);
    const [Education, setEducation] = useState([]);

    useEffect(() => {
        if (!user_id) return;

        const q = query(collection(db, `users/${user_id}/workExperience`));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            let d = [] as any;
            snapshot.forEach((doc) => {
                d.push({ id: doc.id, ...doc.data() })
            })
            setExperience(d);
        });
        return () => unsubscribe()
    }, [user_id]);

    useEffect(() => {
        if (!user_id) return;

        const q = query(collection(db, `users/${user_id}/Education`));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            let d = [] as any;
            snapshot.forEach((doc) => {
                d.push({ id: doc.id, ...doc.data() })
            })
            setEducation(d);
        });
        return () => unsubscribe()
    }, [user_id]);

    useEffect(() => {
        if (!user_id) return;

        const docRef = doc(db, `users/${user_id}`);
        const unsubscribe = onSnapshot(docRef, (doc) => {
            const data = doc.data();
            if (!data) return;
            form.setValue('name', data.name);
            form.setValue('introduction', data?.introduction);
            form.setValue('about', data?.about);
            form.setValue('country', data?.country);
            form.setValue('city', data?.city);
            form.setValue('softwareSkills', data?.softwareSkills ?? []);
            form.setValue('specializedIn', data?.specializedIn ?? []);
            setProfilePic(data?.profilePicture);
            setCoverPic(data?.coverPicture);
            setSocialLinks({
                twitter: data?.socials?.twitter ?? '',
                linkedin: data?.socials?.linkedin ?? '',
                instagram: data?.socials?.instagram ?? '',
                website: data?.socials?.website ?? ''
            })
        });
        return () => unsubscribe()

    }, [user_id, form]);

    if (!session) return null;
    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 z-50">
            {isLoading && <Overlay />}
            <div className="sticky top-0 px-4 py-1 bg-white border-b-slate-200 border-b z-10 h-header flex items-center" style={{ background: bg1 }}>
                <div className="flex items-center justify-between py-1 flex-1">
                    <p className="text-white text-lg">Edit Profile</p>

                    <div className="flex items-center gap-2">
                        <Link href="./" className='text-white py-2 px-3' >Cancel</Link>

                        <Button className="bg-orange-500 hover:bg-orange-600"
                            onClick={form.handleSubmit(onSubmit)}
                        >{isLoading ? "Updating..." : "Update Profile"}</Button>
                    </div>
                </div>
            </div>



            <div className="container max-w-3xl py-4">
                <div className='flex items-center justify-center flex-col mt-2'>
                    <p>Profile Picture</p>
                    <ProfilePicUploader pic={profilePic} ratio={1} canvasWidth={150} type='profile' handleSave={setProfilePic} />
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



                        <div className="my-2">
                            <p className="">Cover photo</p>
                            <ProfilePicUploader pic={coverPic} handleSave={setCoverPic} />
                        </div>

                        <div className="flex gap-5 flex-col sm:flex-row">
                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem className='sm:w-1/2'>
                                        <FormLabel>Location</FormLabel>
                                        <FormControl>
                                            <SelectWithSearch data={countries} type="country" defaultValue={field.value.trim()} onSelect={field.onChange} />
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
                            <ExperienceDetailCard key={index} data={data} edit />
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
                            <EducationDetailCard key={index} data={data} edit />
                        ))}
                    </div>
                </div>


                <div className="social my-2">
                    <h1>Links on the web</h1>
                    <div>
                        {SocialLinks.map((data, index) => {
                            const { Icon, name, placeholder, pattern } = data;
                            socialsRef.current[index] = React.createRef<HTMLInputElement>();
                            return (
                                <InputGroup key={placeholder} className='my-3'>
                                    <InputElement>
                                        <Icon />
                                    </InputElement>
                                    <InputItem pattern={pattern} defaultValue={socialLinks[name]} ref={socialsRef.current[index]} placeholder={placeholder} type="text" className='pr-2' />
                                </InputGroup>
                            )
                        })}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default EditProfile