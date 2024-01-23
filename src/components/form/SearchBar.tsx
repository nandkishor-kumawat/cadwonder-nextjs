'use client';
import { useDebouncedCallback } from 'use-debounce';
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import { Input } from '../ui/input'
import { SelectWithSearch } from './SelectWithSearch';
import SoftwareSkills from '@/lib/data/SoftwareSkills';
import categories from '@/lib/data/category';

const SearchBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((key: string, query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set(key, query);
    } else {
      params.delete(key);
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="my-2 space-y-3">
      <div className='w-full flex items-center relative'>
        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none h-full aspect-square '>
          <HiOutlineSearch className="text-gray-400" />
        </div>
        <Input
          onChange={(e) => handleSearch('query', e.target.value)}
          defaultValue={searchParams.get('query')?.toString()}
          placeholder="Search"
          className="pl-[40px]" />
      </div>
      {/* <div className='flex gap-4'>
        <SelectWithSearch data={categories} type='Category' onSelect={(value) => handleSearch('category', value)} defaultValue={searchParams.get('category')?.toString()} />
        <SelectWithSearch data={SoftwareSkills} type='Software' onSelect={(value) => handleSearch('software', value)} defaultValue={searchParams.get('software')?.toString()} />
      </div> */}
    </div>
  )
}

export default SearchBar