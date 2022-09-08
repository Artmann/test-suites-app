import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { ListTestSuitesRoute } from './list'
import { StoreContext } from '../../store'

describe('ListTestSuitesRoute', () => {

  const defaultContext = {
    error: null,
    fetchTestSuite: () => { },
    fetchTestSuites: () => { },
    isLoading: false,
    testSuites: []
  }

  it('shows list of test suites.', () => {
    const context = {
      ...defaultContext,
      testSuites: [
        {
          id: 1,
          test_suite_name: 'Suite Mix Save Mental',
          test_plans: [
            {
              test_name: 'Test Plan Stiff Any Main',
              browser: 'firefox',
              instruction_count: 33
            },
            {
              test_name: 'Test Plan Pride Queen Travel',
              browser: 'edge',
              instruction_count: 13
            }
          ]
        },
        {
          id: 2,
          test_suite_name: 'Suite Dropped Shown Warm',
          test_plans: [
            {
              test_name: 'Test Plan Famous Conversation',
              browser: 'safari',
              instruction_count: 34
            },
            {
              test_name: 'Test Plan Edge Golden',
              browser: 'safari',
              instruction_count: 8
            }
          ]
        }
      ]
    }

    render(
      <MemoryRouter>
        <StoreContext.Provider value={context}>
          <ListTestSuitesRoute />
        </StoreContext.Provider>
      </MemoryRouter>
    )

    expect(screen.getByText('Suite Mix Save Mental')).toBeInTheDocument()
    expect(screen.getByText('Suite Dropped Shown Warm')).toBeInTheDocument()
  })

  it('shows the test plans when clicking a test suite.', () => {
    const context = {
      ...defaultContext,
      testSuites: [
        {
          id: 1,
          test_suite_name: 'Suite Mix Save Mental',
          test_plans: [
            {
              test_name: 'Test Plan Stiff Any Main',
              browser: 'firefox',
              instruction_count: 33
            },
            {
              test_name: 'Test Plan Pride Queen Travel',
              browser: 'edge',
              instruction_count: 13
            }
          ]
        },
        {
          id: 2,
          test_suite_name: 'Suite Dropped Shown Warm',
          test_plans: [
            {
              test_name: 'Test Plan Famous Conversation',
              browser: 'safari',
              instruction_count: 34
            },
            {
              test_name: 'Test Plan Edge Golden',
              browser: 'safari',
              instruction_count: 8
            }
          ]
        }
      ]
    }

    render(
      <MemoryRouter>
        <StoreContext.Provider value={context}>
          <ListTestSuitesRoute />
        </StoreContext.Provider>
      </MemoryRouter>
    )

    fireEvent.click(screen.getByText('Suite Mix Save Mental'))

    expect(screen.getByText('Test Plan Stiff Any Main')).toBeInTheDocument()
    expect(screen.getByText('Test Plan Pride Queen Travel')).toBeInTheDocument()
  })

})
