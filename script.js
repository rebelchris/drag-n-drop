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

  const dropzone = document.getElementById("dropzone");

  const draggableElement = document.getElementById(id);
  const clone = draggableElement.cloneNode(true);

  const remove = document.createElement("div");
  remove.classList.add("comp-remove");
  remove.innerHTML = "X";
  clone.appendChild(remove);

  dropzone.appendChild(clone);

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
