import PropTypes from 'prop-types'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { ErrorPage } from '../../components/error-page'
import { LoadingPage } from '../../components/loading-page'
import { StoreContext } from '../../store'

export function TestSuitesRoute() {
  const { error, fetchTestSuites, isLoading, testSuites } = useContext(StoreContext)

  useEffect(() => {
    fetchTestSuites()
  }, [])

  if (error) {
    return <ErrorPage error='Could not load Test Suites. Please try again.' />
  }

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <div className='flex flex-col gap-8'>
      {
        testSuites.map((testSuite) => (
          <TestSuiteRow
            id={testSuite.id}
            name={testSuite.test_suite_name}
            testPlans={testSuite.test_plans}

            key={testSuite.id}
          />
        ))
      }
    </div>
  )
}

function TestSuiteRow({ id, name, testPlans }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const Details = () => {
    if (!isExpanded) {
      return null
    }

    return (
      <div
        className='p-4 flex flex-col gap-4'
      >
        {
          testPlans.map((testPlan, index) => (
            <TestPlanRow
              browser={ testPlan.browser }
              instructionCount={ testPlan.instruction_count }
              name={ testPlan.test_name }

              key={ index }
            />
          ))
        }
      </div>
    )
  }

  return (
    <div
      className={`
      max-w-lg
      bg-white hover:bg-gray-50
      border border-slate-100 rounded-xl shadow-sm
      text-sm
    `}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div
        className={`
        flex p-4
        ${isExpanded ? 'border-b border-slate-100' : ''}
      `}
      >
        <div className='flex-1 font-medium truncate'>
          {name}
        </div>

        <div className='w-10 text-right'>
          {testPlans.length}
        </div>

        <div className='w-10 text-right px-10 hover:underline'>
          <Link
            to={`/test-suites/${id}/edit`}
          >
            Edit
          </Link>
        </div>

      </div>

      <Details />
    </div>
  )
}

TestSuiteRow.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  testPlans: PropTypes.array.isRequired
}

function TestPlanRow({ browser, instructionCount, name }) {
  return (
    <div className='flex text-xs gap-4 py-2'>

      <div className='flex-1'>
        { name }
      </div>

      <div className='w-10 capitalize'>
        { browser }
      </div>

      <div className='w-10 text-right'>
        { instructionCount }
      </div>

    </div>
  )
}

TestPlanRow.propTypes = {
  browser: PropTypes.string.isRequired,
  instructionCount: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
}
