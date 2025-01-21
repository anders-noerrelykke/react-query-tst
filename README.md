# Test cases:
- When loading the app, a single request is made. A rerender happens on both `ComponentOne` and `ComponentTwo`, because the data property changes, but they can use the same cached data from the request key `inspirobot`.
- Change the query key of the `useQuery` call either `ComponentOne` or `ComponentTwo` to something other than `inspirobot`. Two separate requests will be made.
- Click the "Get the data from the upper level parent" button. Rerenders happen in the dependent components (`ComponentOne` and `ComponentTwo`), but not in the middle layer wrapper (`ComponentWrapper`).
- Click the "Get the data in one again" in `ComponentTwo`. One rerenders due to data refetch, but no other component does.

## Pros
- You can access data infinitely deep without causing any non-depending parent components to rerender (in, for example, a layout file).
- You don't need to invent queries at dialog definition level - you can make it up in the child component you need it in, and the data and query states will be available to any component inside the provider, higher or lower level. Rerenders will only be caused by the components hooking into the particular data dependency.

## Cons
- Some refactoring needed.
- Adding react-query is another dependency (717 KB).

# React Query returns
https://tanstack.com/query/v4/docs/framework/react/reference/useQuery
