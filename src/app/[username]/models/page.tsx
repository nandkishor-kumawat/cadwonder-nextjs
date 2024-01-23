import ModelList from '@/components/model/model-list';
import { getData, getUserBy } from '@/lib/functions';
import { Model } from '@/lib/types/types';
import React from 'react'

const Page = async ({ params: { username } }: { params: { username: string } }) => {

  const user = await getUserBy("username", username);

  if (!user) return null;

  const models = await getData({
    coll: "models",
    key: "user_id",
    value: user.id
  }) as Model[];

  return (
    <div className="grid gap-2 pb-2" style={{
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    }}>
      <ModelList models={models} />
    </div>
  )
}

export default Page