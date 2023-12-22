"use client"
import React, { useState } from 'react'
import { FormControl, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const PasswordInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    return (

            <div className="relative">
                <FormControl className="focus:ring focus-visible:ring-cyan-400 focus-visible:ring-offset-0">
                    <Input type={isPasswordVisible ? "text" : "password"} placeholder="Enter your password" {...props} />
                </FormControl>
                <button type="button" className="h-full aspect-square grid place-content-center absolute top-0 right-0" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                    {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                </button>
            </div>

    )
}

export default PasswordInput