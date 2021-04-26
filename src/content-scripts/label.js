(function() {
   /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }

  window.hasRun = true;

  var currentTarget = null;

  /**
   * Add a Mouse Move Event Listener to the window
   * If the element capturing the cursor is of type img,
   * inject the toolbar into the DOM Toolbar
   */
  document.addEventListener('mousemove', function(e) {
    if(e.target.nodeName === "IMG") {
        if(currentTarget !== e.target){
            injectToolbar(e.target);
            currentTarget = e.target;
        }else{
            return;
        }
    }else{
        return;
    }
  });

/**
 * Inject the labelling toolbar.
 * creates an injects toolbar html into the DOM relative to the 
 * passed target.
 */
  function injectToolbar(target) {
    
    var toolbar = document.createElement("div");
    toolbar.innerHTML = "hello";
    target.parentElement.append(toolbar);

    target.addEventListener("mouseleave", function() {
        removeToolbar(toolbar);      
    })
}

/**
 * Remove toolbar.
 * Removes the injected toolbar when cursor leaves the 
 * capturing img element.
 */
  function removeToolbar(toolbar) {
    toolbar.remove();
  }



})();

