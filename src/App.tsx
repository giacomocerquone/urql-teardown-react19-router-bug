import "./App.css";
import {
  cacheExchange,
  Client,
  fetchExchange,
  gql,
  Provider,
  useQuery,
} from "urql";
import { BrowserRouter, Link, Route, Routes } from "react-router";

const query = gql`
  query GetUser($userId: String!) {
    user(id: $userId) {
      name
    }
  }
`;

const Path1 = () => {
  const [{ data }] = useQuery({ query, variables: { userId: "123" } });

  console.log(data);

  return (
    <div>
      <h1>Path 1</h1>
      <p>This is the first path.</p>
      <Link to="/path2/123">Go to Path 2</Link>
    </div>
  );
};

const Path2 = () => {
  const [{ data }] = useQuery({ query, variables: { userId: "123" } });

  console.log(data);

  return (
    <div>
      <h1>Path 2</h1>
      <p>This is the second path.</p>
    </div>
  );
};

const client = new Client({
  url: "/graphql",
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: {
    credentials: "include",
  },
  requestPolicy: "network-only",
});

function App() {
  return (
    <Provider value={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Path1 />} />
          <Route path="/path2/:id" element={<Path2 />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
