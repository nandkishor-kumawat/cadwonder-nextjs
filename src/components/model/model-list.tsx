import React from 'react'
import ModelItem from './ModelItem'
import { Model } from '@/lib/types/types'

export default function ModelList({ models }: { models: Model[] }) {
    return (
        <>
            {models.length === 0 && <p>No models found</p>}
            {models.map((model, index) => <ModelItem key={index} model={model} />)}
        </>
    )
}
