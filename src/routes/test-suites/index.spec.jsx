import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { TestSuitesRoute } from '.'
import { StoreContext } from '../../store'

describe('TestSuitesRoute', () => {

  const defaultContext = {
    error: null,
    fetchTestSuite: () => { },
    fetchTestSuites: () => { },
    isLoading: false,
    testSuites: []
  }

  it('shows a loading page', () => {
    const context = {
      ...defaultContext,
      isLoading: true
    }

    render(
      <MemoryRouter>
        <StoreContext.Provider value={context}>
          <TestSuitesRoute />
        </StoreContext.Provider>
      </MemoryRouter>
    )

    expect(screen.getByText('Loading Data...')).toBeInTheDocument()
  })

  it('shows an error message if the data fails to load.', () => {
    const context = {
      ...defaultContext,
      error: new Error('Something went wrong.')
    }

    render(
      <MemoryRouter>
        <StoreContext.Provider value={context}>
          <TestSuitesRoute />
        </StoreContext.Provider>
      </MemoryRouter>
    )

    expect(screen.getByText('Could not load Test Suites. Please try again.')).toBeInTheDocument()
  })

})
