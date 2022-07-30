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

  const onSubmit = () => 
       FetchClient.post(`${process.env.NEXT_PUBLIC_MODE}/rest/v1/submitIdea`, { idea: idea, category: category })
        .then(_ => { setIdea(''); setCategory('') })

  return (
    <div className={clsx(themeText(themeContext.theme))}>
      <h1 className='h3 mb-3 font-weight-normal'>Submit New Idea 💡</h1>
    <Formik initialValues={{idea: '', category: ''}}
      onSubmit={() => onSubmit()}>
        {() => (
          <Form
              id='new_idea'
              className='space-y-4'
              >
            <div>
              <textarea
              name='idea'
              className={clsx('rounded w-96', themeText(themeContext.theme), themeBg(themeContext.theme))}
              value={idea}
              onChange={(e => setIdea(e.target.value))}
             />
            </div>
            <div>
              <input
              type='text'
              onChange={(e => setCategory(e.target.value))}
              value={category}
              className={clsx('rounded w-96', themeText(themeContext.theme), themeBg(themeContext.theme))}
              name='category' 
              placeholder='Category'
              list='category_list'
              id='category'
              />
            </div>
            <datalist id='category_list'>
            </datalist>
            <Button
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
