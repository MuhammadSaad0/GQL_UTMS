export const typeDefs = `#graphql
type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    age: Int!
    position: String!
    salary: Int!,
}
type Query {
    employee(id: ID!): Employee
    employees(filter: EmployeeFilter, limit: Int, offset: Int): [Employee]
}
type Mutation {
    removeEmployee(id: ID!): [Employee]
    addEmployee(employee: AddEmployee!): Employee
    updateEmployee(id: ID!, update: UpdateEmployee!): Employee
}
input AddEmployee {
    firstName: String!
    lastName: String!
    position: String!
    age: Int!
    salary: Int!
}
input EmployeeFilter {
    id: ID
    firstName: String
    lastName: String
    age: Int
    position: String
    salary: Int
}
input UpdateEmployee {
    firstName: String
    lastName: String
    age: Int
    position: String
    salary: Int
}`;
