class Api {
  async fetchTestSuites() {
    const testSuites = await this._get('/test_suites')

    return testSuites
  }

  async fetchTestSuite(id) {

  }

  async _get(path) {
    return this._request(path, 'GET')
  }

  async _request(path, method) {
    const host = process.env['API_URL'] ?? 'http://localhost:3456'
    const url = `${host}${path}`

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method
    })

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    const data = await response.json()

    return data
  }
}

export const api = new Api()
