import {Module, Mutation, VuexModule} from "vuex-module-decorators";

@Module
export default class StepperStore extends VuexModule {
  dialog = false;

  @Mutation
  setDialogStatus(value: boolean) {
    this.dialog = value;
  }

  get getDialogStatus() {
    return this.dialog;
  }
}