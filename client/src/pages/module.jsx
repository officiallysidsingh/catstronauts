import { gql, useQuery } from "@apollo/client";
import { Layout, ModuleDetail, QueryResult } from "../components";
import { useParams } from "react-router-dom";

const GET_MODULE = gql`
  query GetModules($moduleId: ID!, $trackId: ID!) {
    module(id: $moduleId) {
      id
      title
      length
      content
      videoUrl
    }
    track(id: $trackId) {
      id
      title
      modules {
        id
        title
        length
      }
    }
  }
`;

const module = () => {
  const { moduleId, trackId } = useParams();

  const { loading, error, data } = useQuery(GET_MODULE, {
    variables: { moduleId, trackId },
  });
  return (
    <Layout>
      <QueryResult error={error} loading={loading} data={data}>
        <ModuleDetail track={data?.track} module={data?.module} />
      </QueryResult>
    </Layout>
  );
};

export default module;
