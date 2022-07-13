import Dashboard from "./pages/Dashboard.js";
import Products from "./pages/Products.js";
import Posts from "./pages/Posts.js";
import NotFound from "./pages/NotFound.js";

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    //? hasAttribute(), matches()
    //! if (e.target.hasAttribute("data-link"))
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigationTo(e.target.href);
    }
  });
  router();
});

window.addEventListener("popstate", router);

// 1. what view show to user based on Route?
function router() {
  // dashboard, products, posts
  const routes = [
    { path: "/", view: Dashboard },
    { path: "/products", view: Products },
    { path: "/posts", view: Posts },
  ];

  const potentialRoutes = routes.map((_route) => {
    return {
      route: _route,
      isMatch: location.pathname === _route.path, //! location object in browser
    };
  });

  let match = potentialRoutes.find((_route) => _route.isMatch);
  if (!match) {
    match = {
      route: { path: "/not-found", view: NotFound },
      isMatch: true,
    };
  }

  console.log(match.route.view());
  document.querySelector("#app").innerHTML = match.route.view();
  // console.log(potentialRoutes);
}

// 2. push user to new url:
function navigationTo(url) {
  history.pushState(null, null, url);
  router();
}

// SIDEBAR TOGGLER
const sidebarToggler = document.querySelector(".sidebar-toggler");
const sidebar = document.querySelector(".nav");
const root = document.documentElement;

sidebarToggler.addEventListener("click", () => {
  sidebar.classList.toggle("mini-sidebar");
  sidebar.classList.contains("mini-sidebar")
    ? root.style.setProperty("--nav-width", 55 + "px")
    : root.style.setProperty("--nav-width", 250 + "px");
});
