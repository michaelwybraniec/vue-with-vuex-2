import Vue from "vue";
import Router from "vue-router";
//const parseProps = r => ({ id: parseInt(r.params.id) });

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/heroes"
    },
    {
      path: "/heroes",
      name: "heroes",
      component: () =>
        import(/* webpackChunkName: "bundle.heroes" */ "./views/heroes.vue")
    },
    // {
    //   path: "/hero/:id",
    //   name: "hero-detail",
    //   // props: true,
    //   // props: parseProps,
    //   component: () =>
    //     import(/* webpackChunkName: "bundle.heroes" */ "./views/hero-detail.vue")
    // },
  ]
});