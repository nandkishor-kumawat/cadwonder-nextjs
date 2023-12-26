import React from 'react'
import { Button } from './ui/button'
import { IoMdClose } from 'react-icons/io'
import { Progress } from './ui/progress'

export default function UploadFileCard({ file, index, handleRemoveFile, progress }: any) {
    return (
        <div key={index} className="py-1 flex flex-col" >
            <div className="flex items-center justify-between gap-2 border-t border-gray-500 py-2">
                <p className="text-sm">{file.name}</p>
                <Button
                    type="button"
                    variant={"ghost"}
                    onClick={() => handleRemoveFile(file)}
                    className="h-6 w-6 p-1 mr-1 text-red-500 hover:text-red-600"
                    disabled={progress > 0}
                    aria-disabled={progress > 0}
                >
                    <IoMdClose />
                </Button>
            </div>
            <Progress className="rounded-none" value={progress} />
        </div>
    )
}
