import React from 'react'
import { Input } from './input';

interface Props {
    tags: string[],
    setTags: (tags: string[]) => void
}

const TagsInput = ({ tags, setTags }: Props) => {

    const addTags = (e: any) => {
        e.preventDefault();
        if (tags.length >= 6) return;

        if (e.key === "," || e.key === " ") {
            let tag = e.target.value.split(',')[0];
            if (tag === "") return;
            setTags([...tags, tag]);
            e.target.value = "";
        }
    };

    const removeTags = (index: number) => {
        setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
    };

    return (
        <div className="flex flex-col border rounded">
            <Input
                className='flex-1 text-sm'
                type="text"
                onKeyUp={addTags}
                placeholder="Press enter to add tags"
            />

            <ul className='flex items-center text-white list-none gap-2'>
                {tags.map((tag, index) => (
                    <li key={index} className="rounded-sm bg-[#0052cc] pl-2 py-1 flex items-center my-2">
                        <span className='text-xs'>{tag}</span>
                        <span className='p-1 px-2 text-center cursor-pointer text-[10px]'
                            onClick={() => removeTags(index)}
                        >
                            x
                        </span>
                    </li>
                ))}
            </ul>

        </div>

    )
}
export default TagsInput