const createURL = (path: string) => {
  return window.location.origin + path
}

export const createNewEntry = async () => {
  const fullURL = createURL('/api/journal')

  const request = new Request(fullURL, {
    method: 'POST',
  })

  const res = await fetch(request)

  if (res.ok) {
    const { data } = await res.json()
    return data
  }
}

export type UpdateEntryProps = {
  id: string
  content: string
}
export const updateEntry = async ({ id, content }: UpdateEntryProps) => {
  const fullURL = createURL('/api/journal/' + id)

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
}
