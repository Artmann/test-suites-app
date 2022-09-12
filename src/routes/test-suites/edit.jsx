import { set } from 'lodash'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'

import { ErrorPage } from '../../components/error-page'
import { StoreContext } from '../../store'

export function EditTestSuiteRoute() {
  const { id } = useParams()
  const { testSuites } = useContext(StoreContext)

  const testSuite = testSuites.find(testSuite => testSuite.id.toString() === id)

  const [ draft, setDraft ] = useState(testSuite)

  const updateDraft = (key, value) => {
    setDraft({
      ...draft,
      [key]: value
    })
  }

  if (!testSuite) {
    return <ErrorPage error='Test Suite not found.' />
  }

  const updatePlan = (index) => (key, value) => {
    const copy = { ...draft }

    set(copy, `test_plans[${index}].${key}`, value)

    setDraft(copy)
  }

  const submitHandler = (e) => {
    e.preventDefault()

    console.log(JSON.stringify(draft, null, 2))
  }

  return (
    <div className='flex flex-col gap-8'>
      <h1 className='text-xl' >
        Edit Test Suite
      </h1>

      <form
        className='flex flex-col gap-8'
        onSubmit={ submitHandler }
      >
        <div>
          <Label
            id='test-suite-name'
            text='Name'
          />
          <input
            className='text-xs p-2 outline-none border border-slate-300 rounded w-60 max-w-full'
            data-testid='name'
            id='test-suite-name'
            onChange={ e => updateDraft('test_suite_name', e.target.value) }
            type='text'
            value={ draft.test_suite_name }
          />
        </div>

        <div>
          <Label
            text='Test Plans'
          />
          {
            draft.test_plans.map((testPlan, index) => (
              <TestPlanRow
                browser={ testPlan.browser }
                instructionCount={ testPlan.instruction_count }
                name={ testPlan.test_name }
                updatePlan= { updatePlan(index) }

                key={ index }
              />
            ))
          }
        </div>

        <button
          className='text-xs p-2 outline-none border border-slate-300 rounded w-60 max-w-full cursor-pointer hover:bg-gray-50'
        >
          Save Changes
        </button>

      </form>
    </div>
  )
}

function TestPlanRow({ browser, instructionCount, name, updatePlan }) {
  return (
    <div className='flex text-xs gap-8 py-2 items-center'>

      <div>
        <input
          className='text-xs p-2 outline-none border border-slate-300 rounded w-60 max-w-full'
          data-testid='test-plan-name'
          onChange={ e => updatePlan('test_name', e.target.value) }
          placeholder='Name'
          type='text'
          value={ name }
        />
      </div>

      <div>
        <select
          data-testid='test-plan-browser'
          onChange={ e => updatePlan('browser', e.target.value) }
          value={ browser }
        >
          <option value='chrome'>Chrome</option>
          <option value='edge'>Edge</option>
          <option value='firefox'>Firefox</option>
          <option value='safari'>Safari</option>
        </select>
      </div>

      <div>
        <input
          className='text-xs p-2 outline-none border border-slate-300 rounded w-16 max-w-full'
          data-testid='test-plan-instruction-count'
          onChange={ e => updatePlan('instruction_count', Number(e.target.value)) }
          placeholder='0'
          type='number'
          value={ instructionCount }
        />
      </div>

      <div>

      </div>

    </div>
  )
}

TestPlanRow.propTypes = {
  browser: PropTypes.string.isRequired,
  instructionCount: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  updatePlan: PropTypes.func.isRequired
}

function Label({ id, text }) {
  return (
    <label
      className='block uppercase font-bold text-xs tracking-wide text-gray-600 mb-2'
      htmlFor={ id }
    >
      { text }
    </label>
  )
}

Label.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string.isRequired
}
