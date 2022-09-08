import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import { TestSuitesRoute } from './routes/test-suites'
import { TestSuiteRoute } from './routes/test-suites/test-suite'
import { EditTestSuiteRoute } from './routes/test-suites/test-suite/edit'
import { StoreContextProvider } from './store'

export function App() {
  return (
    <div className='text-gray-700 mx-auto container max-w-6xl'>
      <div className='p-8 '>
        <StoreContextProvider>
          <BrowserRouter>
            <Routes>

              <Route
                element={ <TestSuitesRoute /> }
                path='/'
              >
                <Route
                  element={ <TestSuiteRoute /> }
                  path='test-suites/:id'
                >
                  <Route
                    element={ <EditTestSuiteRoute /> }
                    path='test-suites/:id/edit'
                  />
                </Route>
              </Route>

            </Routes>
          </BrowserRouter>
        </StoreContextProvider>
      </div>
    </div>
  )
}
