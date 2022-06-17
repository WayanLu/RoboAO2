// Dynamically load the header and footer tabs in html
const navList = [];

navList.push("Home","Weather","Robo-AO Loop")
console.log(navList)
const navBarContainer = document.getElementsByClassName("topnav")[0]

navList.forEach(tabName => {
    const tab = document.createElement('a')
    tab.textContent = tabName
    navBarContainer.appendChild(tab)
})

