import gql from "graphql-tag";

export const GET_STORE = gql`
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
export const GET_CLIENTS = gql`
  query {
    clients {
      creator {
        id
        name
      }
    }
  }
`;

export const GET_ORDERS = gql`
  query {
    orders {
      creator {
        name
      }
      client {
        name
        id
      }
      products {
        id
        quantity
        product {
          name
          precio
        }
        materials {
          material_name
          quantity
        }
      }
    }
  }
`;
