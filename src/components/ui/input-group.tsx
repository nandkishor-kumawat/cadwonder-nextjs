"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const InputGroup = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex bg-white focus-within:ring-2 focus-within:ring-sky-500 focus-within:ring-offset-0 relative rounded-sm overflow-hidden transition-shadow ease-linear duration-200",
            className
        )}
        {...props}
    />
))
InputGroup.displayName = "InputGroup"


const InputElement = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "basis-10 l-0 t-0 grid place-content-center",
            className
        )}
        {...props}
    />
))
InputElement.displayName = "InputElement"


const InputRightElement = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "h-10 l-0 t-0 grid place-content-center",
            className
        )}
        {...props}
    />
))
InputRightElement.displayName = "InputRightElement"



const InputItem = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex w-full justify-self-stretch border-none bg-background py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-5",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
InputItem.displayName = "InputItem"


export { InputGroup, InputElement, InputRightElement, InputItem }




