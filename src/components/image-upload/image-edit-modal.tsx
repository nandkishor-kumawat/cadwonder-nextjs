"use client"

import 'react-image-crop/dist/ReactCrop.css'
import React, { useState, useRef, useEffect } from 'react'
import ReactCrop, { Crop, PixelCrop, } from 'react-image-crop'
import { Dialog, DialogContent } from '../ui/dialog'
import { Button } from '../ui/button'
import { imgPreview } from './imgPreview'
import { MdCancel, MdOutlineRotate90DegreesCcw } from 'react-icons/md'
import { BiZoomIn, BiZoomOut } from 'react-icons/bi'
import { extractText } from '@/lib/functions'

interface Props {
	onUpload: (text: string, url: string) => void;
	file?: File;
	handleClose: () => void;
}


export default function ImageSearchUpload({
	onUpload,
	file,
	handleClose
}: Props) {

	const [imgSrc, setImgSrc] = useState('')
	const imgRef = useRef<HTMLImageElement>(null)
	const [crop, setCrop] = useState<Crop>()
	const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
	const [scale, setScale] = useState(1)
	const [rotate, setRotate] = useState(0)
	const [aspect, setAspect] = useState<number | undefined>(16 / 9);
	const [Open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);


	useEffect(() => {
		if (!file) return
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			setImgSrc(reader.result as string)
			setOpen(true);
		}
	}, [file])

	function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
		// if (aspect) {
		// 	const { width, height } = e.currentTarget
		// 	setCrop(centerAspectCrop(width, height, aspect))
		// }
	}


	async function onCrop() {
		const { blob, link } = await imgPreview(imgRef.current!, completedCrop!, scale, rotate);
		if (!blob) return
		setIsLoading(true);
		const text = await extractText(blob);
		setIsLoading(false);
		onUpload(text, link);
		setOpen(false)


		// const formData = new FormData();
		// const file = new File([blob], 'crop.png', { type: 'image/png' });
		// formData.append('file', file);

		// const data = await fetch('/api/upload', {
		// 	method: 'POST',
		// 	body: formData
		// }).then(res => res.json());


	}


	const disabled = !(completedCrop?.width && completedCrop?.height)

	return (
		<Dialog open={Open}>

			<DialogContent className='max-w-fit'>
				{Open && <Button
					className='absolute top-2 right-2'
					size={'icon'}
					variant={'destructive'}
					onClick={() => { handleClose(); setOpen(false); }}
				>
					<MdCancel size={30} />
				</Button>}
				<div className='space-y-1'>
					<h1 className='text-2xl font-bold'>Edit Image</h1>
					<p>Crop single question</p>
				</div>
				<ReactCrop
					crop={crop}
					onChange={(_, percentCrop) => setCrop(percentCrop)}
					onComplete={(c) => setCompletedCrop(c)}
					// aspect={aspect}
					minHeight={50}
					className='border'
				>
					<img
						ref={imgRef}
						alt="Crop me"
						src={imgSrc}
						style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
						onLoad={onImageLoad}
						className='!max-h-body !max-w-[calc(100vw_-_60px)]'

					/>
				</ReactCrop>

				<div className='space-x-2 ml-auto'>
					<Button size={'icon'} variant={'ghost'} onClick={() => setRotate(prev => prev + 90)}>
						<MdOutlineRotate90DegreesCcw size={24} />
					</Button>
					<Button size={'icon'} variant={'ghost'} onClick={() => setScale((prev) => prev + 0.1)}>
						<BiZoomIn size={24} />
					</Button>
					<Button size={'icon'} variant={'ghost'} onClick={() => setScale((prev) => prev - 0.1)}>
						<BiZoomOut size={24} />
					</Button>
				</div>

				{/* <div>
						<label htmlFor="rotate-input">Rotate: </label>
						<Slider defaultValue={[rotate]} max={360} min={0} step={1} onValueChange={([e]) => setRotate(e)} />
					</div> */}
				<div className='flex justify-end items-center gap-2'>
					<Button type='button' className='my-0' disabled={isLoading} onClick={() => { handleClose(); setOpen(false) }}>Cancel</Button>
					<Button variant={'secondary'} onClick={onCrop} disabled={isLoading || disabled} >{isLoading ? "Saving..." : "Crop"}</Button>
				</div>
			</DialogContent>
		</Dialog >
	)
}
