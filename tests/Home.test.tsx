import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import Page from '../app/page'

vi.mock('@clerk/nextjs', () => {
  // Create an mockedFunctions object to match the functions we are importing from the @nextjs/clerk package in the ClerkComponent component.
  const mockedFunctions = {
    auth: () =>
      new Promise((resolve) =>
        resolve({ userId: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC' })
      ),
    ClerkProvider: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC',
        fullName: 'Charles Harris',
      },
    }),
  }

  return mockedFunctions
})

vi.mock('next/font/google', () => {
  return {
    Inter: () => ({ className: 'inter' }),
  }
})

test(`renders home page title correctly`, async () => {
  render(await Page())
  expect(screen.getByText('Track how your days feel.')).toBeTruthy()
})

test('renders call to action button "Get Started"', async () => {
  render(await Page())
  const btn = screen.getByRole('button')
  expect(btn).toHaveTextContent('Get Started')
})
