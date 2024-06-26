import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "./ui/scroll-area"
import { FaEdit } from "react-icons/fa"
import { AiOutlineAppstoreAdd } from "react-icons/ai"

interface ModalDialogProps {
    children: React.ReactNode
    edit?: boolean
    title: string
}


export default function ModalDialog({ children, edit, title }: ModalDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size={"icon"}>{edit ? <FaEdit /> : <AiOutlineAppstoreAdd size={20} />}</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {/* <DialogDescription>
                        Anyone who has this link will be able to view this.
                    </DialogDescription> */}
                </DialogHeader>

                <ScrollArea className="max-h-[450px] px-3">
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
