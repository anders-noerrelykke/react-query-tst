import { useQuery } from "react-query"

export default function ComponentThree(): JSX.Element {
  const {data} = useQuery('inspirobot1')
  console.log("render three", data)
  return (
    <><p>Accessing data only from queryKey: {JSON.stringify(data)}</p></>
  )
}
