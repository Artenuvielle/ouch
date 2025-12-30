import { extendSchema, gql } from "postgraphile/utils";

export const EnumPlugin = extendSchema((build) => ({
  typeDefs: gql`
    enum TestEnum {
      ASC
      DESC
    }
    type Entity {
      id: Int
    }
    extend type Query {
      test(enum: TestEnum!): [Entity]!
    }
  `,
  objects: {
    Query: {
      plans: {
        test: (_$root, fieldArgs) => {
          const $select = build.input.pgRegistry.pgResources.test_entity.find();
          console.log("BEFORE_APPLY========================");
          fieldArgs.apply($select);
          console.log("AFTER_APPLY========================");
          return $select;
        },
      },
    },
  },
  enums: {
    TestEnum: {
      values: {
        ASC: {
          apply: (parent: any, info: any) => {
            console.log("ASC========================");
            console.log(parent, info);
            console.log("ASC========================");
          },
        },
        DESC: (parent, info) => {
          console.log("DESC========================");
          console.log(parent, info);
          console.log("DESC========================");
        },
      },
    },
  },
}));
