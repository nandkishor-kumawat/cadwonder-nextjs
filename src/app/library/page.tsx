"use client"
import SearchBar from '@/components/form/SearchBar'
import ModelItem from '@/components/model/ModelItem'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { db } from '@/firebase'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function ModelList() {
  const [models, setModels] = useState([])
  const [allModels, setAllModels] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    const q = query(collection(db, "models"), orderBy('createdAt', 'desc'));
    getDocs(q).then(snapshot => {
      // console.log(snapshot.docs.length)
      let d = []
      snapshot.forEach((doc) => {
        d.push({ id: doc.id, ...doc.data() })
      });

      setModels(d);
      setAllModels(d);
      setLoading(false);
    });
  }, [])

  return (
    <div className="container max-w-4xl mx-auto px-2">
      <Link href={'/library/new'}>
        <Button className="text-lg my-4 bg-orange-400 hover:bg-orange-500">New Model</Button>
      </Link>

      <SearchBar />


      <div className="grid gap-2" style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      }}>

        {models.map((data, index) => <ModelItem key={index} data={data} />)}

      </div>

    </div>
  )
}

export default ModelList
