const Marked = window.marked;

// Marked.setOptions({
//   highlight: (code, lang) =>
//     Prism.highlight(code, Prism.languages[lang || "markup"], lang || "markup")
// });

const mdToHTML = content => Marked(content)

const getRealPath = (pathname, desc = false) => {
  if (!pathname) {
    pathname = window.location.pathname
  }
  let names = pathname.split("/")
  if (desc === false) {
    for (let i = names.length - 1; i >= 0; --i) {
      let name = names[i].trim()
      if (name.length > 0 && name !== "/" && name !== "index.html") {
        return name
      }
    }
  } else {
    for (let i = 0; i < names.length; ++i) {
      let name = names[i].trim()
      if (name.length > 0 && name !== "/" && name !== "index.html") {
        return name
      }
    }
  }
  return "/"
}

const generateToc = () => {
  if (document.body.clientWidth < 768) {
    return;
  }
  jQuery("#sidebar-header").append("<span> Table of Contents </span>");
  let sidebar = jQuery("#sidebar"),
    app = jQuery("#app"),
    topBtn = jQuery(".back-to-top");
  app.addClass("sidebar-active");
  sidebar.addClass("sidebar-active");
  if (document.body.clientWidth <= 768) {
    topBtn.attr("style", "right: calc(2rem + 200px);");
  } else {
    topBtn.attr("style", "right: calc(2rem + 250px);");
  }
  topBtn.addClass("sidebar-active");

  jQuery(".markdown-body")
    .find("h2,h3,h4,h5,h6")
    .each(function (i, item) {
      let tag = jQuery(item).get(0).localName;
      let tagID = jQuery(item)
        .text()
        .replace(/\s{2}/g, "");
      let idName = jQuery(item).attr("id");
      jQuery("#sidebar-toc").append(`
      <li class="toc-${tag}">
        <a data-id=#${idName}>
          ${tagID}
        </a>
      </li>
    `);
    });
  jQuery("#sidebar-toc").on("click", "li", function () {
    let idName = jQuery(this)
      .find("a")
      .data("id");
    jQuery("html, body").animate(
      {
        scrollTop: jQuery(idName).offset().top - jQuery(".header-wrap").height()
      },
      { duration: 500, easing: "swing" }
    );
    return false;
  });
}
