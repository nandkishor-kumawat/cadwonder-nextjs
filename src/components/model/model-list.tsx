import React from 'react'
import ModelItem from './ModelItem'

export default function ModelList({ models }: { models: any[] }) {
    return (
        <>
            {models.map((model, index) => <ModelItem key={index} model={model} />)}
        </>
    )
}
