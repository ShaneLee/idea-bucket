import clsx from 'clsx';
import React from 'react'

import Button from '@/components/buttons/Button'

export interface Idea {
  id: string,
  idea: string,
  category: string
  timeSubmitted: string
}

interface Props {
	setCategoryFilter: (_: string | undefined) => void
}

const filterAppliedBg = (enabled: boolean) => enabled ? 'bg-primary-500' : 'bg-slate-400'

// Tailwind is not playing ball so adding this hack
const figureSize = (category: string | undefined) => !category ? 'w-1' : `w-[${category.length}px]`

export const Filters = (props: Props) => {

	const [category, setCategory] = React.useState<string>('')
	const [enabled, setEnabled] = React.useState<boolean>(false)

	function update(val: string): void {
		setEnabled(!!val)
		props.setCategoryFilter(val)
	}

  React.useEffect(() => {
    const keyEnter = (event: any) => {
      if (event.key === 'Enter') {
        if (!enabled && category) {
          update(category)
        }
        else if (enabled) {
          update('')
        }
      }
    }

    document.addEventListener('keydown', keyEnter)

    return () => {
      document.removeEventListener('keydown', keyEnter)
    }

  }, [enabled, category])

  return (
		<div className=''>

        <details className='duration-300'>
            <summary className='bg-inherit text-sm cursor-pointer'>
							Filters
						</summary>
            <div className='px-5 py-3 text-sm flex-row font-bold gap-4'>
							<span className={clsx('rounded-full px-6 py-3 text-white', filterAppliedBg(enabled))}> 
							<label className={figureSize(category)}>
								Category: {' '}
                <input
                  className={clsx(
                    'rounded focus:outline-none focus:w-fit duration-500',
                     figureSize(category),
                     filterAppliedBg(enabled))}
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                />
							</label>
							{ !enabled && <Button
              onClick={() => update(category)}
              variant='primary-outline'>
								+
							</Button>}
							{ enabled && <Button
              onClick={() => update('')}
              variant='primary-outline'>
								x
							</Button>}
							
							</span>
            </div>
        </details>
    </div>
  )
}

export default Filters
