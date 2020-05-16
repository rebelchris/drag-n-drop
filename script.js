// Global vars
const dropzone = document.getElementById("dropzone");

function onDragStart(event) {
  event.dataTransfer.setData("text/plain", event.currentTarget.dataset.table);
  event.currentTarget.style.backgroundColor = "#e9c46a";
}

function onDragEnd(event) {
  event.currentTarget.style.backgroundColor = "#2a9d8f";
}

function onDragOver(event) {
  event.preventDefault();
}

function onDrop(event) {
  let id = event.dataTransfer.getData("text");

  const draggableElement = document.getElementById(id);
  const clone = draggableElement.cloneNode(true);

  const remove = document.createElement("div");
  remove.classList.add("comp-remove");
  remove.innerHTML = "X";
  clone.appendChild(remove);

  const dropElementY = event.y;

  // Get all main tables in the dropzone and get those positions based off the y position
  var compTables = dropzone.querySelectorAll(".actual-comp");

  if (compTables.length >= 1) {
    for (i = 0; i < compTables.length; i++) {
      var compTablesY1 =
        compTables[i].getBoundingClientRect().y +
        compTables[i].getBoundingClientRect().height / 2;
      var compTablesY2 =
        compTables[i].getBoundingClientRect().y +
        compTables[i].getBoundingClientRect().height;

      // Check if dropElementY is smaller then compTablesY1 (insert above)
      if (dropElementY <= compTablesY1) {
        compTables[i].parentNode.insertBefore(clone, compTables[i]);
        break;
      }
      // Check if dropElementY is smaller then compTablesY2 (insert below)
      if (dropElementY <= emailTableY2) {
        compTables[i].parentNode.insertBefore(clone, compTables[i].nextSibling);
        break;
      }
      dropzone.appendChild(clone);
    }
  } else {
    // No tables yet
    dropzone.appendChild(clone);
  }

  event.dataTransfer.clearData();
}

function removeElement(element) {
  element.parentNode.removeChild(element);
}

document.addEventListener(
  "click",
  function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches(".comp-remove")) return;
    // Don't follow the link
    event.preventDefault();
    // Get the parent element
    const parent = event.target.parentNode;
    // Delete the actual table parent;
    parent.parentNode.removeChild(parent);
  },
  false
);
