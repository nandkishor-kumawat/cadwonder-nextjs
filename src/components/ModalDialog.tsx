import { CopyIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import BoxModel from "./BoxModel"
import SoftwareSkills from "@/lib/data/SoftwareSkills"
import { ScrollArea } from "./ui/scroll-area"
import { FaEdit } from "react-icons/fa"
import { AiOutlineAppstoreAdd } from "react-icons/ai"

interface ModalDialogProps {
    children: React.ReactNode
    selectedItems: string[]
    title: string
}

export default function ModalDialog({ children, selectedItems, title }: ModalDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size={"icon"}>{selectedItems?.length > 0 ? <FaEdit /> : <AiOutlineAppstoreAdd size={20} />}</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {/* <DialogDescription>
                        Anyone who has this link will be able to view this.
                    </DialogDescription> */}
                </DialogHeader>

                <ScrollArea className="h-[400px] px-3">
                    {children}
                </ScrollArea>

                <DialogFooter className="sm:justify-end px-3">
                    <DialogClose asChild>
                        <Button type="button" variant="destructive">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
