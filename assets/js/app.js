const hideAll = () => {
  $("section").hide();
};

const updateActiveTab = (clickedTab) => {
  $("#menu .nav-link").removeClass("active");
  clickedTab.find(".nav-link").addClass("active");
};

const showSection = (sectionId, clickedTab) => {
  hideAll();
  $(`#${sectionId}`).show();
  updateActiveTab(clickedTab);
  closeMobileMenu();
};

const toggleMobileMenu = () => {
  sidebar.toggleClass("show");
  sidebarOverlay.toggleClass("show");
  $("body").toggleClass("overflow-hidden");
};

const closeMobileMenu = () => {
  sidebar.removeClass("show");
  sidebarOverlay.removeClass("show");
  $("body").removeClass("overflow-hidden");
};

const setAppState = (isLoggedIn) => {
  if (isLoggedIn) {
    $("#mainContent").show();
    $("#loginPage").hide();
    showSection("dashboard_section", $("#home_tab"));
  } else {
    $("#mainContent").hide();
    $("#loginPage").show();
    hideAll();
  }
};

const sidebar = $(".sidebar");
const sidebarOverlay = $("#sidebarOverlay");

$(function () {
  setAppState(localStorage.getItem("isLoggedIn") === "true");

  $("#loginPage form").on("submit", function (event) {
    event.preventDefault();

    const username = $("#username").val();
    const password = $("#password").val();

    if (username === "admin" && password === "1234") {
      localStorage.setItem("isLoggedIn", "true");
      setAppState(true);
      $("#username").val("");
      $("#password").val("");

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Invalid username or password!",
    });
  });

  $("#btnSignOut").on("click", function (event) {
    event.preventDefault();
    localStorage.setItem("isLoggedIn", "false");
    setAppState(false);
  });

  $("#home_tab").on("click", function () {
    showSection("dashboard_section", $(this));
  });

  $("#customer_tab").on("click", function () {
    showSection("customer_section", $(this));
  });

  $("#item_tab").on("click", function () {
    showSection("item_section", $(this));
  });

  $("#order_tab").on("click", function () {
    showSection("order_section", $(this));
  });

  $("#mobileMenuToggle").on("click", toggleMobileMenu);
  sidebarOverlay.on("click", closeMobileMenu);

  $(".nav-link").on("click", function () {
    if ($(window).width() <= 768) {
      closeMobileMenu();
    }
  });

  $(window).on("resize", function () {
    if ($(window).width() > 768) {
      closeMobileMenu();
    }
  });

  $(document).on("touchmove", function (event) {
    if (sidebar.hasClass("show")) {
      event.preventDefault();
    }
  });
});
