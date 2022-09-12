import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import { TestSuitesRoute } from './routes/test-suites'
import { ListTestSuitesRoute } from './routes/test-suites/list'
import { EditTestSuiteRoute } from './routes/test-suites/edit'
import { StoreContextProvider } from './store'

export function App() {
  return (
    <div className="text-gray-700 mx-auto container max-w-6xl">
      <div className="p-8 ">
        <StoreContextProvider>
          <BrowserRouter>
            <Routes>

              <Route
                element={ <TestSuitesRoute /> }
                path="/"
              >
                <Route
                  element={ <ListTestSuitesRoute /> }
                  index
                />

                <Route
                  element={ <EditTestSuiteRoute /> }
                  path="/test-suites/:id/edit"
                />
              </Route>

            </Routes>
          </BrowserRouter>
        </StoreContextProvider>
      </div>
    </div>
  )
}
