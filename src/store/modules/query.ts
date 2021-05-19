import {Module, Mutation, VuexModule} from "vuex-module-decorators";
import store from "@/store";

interface QueryInterface {
  [key: string]: string | {};
}
@Module({store, name: "querystore", dynamic: true})
export default class QueryStore extends VuexModule {
  queries = {} as QueryInterface;

  @Mutation
  addQuery(values: [string, string]) {
    this.queries[values[0]] = values[1];
  }

  @Mutation
  addRangeQuery(values: [string, {}]) {
    this.queries[values[0]] = values[1];
  }


  get getAllQueries() {
    return this.queries;
  }

  get getQuery() {
    return (label: string) => {
      return this.queries[label];
    };
  }
}
