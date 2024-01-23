import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai'
import { Slider } from '../ui/slider';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { uploadFile } from '@/firebase/functions';
import { useSession } from 'next-auth/react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';

interface Props {
  ratio?: number,
  type?: string,
  canvasWidth?: number
  handleSave: React.Dispatch<React.SetStateAction<string>>
  pic?: string | null
}

const ProfilePicUploader = ({
  ratio = 9 / 32,
  type = "cover",
  canvasWidth,
  handleSave,
  pic
}: Props) => {
  const { data: session } = useSession();

  const editorRef = useRef<AvatarEditor>(null);
  const bxref = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [windowWidth, setWindowWidth] = useState(0);
  const [scale, setScale] = useState(1);

  const [picFull, setPicFull] = useState<Blob | null>(null);
  const [image, setImage] = useState<string>('');
  const [image1, setImage1] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (pic) {
      setImage1(pic);
    }
  }, [pic]);


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(canvasWidth ?? bxref.current!.clientWidth);
    };

    if (bxref.current && image) handleResize()

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [canvasWidth, image]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const dataURI = URL.createObjectURL(file);
    setImage(dataURI);
    const blob = await fetch(dataURI).then((res) => res.blob());
    setPicFull(blob);
    fileInputRef.current!.value = ''; // Reset the value of the file input
  };

  const handleSaveImage = async () => {
    if (editorRef.current) {
      setIsLoading(true);
      const canvas = editorRef.current.getImage();
      const dataURI = canvas.toDataURL('image/jpeg')
      const blob = await fetch(dataURI).then((res) => res.blob());
      const { url } = await uploadFile(blob, `${session?.user?.id}-${type}.jpg`);
      handleSave(url);
      await updateDoc(doc(db, 'users', session?.user?.id as string), {
        [`${type}Picture`]: url
      });
      setIsLoading(false);
    }
  };

  const removeImage = () => {
    setImage('');
    setImage1('');
  }

  const handleZoomChange = ([value]: number[]) => {
    setScale(value);
  };

  return (
    <div className='my-2'>
      {pic && !image && (
        <div className='w-full'>
          <Image
            className={`m-auto ${ratio === 1 ? 'rounded-full' : 'rounded-lg'}`}
            style={{
              border: '1px solid silver',
              width: ratio === 1 ? canvasWidth : '100%',
              objectFit: 'cover',
              height: 'auto'
            }}
            priority={true}
            width={200}
            height={200}
            alt='profile'
            src={pic} />
        </div>
      )}
      {image && (
        <>
          <div className='w-full' ref={bxref}>
            <AvatarEditor
              className={`m-auto ${ratio === 1 ? 'rounded-full' : 'rounded-lg'}`}
              ref={editorRef}
              image={image}
              width={windowWidth}
              height={windowWidth * ratio}
              border={0}
              color={[0, 0, 0, 0.3]} // RGBA
              scale={scale}
            />
          </div>

          <div className='flex gap-2 my-2 justify-center items-center'>
            <Button
              type='button'
              className='m-auto'
              onClick={() => setScale(prev => prev - 0.1)}
              disabled={scale <= 1}
            >
              <AiOutlineZoomOut size={20} />
            </Button>

            <Slider
              defaultValue={[1]}
              value={[scale]}
              onValueChange={handleZoomChange}
              min={1}
              max={3}
              step={0.1}
            />

            <Button
              type='button'
              className=''
              onClick={() => setScale(prev => prev + 0.1)}
              disabled={scale >= 3}
            >
              <AiOutlineZoomIn size={20} />
            </Button>

          </div>
        </>
      )}

      <div className={`my-2 flex gap-2 ${ratio === 1 ? 'justify-center' : ''}`}>
        <Button
          type='button'
          variant={'outline'}
          onClick={() => fileInputRef.current!.click()}
        >
          Upload image
        </Button>

        {image && (
          <>
            <Button type='button' onClick={handleSaveImage} disabled={isLoading}>{isLoading ? 'Saving...' : 'Set image'}</Button>
            <Button type='button' variant={'destructive'} onClick={removeImage}>Remove image</Button>
          </>
        )}
      </div>

      <Input
        ref={fileInputRef} // Assign the ref to the file input
        id="coverPic"
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={handleImageChange}
        className='hidden'
      />
    </div>
  );
};

export default ProfilePicUploader;
