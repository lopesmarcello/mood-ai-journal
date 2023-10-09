const createURL = (path: string) => {
  return window.location.origin + path
}

export const createNewEntry = async () => {
  const fullURL = createURL('/api/journal')

  try {
    const request = new Request(fullURL, {
      method: 'POST',
    })

    const res = await fetch(request)

    if (res.ok) {
      const { data } = await res.json()
      return data
    }
  } catch (e) {
    console.error(e)
  }
}

export type UpdateEntryProps = {
  id: string
  content: string
}
export const updateEntry = async ({ id, content }: UpdateEntryProps) => {
  const fullURL = createURL('/api/journal/' + id)

  try {
    const request = new Request(fullURL, {
      method: 'PATCH',
      body: JSON.stringify({
        id,
        content,
      }),
    })

    const res = await fetch(request)

    if (res.ok) {
      const { data } = await res.json()
      return data
    }
  } catch (e) {
    console.error(e)
  }
}

export const deleteEntry = async (id: string) => {
  const fullURL = createURL('/api/journal/' + id)

  try {
    const request = new Request(fullURL, {
      method: 'DELETE',
      body: JSON.stringify({
        id,
      }),
    })

    const res = await fetch(request)

    if (res.ok) {
      const { data } = await res.json()
      return data
    }
  } catch (e) {
    console.error(e)
  }
}

export const askQuestion = async (question: string) => {
  const fullURL = createURL('/api/question')
  try {
    const request = new Request(fullURL, {
      method: 'POST',
      body: JSON.stringify({ question }),
    })

    const res = await fetch(request)

    if (res.ok) {
      const { data } = await res.json()
      return data
    }
  } catch (e) {
    console.error(e)
  }
}
