export interface Experience {
    company: string
    position: string
    startYear: string
    startMonth: string
    endYear: string
    endMonth: string
    description: string
}

export interface Education {
    school: string
    field: string
    degree: string
    startYear: string
    endYear: string
    description: string
}

export interface User {
    id: string
    name: string
    email: string
    introduction: string
    about: string
    country: string
    city: string
    softwareSkills: string[]
    specializedIn: string[]
    college: string
    role: string
    profilePic: string
    experiences: Experience[]
    education: Education[]
}

export interface FileDetails {
    name: string
    url: string
}

export interface Question {
    id: string
    user_id: string
    question: string
    slug: string
    description: string
    category: string
    software: string
    fileDetails: FileDetails[]
    views: number
    answer_count: number
    tags: string[]
    createdAt: number
}