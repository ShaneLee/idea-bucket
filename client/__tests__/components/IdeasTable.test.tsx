import { render, screen, waitForElementToBeRemoved, waitFor } from '@testing-library/react'
import { act} from 'react-dom/test-utils';
import IdeasTable from '@/components/IdeasTable'

import FetchClient from '@/api/FetchClient'

describe('IdeasTable', () => {

	const ideas = [
		{ 
			id: '1',
			category: 'Programming',
			idea: 'Write some code',
			timeSubmitted: '',
		},
		{ 
			id: '2',
			category: 'Example',
			idea: 'Clem Fandango',
			timeSubmitted: '',
		},
		{ 
			id: '3',
			category: 'General',
			idea: 'general',
			timeSubmitted: '',
		}
	]
	
  it('renders the ideas', async () => {
		const fetchMock = jest.spyOn(FetchClient, 'get');
		fetchMock.mockImplementation(() => Promise.resolve({ json: async () => ideas } as Response))

		await act(async () => {
			render(<IdeasTable/>)
		})
		

		ideas.forEach(id => {
			let idea
			let category
		
			act(() => {
				idea = screen.getByText(id.idea)
				category = screen.getByText(id.idea)
			})
			expect(idea).toBeInTheDocument()
			expect(category).toBeInTheDocument()
		})
  })

  it('handles empty ideas', async () => {
		const fetchMock = jest.spyOn(FetchClient, 'get');
		fetchMock.mockImplementation(() => Promise.resolve({ json: async () => [] } as Response))
		let idea

		await act(async () => {
			render(<IdeasTable />)
		})
		act(() => {
			idea = screen.getByText('Idea')
		})

    expect(idea).toBeInTheDocument()
  })

  it('handles undefined ideas', async () => {
		const fetchMock = jest.spyOn(FetchClient, 'get');
		fetchMock.mockImplementation(() => Promise.resolve({ json: async () => undefined } as Response))
		let idea

		await act(async () => {
			render(<IdeasTable />)
		})
		act(() => {
			idea = screen.getByText('Idea')
		})

    expect(idea).toBeInTheDocument()
  })

  xit('deletes the idea', async () => {
		const fetchMock = jest.spyOn(FetchClient, 'get');
		fetchMock.mockImplementation(() => Promise.resolve({ json: async () => undefined } as Response))
		let deleteButton: any

		await act(async () => {
			render(<IdeasTable />)
		})
		act(() => {
			deleteButton = screen.getByText('x')
		})

    expect(deleteButton).toBeInTheDocument()
		deleteButton.click()

    expect(await waitForElementToBeRemoved(() => screen.getByText('x'))).toBeFalsy()
  })
})
