import React from 'react';

import Button from '@/components/buttons/Button'
import Filters from '@/components/Filters'

import FetchClient from '@/api/FetchClient'

export interface Idea {
  id: string,
  idea: string,
  category: string
  timeSubmitted: string
}

interface Props {
  category?: string
}

const addCategory = (category: string | undefined) => 
  category ? `?category=${category}` : ``

export const IdeasTable = (props: Props) => {

	const deleteIdea = (id: string) => FetchClient.delete(`${process.env.NEXT_PUBLIC_MODE}/rest/v1/delete/`, id)
		.then(_ => setIdeas(ideas?.filter(val => val.id !== id)))

  const [ideas, setIdeas] = React.useState<Array<Idea>>([]);


	const [category, setCategory] = React.useState<string | undefined>(props.category)

  React.useEffect(() => {
      FetchClient.get(`/${process.env.NEXT_PUBLIC_MODE}/rest/v1/ideas${addCategory(category)}`)
        .then((res) => res?.json())
        .then(data => setIdeas(data))
  }, [category])


  return (
	<div>
		<Filters setCategoryFilter={setCategory}/>
    <table className="w-full text-sm text-left">
      <thead>
        <tr className=''>
          <th className='py-3 px-2'>Category</th>
          <th className='py-3 px-2'>Delete</th>
          <th className='py-3 px-2'>Idea</th>
        </tr>
      </thead>
      <tbody>
        { ideas?.map(idea => (
          <tr key={idea.id}>
            <td className='py-3 px-2'>{idea.category}</td>
            <td className='px-2'><Button
              onClick={() => (deleteIdea(idea.id))}
              variant='ghost'
            >
              x</Button>
            </td>
            <td className='px-2'>{idea.idea}</td>
          </tr>
        ))}
      </tbody>
    </table>
	</div>
  );
};

export default IdeasTable
