import db from "./_db.js";
import { GraphQLError } from "graphql";

export const resolvers = {
  Query: {
    // get single employee
    employee(_, args, context) {
      // only an admin or the employee themselves can fetch
      if (context.user.role != "Admin" && args.id != context.user.id) {
        throw new GraphQLError("Unauthorized", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      return db.employees.find((emp) => emp.id == args.id);
    },
    employees(_, args, context) {
      // only an admin can fetch all employees
      if (context.user.role != "Admin") {
        throw new GraphQLError("Unauthorized", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      let to_ret: Array<any>;
      if (args.filter) {
        to_ret = db.employees.filter((employee) => {
          return Object.keys(args.filter).every((key) => {
            return employee[key] == args.filter[key];
          });
        });
      } else {
        to_ret = db.employees;
      }
      if (args.limit && args.offset) {
        return to_ret.slice(args.offset, args.offset + args.limit);
      } else if (args.limit && !args.offset) {
        return to_ret.slice(0, args.limit);
      } else if (args.offset) {
        return to_ret.slice(args.offset, db.employees.length);
      }
      return to_ret;
    },
  },
  Mutation: {
    removeEmployee(_, args, context) {
      // only an admin can remove an employee
      if (context.user.role != "Admin") {
        throw new GraphQLError("Unauthorized", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      db.employees = db.employees.filter((emp) => emp.id != args.id);
      return db.employees;
    },
    addEmployee(_, args, context) {
      // only an admin can add an employee
      if (context.user.role != "Admin") {
        throw new GraphQLError("Unauthorized", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      const id = "E" + (db.employees.length + 1).toString();
      let employee = {
        ...args.employee,
        id,
      };
      db.employees.push(employee);
      return employee;
    },
    updateEmployee(_, args, context) {
      // only an admin or an employee themselves can update
      if (context.user.role != "Admin" && args.user.id != args.id) {
        throw new GraphQLError("Unauthorized", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      // employee cannot update salary or position themselves
      if (context.user.role != "Admin") {
        delete args.update["salary"];
        delete args.update["position"];
      }
      const employee = db.employees.find((emp) => emp.id == args.id);
      if (!employee) {
        throw new GraphQLError("Employee not found", {
          extensions: { code: "NOT_FOUND" },
        });
      }
      const update = {
        ...employee,
        ...args.update,
      };
      db.employees.map((emp, i) => {
        if (emp.id == args.id) {
          db.employees[i] = update;
          return;
        }
      });
      return update;
    },
  },
};
