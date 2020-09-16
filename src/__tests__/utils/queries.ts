import gql from "graphql-tag";

export const store = gql`
  query {
    store(id: 1) {
      material {
        nombre
      }
      provider {
        id
        name
      }
      orders {
        id
        monto
      }
    }
  }
`;
export const clients = gql`
  query {
    clients {
      creator {
        id
        name
      }
    }
  }
`;
