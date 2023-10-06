import Link from 'next/link'

export default function Home() {
  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center">
      <div className="w-full max-w-[800px] mx-auto">
        <h1 className="text-6xl mb-8">
          <span className="text-indigo-400 font-bold">AI Mood Journal.</span>{' '}
          <br /> Track how your days feel.
        </h1>
        <p className="text-2xl text-white/80 mb-16">
          Be honest <span className="text-red-400 font-bold">{'<3'}</span>
        </p>
        <div>
          <Link href="/journal">
            <button className="bg-indigo-600 px-4 py-2 rounded-lg text-xl">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
