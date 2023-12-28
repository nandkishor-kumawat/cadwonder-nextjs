export interface Experience {
    id?: string
    company: string
    position: string
    startYear: string
    startMonth: string
    endYear: string
    endMonth: string
    description: string
}

export interface Education {
    id?: string
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
    username: string
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
    description?: string
    category: string
    software?: string
    file_details?: FileDetails[]
    views: number
    answer_count: number
    tags?: string[]
    createdAt: number
}

export interface Answer {
    id: string
    user_id: string
    question_id: string
    answer: string
    file_details: FileDetails[]
    createdAt: number
}

export interface Comment {
    id: string
    association_id: string
    comment: string
    user_id: string
    createdAt: number
}


export interface Model {
    id: string
    user_id: string
    modelName: string
    description: string
    slug: string
    category: string[]
    file_details: FileDetails[]
    createdAt: number
}