import { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { ErrorPage } from '../../components/error-page'
import { LoadingPage } from '../../components/loading-page'
import { StoreContext } from '../../store'

export function TestSuitesRoute() {
  const { error, fetchTestSuites, isLoading } = useContext(StoreContext)

  useEffect(() => {
    fetchTestSuites()
  }, [ fetchTestSuites ])

  if (error) {
    return <ErrorPage error='Could not load Test Suites. Please try again.' />
  }

  if (isLoading) {
    return <LoadingPage />
  }

  return <Outlet />
}
