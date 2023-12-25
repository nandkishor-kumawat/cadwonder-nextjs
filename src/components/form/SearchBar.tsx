'use client';
import { useDebouncedCallback } from 'use-debounce';
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import { Input } from '../ui/input'

const SearchBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="my-2 relative">
      <div className='w-full flex items-center'>
        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none h-full aspect-square '>
          <HiOutlineSearch className="text-gray-400" />
        </div>
        <Input
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get('query')?.toString()}
          placeholder="Search"
          className="pl-[40px]" />
      </div>
    </div>
  )
}

export default SearchBar