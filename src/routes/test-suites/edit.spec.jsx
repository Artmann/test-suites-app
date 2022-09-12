import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { StoreContext } from '../../store'
import { EditTestSuiteRoute } from './edit'

const Wrapper = ({ children }) => (
  <MemoryRouter initialEntries={['/test-suites/1/edit']}>
    <Routes>
      <Route path='/test-suites/:id/edit' element={ children } />
    </Routes>
  </MemoryRouter>
)

describe('ListTestSuitesRoute', () => {
  const defaultContext = {
    error: null,
    fetchTestSuite: () => { },
    fetchTestSuites: () => { },
    isLoading: false,
    testSuites: []
  }

  it('allows the user to change the name of the suite.', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

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
            }
          ]
        }
      ]
    }

    userEvent.setup()

    render(
      <StoreContext.Provider value={context}>
        <EditTestSuiteRoute />
      </StoreContext.Provider>
    , { wrapper: Wrapper })

    fireEvent.change(screen.getByTestId('name'), {
      target: {
        value: 'New Name'
      }
    })

    await userEvent.click(screen.getByText('Save Changes'))

    expect(consoleSpy).toHaveBeenCalledWith(JSON.stringify({
      id: 1,
      test_suite_name: 'New Name',
      test_plans: [
        {
          test_name: 'Test Plan Stiff Any Main',
          browser: 'firefox',
          instruction_count: 33
        }
      ]
    }, null, 2))
  })

  it('allows the user to change the properties of the plan.', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

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
            }
          ]
        }
      ]
    }

    userEvent.setup()

    render(
      <StoreContext.Provider value={context}>
        <EditTestSuiteRoute />
      </StoreContext.Provider>
    , { wrapper: Wrapper })

    fireEvent.change(screen.getByTestId('test-plan-name'), {
      target: {
        value: 'Plan to hire Chris'
      }
    })

    fireEvent.change(screen.getByTestId('test-plan-browser'), {
      target: {
        value: 'edge'
      }
    })

    fireEvent.change(screen.getByTestId('test-plan-instruction-count'), {
      target: {
        value: '2'
      }
    })

    await userEvent.click(screen.getByText('Save Changes'))

    expect(consoleSpy).toHaveBeenCalledWith(JSON.stringify({
      id: 1,
      test_suite_name: 'Suite Mix Save Mental',
      test_plans: [
        {
          test_name: 'Plan to hire Chris',
          browser: 'edge',
          instruction_count: 2
        }
      ]
    }, null, 2))
  })

  it('adds plans to the suite.', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

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
            }
          ]
        }
      ]
    }

    userEvent.setup()

    render(
      <StoreContext.Provider value={context}>
        <EditTestSuiteRoute />
      </StoreContext.Provider>
    , { wrapper: Wrapper })

    await userEvent.click(screen.getByText('Add Test Plan'))

    await userEvent.click(screen.getByText('Save Changes'))

    expect(consoleSpy).toHaveBeenCalledWith(JSON.stringify({
      id: 1,
      test_suite_name: 'Suite Mix Save Mental',
      test_plans: [
        {
          test_name: 'Test Plan Stiff Any Main',
          browser: 'firefox',
          instruction_count: 33
        },
        {
          test_name: '',
          browser: 'chrome',
          instruction_count: 0
        }
      ]
    }, null, 2))
  })

  it('removes a plan from the suite.', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

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
        }
      ]
    }

    userEvent.setup()

    render(
      <StoreContext.Provider value={context}>
        <EditTestSuiteRoute />
      </StoreContext.Provider>
    , { wrapper: Wrapper })

    const buttons = screen.getAllByText('Remove')

    await userEvent.click(buttons[0])

    await userEvent.click(screen.getByText('Save Changes'))

    expect(consoleSpy).toHaveBeenCalledWith(JSON.stringify({
      id: 1,
      test_suite_name: 'Suite Mix Save Mental',
      test_plans: [
        {
          test_name: 'Test Plan Pride Queen Travel',
          browser: 'edge',
          instruction_count: 13
        }
      ]
    }, null, 2))
  })

})
