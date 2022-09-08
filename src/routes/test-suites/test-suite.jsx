import { useEffect } from 'react'
import { useContext } from 'react'
import { Outlet, useParams } from 'react-router-dom'

import { ErrorPage } from '../../components/error-page'
import { LoadingPage } from '../../components/loading-page'
import { StoreContext } from '../../store'

export function TestSuiteRoute() {
  const { error, fetchTestSuite, isLoading } = useContext(StoreContext)
  const { id } = useParams()

  useEffect(() => {
    fetchTestSuite(id)
  }, [ id ])

  if (error) {
    return <ErrorPage error='Test Suite not found.' />
  }

  if (isLoading) {
    return <LoadingPage />
  }

  return <Outlet />
}
