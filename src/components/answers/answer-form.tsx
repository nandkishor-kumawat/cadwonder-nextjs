"use client"
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useSession } from '@/hooks'
import { Button } from '../ui/button'
import { useFormStatus } from 'react-dom'
import { postAnswer } from '@/actions'
import { Textarea } from '../ui/textarea'
import { Skeleton } from '../ui/skeleton'
import { uploadFileWithProgress } from '@/firebase/functions'
import UploadFileCard from '../upload-file-card'
import Overlay from '../loaders/overlay'
import { Answer, FileDetails } from '@prisma/client'


interface Props {
  question_id: string
}

const SubmitButton = () => {
  const { pending } = useFormStatus()
  return (
    <>
      <Button
        disabled={pending}
        aria-disabled={pending}
        type='submit'
        className="rounded-none py-1 h-8 bg-orange-400 hover:bg-orange-500"
      >{pending ? 'Posting...' : 'Post Answer'}</Button>
      {pending && <Overlay />}
    </>
  )
}


export default function AnswerForm({ question_id }: Props) {
  const { session } = useSession();

  const user = session?.user;

  const [uploadProgress, setUploadProgress] = useState<Record<number, number>>({});
  const [files, setFiles] = useState<File[]>([]);
  const formRef = React.useRef<HTMLFormElement>(null);


  const handleRemoveFile = (fileToRemove: File) => {
    const updatedFiles = files.filter(file => file !== fileToRemove);
    setFiles(updatedFiles);
  };

  const handleUploadFiles = async (files: File[]) => {
    if (!files) return;

    const uploadPromises = files.map((file, index) => {
      return uploadFileWithProgress(file, index, (progressIndex, progress) => {
        setUploadProgress((prevProgress) => ({
          ...prevProgress,
          [progressIndex]: progress,
        }));
      });
    });

    try {
      const results = await Promise.all(uploadPromises);
      return results;
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    if (!user) return;
    let fileDetails = [] as FileDetails[];

    if (files.length) {
      fileDetails = await handleUploadFiles(files) as FileDetails[];
    }
    const body = {
      questionId: question_id,
      answer: formData.get('answer') as string,
      fileDetails: fileDetails,
      userId: user?.id,
    } as Answer;

    await postAnswer(body);
    formRef.current?.reset();
    setFiles([]);
    setUploadProgress({});
  }


  // if (!user) return (
  //   <div className="flex gap-2 items-start mt-5 mb-2">
  //     <Skeleton className='w-10 h-10 rounded-full' />
  //     <div className="flex-col flex flex-1 gap-2">
  //       <Skeleton className='flex-grow h-32' />
  //       <div className='flex gap-2 items-center'>
  //         <Skeleton className='w-20 h-7' />
  //         <Skeleton className='w-20 h-5' />
  //       </div>
  //     </div>
  //   </div>
  // )


  return (
    <form
      ref={formRef}
      action={handleSubmit}
    >

      <div className="py-2 my-1">
        <div className="flex gap-2 items-start">
          <Avatar className='w-10 h-10'>
            <AvatarImage src={user?.profilePicture} width={48} height={48} />
            <AvatarFallback>{user?.name[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-col flex w-full gap-2">
            <Textarea
              name='answer'
              placeholder="Write your answer"
              className="rounded-none w-full"
              rows={8}
              required
            />
            <div className='flex gap-2 items-center'>
              <SubmitButton />
              <div>
                <label htmlFor='fileInput' className="font-medium cursor-pointer">Attach a file</label>
                <input type="file" id='fileInput' className="hidden" name='files' multiple onChange={(e) => setFiles(Array.from(e.target.files || []))} />
              </div>
            </div>

            <div className="flex flex-col gap-2 my-2">
              {files.map((file, index) => (
                <UploadFileCard key={index} file={file} index={index} handleRemoveFile={handleRemoveFile} progress={uploadProgress[index]} />
              ))}
            </div>
          </div>

        </div>

      </div>
    </form>
  )
}
