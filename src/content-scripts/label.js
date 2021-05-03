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
  var currDataset = null;

  /**
   * Add a Mouse Move Event Listener to the document
   * If the element capturing the cursor is of type img,
   * inject the toolbar into the DOM Toolbar
   */
  document.addEventListener('mousemove', function(e) {
    if(currentTarget !== e.target) {
        if(e.target.nodeName === "IMG"){
            injectToolbar(e.target);
            currentTarget = e.target;
        }else{
            currentTarget = null;
            return;
        }
    }else{
        return;
    }
  });

  /**
   * Add a Keydown listener to the document.
   * Opens up a prompt to allow the user insert the relavent labels
   * if the currentTarget is of type img.
   * Calls addImageToDataset upon user confirmation.
   */
  document.addEventListener("keydown",function(e) {
      if(currentTarget && currentTarget.nodeName === "IMG") {
        var label = prompt("Label this Image (Dataset: " + currDataset + ")");
        
      }
  })

  /**
 * Inject the labelling toolbar.
 * creates an injects toolbar html into the DOM relative to the 
 * passed target.
 */
  function injectToolbar(target) {
    var toolbar = document.createElement("div");
    toolbar.innerHTML = "Press any key to label";
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


  console.log(browser.storage)
})();

