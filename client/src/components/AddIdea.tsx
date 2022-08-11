import clsx from 'clsx';
import { Form,Formik } from 'formik'
import React from 'react';

import Button from '@/components/buttons/Button';

import FetchClient from '@/api/FetchClient'

export interface Idea {
  id: string,
  idea: string,
  category: string
  timeSubmitted: string
}

import {
  themeBg,
  ThemeContext,
  themeText,
} from '../context/Theme';

export const AddIdea = () => {

  const themeContext = React.useContext(ThemeContext);

  const [idea, setIdea] = React.useState('')
  const [category, setCategory] = React.useState('')
  const [ideaError, setIdeaError] = React.useState('')
  const [categoryError, setCategoryError] = React.useState('')

  const onSubmit = (idea: string) => {
    if (!processIdea(idea)) return Promise.resolve()
     FetchClient.post(`${process.env.NEXT_PUBLIC_MODE}/rest/v1/submitIdea`, { idea: idea, category: category })
      .then(_ => { setIdea(''); setCategory('') })
  }

  const processIdea = (idea: string) => {
    setIdea(idea)
    if (!idea) {
      setIdeaError(`Idea can't be empty`)
      return false
    }
    
    setIdeaError('')
    return true
  }

  const processCategory = (category: string) => {
    setCategory(category)
    if (category && category.includes(' ')) {
      setCategoryError(`Category must not include spaces`)
      return false
    }
    
    setCategoryError('')
    return true
  }

  return (
    <div className={clsx(themeText(themeContext.theme), 'space-y-4')}>
      <h1 className='h3 mb-3 font-weight-normal'>Submit New Idea 💡</h1>
      { ideaError && <div className='text-rose-500'>{ideaError}</div>}
      { categoryError && <div className='text-rose-500'>{categoryError}</div>}
    <Formik initialValues={{idea: '', category: ''}}
      onSubmit={() => onSubmit(idea)}>
        {() => (
          <Form
              id='new_idea'
              className='space-y-4'
              >
            <div>
              <textarea
              name='idea'
              className={clsx(
                'rounded w-96',
                themeText(themeContext.theme),
                themeBg(themeContext.theme),
                ideaError ? 'border-2 border-rose-500 focus:border-rose-500 animate-shake' : ''
              )}
              value={idea}
              onChange={(e => processIdea(e.target.value))}
             />
            </div>
            <div>
              <input
              type='text'
              onChange={(e => processCategory(e.target.value))}
              value={category}
              className={clsx(
                'rounded w-96',
                themeText(themeContext.theme),
                themeBg(themeContext.theme),
                categoryError ? 'border-2 border-rose-500 focus:border-rose-500 animate-shake' : ''
              )}
              name='category' 
              placeholder='Category'
              list='category_list'
              id='category'
              />
            </div>
            <datalist id='category_list'>
            </datalist>
            <Button
              disabled={!!ideaError}
              id='new_idea_btn'
              type='submit'
              variant={themeContext.theme === 'dark' ? 'light' : 'dark'}
            >
              Submit Idea
              </Button>
          </Form>
        )}
    </Formik>
    </div>
  );
};

export default AddIdea;
