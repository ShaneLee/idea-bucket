import clsx from 'clsx';
import React from 'react';

import { themeBg, ThemeContext, themeHover, themeText } from '@/context/Theme';

type Props = {
  items: Array<string>
  selected: string
  setSelected: (_: string) => void
}

export const GenericMenu = (props: Props) => {
  const themeContext = React.useContext(ThemeContext);

  const [ current, setCurrent ] = React.useState<string>(props.selected)

  const menuRef = React.useRef(null)

  const [showDropdown, setShowDropdown] = React.useState<boolean>(false)

  const menuText = (context: any) => context.theme === 'light' ? 'text-gray-700' : 'text-white'

  React.useEffect(() => {
		const handleClickOutside = (event: any) => {
					if (menuRef.current) {
						setShowDropdown(false)	
					}
				};
				document.addEventListener('click', handleClickOutside, true);
				return () => {
					document.removeEventListener('click', handleClickOutside, true);
				};
			}, [])

  return (
<div className='relative inline-block text-left'>
  <div>
    <button
    onClick={() => setShowDropdown(!showDropdown)}
    type='button'
    className={clsx('inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500', themeBg(themeContext.theme), themeText(themeContext.theme), themeHover(themeContext.theme))}
    id='menu-button'>
      { current }
      <svg className='-mr-1 ml-2 h-5 w-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
        <path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule='evenodd' />
      </svg>
    </button>
  </div>
  <div
	 className={clsx('origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none', showDropdown ? '' : 'invisible', themeBg(themeContext.theme))}
	 role='menu'
	 aria-orientation='vertical'
	 aria-labelledby='menu-button'
	 ref={menuRef}
	 tabIndex={-1}>
    { props.items.map(item => (
      <div key={item} className='py-1' role='none'>
        <input
          className={clsx('block px-4 py-2 text-sm', menuText(themeContext), themeBg(themeContext.theme))}
          onClick={() => { props.setSelected(item); setCurrent(item) }}
          value={item}
          role='menuitem'
          tabIndex={-1}
          id='menu-item-0'
        />
      </div>
      )
    )}
</div>
</div>
  );
};

export default GenericMenu;
