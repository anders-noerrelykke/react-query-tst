import { useEffect, useMemo } from 'react'
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from 'react-query'
import './App.css'
import ComponentThree from './ComponentThree'

function ComponentWrapper (): JSX.Element {
  console.log("rerender wrapper")
  return (
    <div style={{padding: "20px", border: "1px solid red", margin: "10px"}}>
      <h2 style={{color: "red"}}>ComponentWrapper</h2>
      <ComponentOne />
      <ComponentTwo />
      <ComponentThree />
    </div>
  )
}

function ComponentOne(): JSX.Element {
  console.log("rerender one")
  const { data, refetch } = useQuery('inspirobot1', () => fetch('https://inspirobot.me/api?generate=true').then((res) => res.text()))
  return (
    <div style={{padding: "10px", border: "1px solid white", margin: "10px"}}>
      <h2>Component One</h2>
      <button style={{backgroundColor: "white", color: "black", margin: "5px"}} onClick={() => console.log("logging in one", data)}>
        Log data in one
      </button>
      <button style={{backgroundColor: "white", color: "black", margin: "5px"}} onClick={() => refetch()}>Get the data in one again</button>
    </div>
  )
}

function ComponentTwo(): JSX.Element {
  console.log("rerender two")
  const { data, refetch } = useQuery('inspirobot1', () => fetch('https://inspirobot.me/api?generate=true').then((res) => res.text()), )
  const queryClient = useQueryClient()
  return (
    <div style={{padding: "10px", border: "1px solid white", margin: "10px"}}>
      <h2>Component Two</h2>
      <button style={{backgroundColor: "white", color: "black", margin: "5px"}} onClick={() => console.log("logging in two", data)}>
        Log data in two
      </button>
      <button style={{backgroundColor: "white", color: "black", margin: "5px"}} onClick={() => refetch()}>Get the data in two again</button>
      <button style={{backgroundColor: "white", color: "black", margin: "5px"}} onClick={() => queryClient.invalidateQueries({queryKey: ['inspirobot1']})}>Get the data in one again</button>
    </div>
  )
}



function App() {
  const queryClient = useMemo(() => new QueryClient({defaultOptions: {queries: {staleTime: Infinity, refetchOnWindowFocus: false}}}), [])
  useEffect(() => {
    console.log("changed", queryClient)
  }, [queryClient])

  return (
    <div style={{border: "1px solid green", padding: "20px"}}>
      <h2 style={{color: "green"}}>App</h2>
      <QueryClientProvider client={queryClient}>
        <ComponentWrapper />
        <button style={{backgroundColor: "green"}} onClick={() => queryClient.invalidateQueries()}>
          Get the data again in the upper level parent
        </button>
      </QueryClientProvider>
    </div>
  )
}

export default App
