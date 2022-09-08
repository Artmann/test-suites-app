import PropTypes from 'prop-types'
import { createContext, useState } from 'react'

import { api } from '../api'

export const StoreContext = createContext()

export function StoreContextProvider({ children }) {
  const [ error, setError ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ testSuites, setTestSuites ] = useState({})

  const fetchTestSuites = async () => {
    setIsLoading(true)

    try {
      const newTestSuites = await api.fetchTestSuites()

      setTestSuites(
        newTestSuites.reduce((carry, testSuite) => {
          carry[testSuite.id] = testSuite

          return carry
        }, {})
      )
    } catch (error) {
      console.error(error)

      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchTestSuite = (id) => {
    return api.fetchTestSuite(id).then((newTestSuite) => {
      setTestSuites({
        ...testSuites,
        [newTestSuite.id]: newTestSuite
      })
    })
  }

  const value = {
    error,
    fetchTestSuite,
    fetchTestSuites,
    isLoading,
    testSuites: Object.values(testSuites)
  }

  return (
    <StoreContext.Provider
      value={ value }
    >
      { children }
    </StoreContext.Provider>
  )
}

StoreContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}
