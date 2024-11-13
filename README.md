# GraphQL API with Apollo Server

GraphQL API implementation using Apollo Server, focusing on managing employee data. For simplicity, no actual database is used; instead, in-memory variables store example data.

## Features

### Queries
- **Fetch a single employee by ID**: Retrieve detailed information on a specific employee by providing their ID.
- **Fetch multiple employees**: Retrieve multiple employees, with optional filtering by various fields and pagination controls (limit and offset).

### Mutations
- **Add an employee**: Allows authorized users to add a new employee to the system.
- **Remove an employee**: Allows authorized users to remove an employee.
- **Update an employee**: Allows authorized users or the employee themselves to update the employee's data.

### Authorization
Authorization is based on the user's role and ID extracted from a bearer token:
- **Admin** users can add, remove, update, and fetch all employees.
- **Employee** users can fetch and update only their own data.

Authorization token examples for testing:
- **Admin** token: `eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQWRtaW4iLCJpZCI6IjEifQ._CzAzMvZLNxODZLfVmdSpDgiUfpHzmcmPnXTNhEpE2c`
- **Employee** token: `eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiRW1wbG95ZWUiLCJpZCI6IjEifQ.6o1SnHMQlP35u_h9S7hA0zHkUc-RLP7Js20b_3_EfnA`

## Deployment

The API is deployed at: [https://msaad-1020945629038.asia-southeast1.run.app/](https://msaad-1020945629038.asia-southeast1.run.app/)

Apollo Explorer for running queries is available at the same URL.
## Example GraphQL Queries

Make sure to have the authorization bearer token set for these requests.

```graphql
# 1) Query for Employee by ID
query Employee($employeeId: ID!) {
  employee(id: $employeeId) {
    firstName,
    lastName,
    id,
    salary,
    position
  }
}
# Variables for Employee Query
{
  "employeeId": "1"
}

# 2) Mutation to Remove Employee by ID
mutation RemoveEmployee($removeEmployeeId: ID!) {
  removeEmployee(id: $removeEmployeeId) {
    id
  }
}
# Variables for RemoveEmployee Mutation
{
  "removeEmployeeId": "1"
}

# 3) Query Employees by Filter
query Employees($filter: EmployeeFilter) {
  employees(filter: $filter) {
    salary
  }
}
# Variables for Employees Filter Query
{
  "filter": {
    "firstName": "John"
  }
}

# 4) Query Employees with Filter, Offset, and Limit
query Employees($filter: EmployeeFilter, $offset: Int, $limit: Int) {
  employees(filter: $filter, offset: $offset, limit: $limit) {
    id,
    salary,
    position
  }
}
# Variables for Employees Offset & Limit Query
{
  "filter": null,
  "offset": 5,
  "limit": 2
}
