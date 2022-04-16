// const profileBlock = document.getElementById("profile-info-container");
// const invBlock = document.getElementById("inventory-tab");
// const allTabContainers = document.querySelectorAll("div.block.prof-tab-cont");
// const allTabs = document.querySelectorAll("tabs > ui li")


const profileTabs = document.querySelectorAll("li a");

async function selectTab() {
    
    // Activate the current tab.
    const activeTab = document.querySelector("li.is-active");
    activeTab.classList.remove('is-active');
    this.parentElement.classList.add("is-active");
    
    // Hide all boxes.
    const targetName = this.parentElement.getAttribute('containerId');
    const targetBox = document.getElementById(targetName);
    const allTabs = document.querySelectorAll('.block.prof-tab-cont');
    allTabs.forEach((tab) => {
        tab.style.display = "none";
    });

    targetBox.style.display = "block";
}

profileTabs.forEach((tab) => {
    tab.addEventListener("click", selectTab);
});



async function populateProfileInfo() {
    
} 


async function dataHandler() {
    const profileBlock = document.getElementById("profile-info-container");
}



async function windowActions() {
    await dataHandler();
  }

window.onload = windowActions;