import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router";
import request, { gql } from "graphql-request";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const query = gql`
  query GetUser($userId: String!) {
    user(id: $userId) {
      name
    }
  }
`;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: "always",
    },
  },
});

const useOffer = () => {
  return useQuery({
    queryKey: ["films2"],
    queryFn: async () =>
      request(
        "https://api.spacex.land/graphql",
        query,
        // variables are type-checked too!
        { userId: "123" }
      ),
  });
};

const Path1 = () => {
  const { data } = useOffer();

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
  const { data } = useOffer();

  console.log(data);

  return (
    <div>
      <h1>Path 2</h1>
      <p>This is the second path.</p>
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Path1 />} />
          <Route path="/path2/:id" element={<Path2 />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
