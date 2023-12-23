"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"



interface SelectWithSearchProps {
    data: string[]
    type: string
    onSelect: (value: string) => void,
    defaultValue?: string
}

export function SelectWithSearch({ data, type, onSelect, defaultValue }: SelectWithSearchProps) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(defaultValue?.toLowerCase() ?? "")


    const filteredData = data.map((item) => ({
        label: item,
        value: item.toLowerCase()
    }))


    const handleSelect = (currentValue: string) => {
        // setValue(currentValue === value ? "" : currentValue)
        setValue(currentValue)
        setOpen(false);
    }

    React.useEffect(() => {
        const selected = data.find((item) => item.toLowerCase() === value.toLowerCase()) ?? ""
        onSelect(selected);
    }, [value, type]);


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value
                        ? filteredData.find((framework) => framework.value === value)?.label
                        : `Select ${type}...`}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 z-[100]">
                <Command>
                    <CommandInput placeholder={`Search ${type}...`} className="h-9" />
                    <CommandEmpty>No {type} found.</CommandEmpty>
                    <ScrollArea className="h-72">
                        <CommandGroup>
                            {filteredData.map((framework) => (
                                <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={handleSelect}
                                >
                                    {framework.label}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            value === framework.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </ScrollArea>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
