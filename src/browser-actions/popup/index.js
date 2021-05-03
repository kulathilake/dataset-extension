/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */

/** User Controls */
const EXTENSTION_TOGGLE = document.getElementById('toggle');

/** User Control Events */
EXTENSTION_TOGGLE.onclick = toggleExtension;

/** User Control Event Handlers*/
function toggleExtension(e) {
    browser.tabs.executeScript({file: "../../content-scripts/label.js"})
    .catch(e=>console.log(e));
}
