window.addEventListener("DOMContentLoaded", () => {
  // Tabs
  const tabsParent = document.querySelector(".tabheader__items"),
    tabs = document.querySelectorAll(".tabheader__item"),
    tabContents = document.querySelectorAll(".tab_content");

  function hideTabsContent() {
    tabContents.forEach((tabContent) => {
      tabContent.classList.add("hide");
      tabContent.classList.remove("show", "fade");
    });

    tabs.forEach((tab) => {
      tab.classList.remove("tabheader__item_active");
    });
  }

  function showTabsContent(index = 0) {
    tabContents[index].classList.add("show", "fade");
    tabContents[index].classList.remove("hide");
    tabs[index].classList.add("tabheader__item_active");
  }

  hideTabsContent();
  showTabsContent();

  tabsParent.addEventListener("click", (e) => {
    const target = e.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((tab, index) => {
        if (target == tab) {
          hideTabsContent();
          showTabsContent(index);
        }
      });
    }
  });
});
