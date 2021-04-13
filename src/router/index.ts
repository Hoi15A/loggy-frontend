import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import ServerView from "@/views/ServerView.vue";
import Test from "@/views/Test.vue";
import Configs from "@/views/Configs.vue";
import ColumnsView from "@/views/ColumnsView.vue";


Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {title: "Home"},
  },
  {
    path: "/server",
    name: "Server",
    meta: {title: "Server"},
    component: ServerView,
  },
  {
    path: "/configs",
    name: "Configs",
    meta: {title: "Configs"},
    component: Configs,
  },
  {
    path: "/columns",
    name: "Columns",
    meta: {title: "Columns"},
    component: ColumnsView,
  },
  {
    path: "/test",
    name: "Test",
    component: Test,
    meta: {title: "Test"},
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
