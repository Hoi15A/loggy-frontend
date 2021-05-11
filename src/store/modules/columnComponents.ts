import {Module, Mutation, VuexModule} from "vuex-module-decorators";
import store from "@/store";
import {ColumnComponent} from "@/models/columnComponent";

@Module({dynamic: true, store, name: "columnCompStore"})
export default class ColumnComponentStore extends VuexModule {
  columnComponents = [] as ColumnComponent[];
  editedColumnComponent = {} as ColumnComponent;


  get getColumnComponents() {
    return this.columnComponents;
  }

  get getEditedColumnComponent() {
    return this.editedColumnComponent;
  }

  get getColumnComponentById() {
    return (columnComponentId: number) => {
      return this.columnComponents.find((cc: ColumnComponent) => cc.id === columnComponentId);
    };
  }

  @Mutation
  setColumnComponents(columnComponents: ColumnComponent[]) {
    this.columnComponents = columnComponents;
  }

  @Mutation
  setEditedColumnComponent(columnComponent: ColumnComponent) {
    this.editedColumnComponent = columnComponent;
  }

  @Mutation
  removeColumnComponent(index: number) {
    this.columnComponents.splice(index, 1);
  }

  @Mutation
  updateColumnComponents(columnComponent: ColumnComponent) {
    const oldCC = this.columnComponents.find(cc => cc.id == columnComponent.id) as ColumnComponent;
    const index = this.columnComponents.indexOf(oldCC);
    this.columnComponents[index] = columnComponent;
  }

}