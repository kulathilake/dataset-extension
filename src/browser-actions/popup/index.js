/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */


/** User Controls */
const EXTENSTION_TOGGLE = document.getElementById('toggle');
const NEW_DATASET_BUTTON = document.getElementById('new-dataset-btn');
const NEW_DATASET_NAME = document.getElementById('new-dataset-name');
const DATASET_LIST = document.getElementById('dataset-list');

/** User Control Events */
EXTENSTION_TOGGLE.onclick = handleToggleExtension;
NEW_DATASET_BUTTON.onclick = handleCreateDataset;
DATASET_LIST.onchange = handleSelectDataset
NEW_DATASET_NAME.onkeydown = handleNewNameChange;

/** User Control Event Handlers*/
function handleToggleExtension(e) {
    browser.tabs.executeScript({file: "../../content-scripts/label.js"})
    .catch(catchError);
}

function handleCreateDataset() {
    var newDatasetName = NEW_DATASET_NAME.value;
    createDataset(newDatasetName);
}

function handleSelectDataset(dataset) {

}

function handleNewNameChange(e) {
    e.target.style =null;
}


/** DOM Functions */
function addDatasetToSelect(dataset) {
    var option = document.createElement("option");
    option.text = dataset.name;
    option.value = dataset.name;
    DATASET_LIST.add(option);
}



/** Initialize */
(function Initialize(){
    var datasets = getDatasets();

    datasets.then(datasets=>{
        Object.keys(datasets)
        .forEach(key => {
            addDatasetToSelect(datasets[key]);
        })
    })
    
})()



/** Storage */

getDatasets();

/** Storage Events */
browser.storage.onChanged.addListener(function(e) {
    
})

/**  Get All Datasets **/
function getDatasets() {
    var allDatasets = browser.storage.local.get(null);
    return allDatasets.then(datasets => {
        return datasets;
    })
    .catch(catchError)
}

/** Get Named Dataset */
function getDataset(name) {
    var dataset = browser.storage.local.get(name);
    return dataset.then(data=>{
        return data;
    })
    .catch(catchError);
}


/** Create New Dataset **/
async function createDataset(name) {
    var isUnique = await isUniqueName(name);
    if(isUnique) {
        var dataset = {
            name: name,
            type: 'multiclass',
        }
        return browser.storage.local.set({[name]:dataset})
          .then(() => {
            addDatasetToSelect(dataset);
            return;
          })
          .catch(catchError)
    } else {
        NEW_DATASET_NAME.style.color="red";
        NEW_DATASET_NAME.style.border="1px solid red";
    };
}


/** Error Handling */
function catchError (e) {
    console.error(e);
}


/** Helpers */
function isUniqueName(name) {
    if(!name || !name.length) return 
    var datasets = getDatasets();
    return datasets.then(datasets=>{
        return !Object.keys(datasets).includes(name);
    })
    .catch(catchError)
}