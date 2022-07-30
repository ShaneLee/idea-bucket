import React from 'react';

import Button from '@/components/buttons/Button'

import FetchClient from '@/api/FetchClient'

export interface Idea {
  id: string,
  idea: string,
  category: string
  timeSubmitted: string
}

export const IdeasTable = () => {

	const deleteIdea = (id: string) => FetchClient.delete(`${process.env.NEXT_PUBLIC_MODE}/rest/v1/delete/`, id)
		.then(_ => setIdeas(ideas?.filter(val => val.id !== id)))

  const [ideas, setIdeas] = React.useState<Array<Idea>>([]);

  React.useEffect(() => {
      FetchClient.get(`/${process.env.NEXT_PUBLIC_MODE}/rest/v1/ideas`)
        .then((res) => res.json())
        .then(data => setIdeas(data))
  }, [])


  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th>Category</th>
          <th>Delete</th>
          <th>Idea</th>
        </tr>
      </thead>
      <tbody>
        { ideas?.map(idea => (
          <tr key={idea.id}>
            <td>{idea.category}</td>
            <td><Button
              onClick={() => (deleteIdea(idea.id))}
              variant='ghost'
            >
              x</Button>
            </td>
            <td>{idea.idea}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default IdeasTable;
