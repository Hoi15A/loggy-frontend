import {Server} from "@/models/server";
import {Module, Mutation, VuexModule} from "vuex-module-decorators";
import store from "@/store";

@Module({store, name: "homeservices", dynamic: true})
export default class HomeServicesStore extends VuexModule {
  servers = [] as Server[];

  @Mutation
  setServers(servers: Server[]) {
    this.servers = servers;
  }

  @Mutation
  addServer(server: Server) {
    this.servers.push(server);
  }

  @Mutation
  removeServerById(id: number) {
    this.servers = this.servers.filter((server: Server) => server.id != id);
  }

  get getAllServers() {
    return this.servers;
  }

  get getServerById() {
    return (id: number) => {
      return this.servers.find((server: Server) => server.id == id);
    };
  }

  get isEmpty() {
    return this.servers.length === 0;
  }
}