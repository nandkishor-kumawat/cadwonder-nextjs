import React from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import { Input } from '../ui/input'

const SearchBar = () => {
  return (
    <div className="my-2 relative">
    <div className='w-full flex items-center'>
      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none h-full aspect-square '>
      <HiOutlineSearch className="text-gray-400" />
      </div>
      <Input placeholder="Search" className="focus-visible:ring-cyan-400 focus-visible:ring-offset-0 pl-[40px]" />
    </div>
  </div>
  )
}

export default SearchBar