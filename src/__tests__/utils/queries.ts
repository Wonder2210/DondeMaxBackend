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

export const orders = gql`
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
