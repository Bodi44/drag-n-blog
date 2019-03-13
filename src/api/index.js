const API = 'http://localhost:3001'

const handleErrors = response => {
  if (!response.ok) throw Error(response.statusText)
  else return response
}

export const getAllArticles = async () =>
  handleErrors(await fetch(`${API}/articles`)).json()

export const getLayout = async () =>
  handleErrors(await fetch(`${API}/layoutContainers`)).json()
