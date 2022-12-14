import PropTypes from 'prop-types'
import { useCallback } from 'react'
import { createContext, useState } from 'react'

import { api } from '../api'

export const StoreContext = createContext()

export function StoreContextProvider({ children }) {
  const [ error, setError ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ testSuites, setTestSuites ] = useState({})

  const fetchTestSuites = useCallback(async () => {
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
  }, [])

  const value = {
    error,
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
