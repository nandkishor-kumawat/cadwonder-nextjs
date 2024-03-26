import React from 'react'
import ModelItem from './model-item'
import { Model } from '@/lib/types/types'

export default async function ModelList({ promise }: { promise: Promise<Model[]> }) {
    const models = await promise;
    return (
        <>
            {models.length === 0 && <p>No models found</p>}
            {models.map((model, index) => <ModelItem key={index} model={model} />)}
        </>
    )
}
