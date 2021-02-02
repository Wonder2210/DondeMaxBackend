import { gql } from "apollo-server";

export default gql`
scalar Upload
scalar Date

enum PayMethod {
  EFECTIVO
  DEBITO
  TRANSFERENCIA
  DOLARES
  PESOS
}

enum UserRole {
  EMPLEADO
  ADMINISTRADOR
  CLIENTE
}

`;