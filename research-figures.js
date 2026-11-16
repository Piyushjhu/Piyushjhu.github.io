/* Full-resolution figure inspection. Inline cards load the separate preview files. */
(() => {
  "use strict";

  let activeViewer = null;
  let viewerCount = 0;
  const maximumZoom = 4;
  const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value));

  function destroy() {
    if (activeViewer) activeViewer.destroy();
    activeViewer = null;
  }

  // Call after the existing lightbox has been inserted into its open dialog.
  // The original image URL remains on the image; this module never requests a preview.
  function setup(figure) {
    destroy();
    const image = figure && figure.querySelector("img");
    if (!image || !image.parentNode) return null;

    const document = figure.ownerDocument;
    const dialog = figure.closest("dialog");
    const listeners = [];
    const listen = (element, type, callback, options) => {
      element.addEventListener(type, callback, options);
      listeners.push(() => element.removeEventListener(type, callback, options));
    };
    const make = (tag, className, text) => {
      const element = document.createElement(tag);
      element.className = className;
      if (text) element.textContent = text;
      return element;
    };
    const toolbar = make("div", "research-figure-tools");
    toolbar.setAttribute("role", "group");
    toolbar.setAttribute("aria-label", "Figure zoom controls");
    const button = (text, label) => {
      const control = make("button", "research-figure-control", text);
      control.type = "button";
      control.setAttribute("aria-label", label);
      control.title = label;
      toolbar.append(control);
      return control;
    };
    const zoomOut = button("−", "Zoom out");
    const zoomIn = button("+", "Zoom in");
    const fit = button("Fit", "Fit the whole figure");
    const status = make("span", "research-figure-zoom", "100%");
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    status.setAttribute("aria-atomic", "true");
    toolbar.append(status);
    const help = make("p", "research-figure-help", "Zoom in to read labels, then drag or scroll to move around. Keyboard: + / − to zoom, 0 to fit, arrow keys to move.");
    help.id = `research-figure-help-${++viewerCount}`;
    const viewport = make("div", "research-figure-viewport");
    viewport.tabIndex = 0;
    viewport.setAttribute("role", "region");
    viewport.setAttribute("aria-label", "Enlarged research figure");
    viewport.setAttribute("aria-describedby", help.id);
    viewport.setAttribute("aria-busy", "true");
    const canvas = make("div", "research-figure-canvas");
    const loading = make("p", "research-figure-loading", "Loading full-resolution figure…");
    loading.setAttribute("role", "status");

    const originalParent = image.parentNode;
    const nextSibling = image.nextSibling;
    const originalSize = { width: image.style.width || "", height: image.style.height || "" };
    const originalDraggable = image.getAttribute("draggable");
    originalParent.insertBefore(toolbar, image);
    originalParent.insertBefore(help, image);
    originalParent.insertBefore(viewport, image);
    image.draggable = false;
    canvas.append(image);
    viewport.append(canvas, loading);

    let zoom = 1;
    let fitWidth = 0;
    let disposed = false;
    let frame = 0;
    let drag = null;

    function updateControls() {
      const ready = image.naturalWidth > 0;
      zoomOut.disabled = !ready || zoom <= 1;
      zoomIn.disabled = !ready || zoom >= maximumZoom;
      fit.disabled = !ready || zoom === 1;
      const percentage = Math.round(zoom * 100);
      status.textContent = `${percentage}%`;
      status.setAttribute("aria-label", `${percentage}% of fitted figure size`);
      viewport.classList.toggle("is-zoomed", zoom > 1);
    }

    function imageAnchor(clientX, clientY) {
      const bounds = image.getBoundingClientRect();
      const view = viewport.getBoundingClientRect();
      return {
        x: clamp(((clientX ?? view.left + viewport.clientWidth / 2) - bounds.left) / (bounds.width || 1), 0, 1),
        y: clamp(((clientY ?? view.top + viewport.clientHeight / 2) - bounds.top) / (bounds.height || 1), 0, 1),
        offsetX: clientX == null ? viewport.clientWidth / 2 : clientX - view.left,
        offsetY: clientY == null ? viewport.clientHeight / 2 : clientY - view.top
      };
    }

    function layout(anchor) {
      if (disposed || !image.naturalWidth || !viewport.clientWidth || !viewport.clientHeight) return;
      fitWidth = Math.min(viewport.clientWidth, viewport.clientHeight * image.naturalWidth / image.naturalHeight, image.naturalWidth);
      const width = Math.max(1, Math.round(fitWidth * zoom));
      const height = Math.max(1, Math.round(width * image.naturalHeight / image.naturalWidth));
      const canvasWidth = Math.max(viewport.clientWidth, width);
      const canvasHeight = Math.max(viewport.clientHeight, height);
      // Real layout dimensions produce a scrollable image at 2×, 3× and 4× on phones.
      image.style.width = `${width}px`;
      image.style.height = `${height}px`;
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;
      if (anchor) {
        viewport.scrollLeft = (canvasWidth - width) / 2 + anchor.x * width - anchor.offsetX;
        viewport.scrollTop = (canvasHeight - height) / 2 + anchor.y * height - anchor.offsetY;
      } else if (zoom === 1) {
        viewport.scrollLeft = 0;
        viewport.scrollTop = 0;
      }
      updateControls();
    }

    function setZoom(value, clientX, clientY) {
      if (!image.naturalWidth) return;
      const next = clamp(value, 1, maximumZoom);
      if (next === zoom) return;
      const anchor = imageAnchor(clientX, clientY);
      zoom = next;
      layout(zoom === 1 ? null : anchor);
    }

    function loaded() {
      if (disposed) return;
      viewport.setAttribute("aria-busy", "false");
      loading.hidden = true;
      layout();
    }

    function stopDragging(event) {
      if (!drag || (event && event.pointerId !== drag.id)) return;
      const pointer = drag.id;
      drag = null;
      viewport.classList.remove("is-dragging");
      if (viewport.hasPointerCapture(pointer)) viewport.releasePointerCapture(pointer);
    }

    listen(zoomIn, "click", () => setZoom(zoom + 1));
    listen(zoomOut, "click", () => setZoom(zoom - 1));
    listen(fit, "click", () => setZoom(1));
    listen(image, "load", loaded);
    listen(image, "error", () => {
      viewport.setAttribute("aria-busy", "false");
      loading.hidden = false;
      loading.textContent = "The figure could not be loaded. Try the full-resolution image link below.";
      updateControls();
    });
    listen(viewport, "keydown", event => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (["+", "=", "-", "_", "0"].includes(event.key)) {
        event.preventDefault();
        setZoom(event.key === "0" ? 1 : zoom + (["-", "_"].includes(event.key) ? -1 : 1));
      } else if (zoom > 1 && ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
        event.preventDefault();
        const distance = event.shiftKey ? 200 : 80;
        viewport.scrollLeft += event.key === "ArrowLeft" ? -distance : event.key === "ArrowRight" ? distance : 0;
        viewport.scrollTop += event.key === "ArrowUp" ? -distance : event.key === "ArrowDown" ? distance : 0;
      }
    });
    listen(viewport, "dblclick", event => {
      if (event.button !== 0) return;
      event.preventDefault();
      setZoom(zoom > 1 ? 1 : 2, event.clientX, event.clientY);
    });
    listen(viewport, "pointerdown", event => {
      if (zoom <= 1 || event.button !== 0 || drag) return;
      viewport.focus({ preventScroll: true });
      drag = { id: event.pointerId, x: event.clientX, y: event.clientY, left: viewport.scrollLeft, top: viewport.scrollTop };
      viewport.setPointerCapture(event.pointerId);
      viewport.classList.add("is-dragging");
    });
    listen(viewport, "pointermove", event => {
      if (!drag || event.pointerId !== drag.id) return;
      if (event.cancelable) event.preventDefault();
      viewport.scrollLeft = drag.left - (event.clientX - drag.x);
      viewport.scrollTop = drag.top - (event.clientY - drag.y);
    });
    listen(viewport, "pointerup", stopDragging);
    listen(viewport, "pointercancel", stopDragging);
    listen(viewport, "lostpointercapture", stopDragging);

    const observer = typeof ResizeObserver === "function" ? new ResizeObserver(() => {
      if (disposed) return;
      cancelAnimationFrame(frame);
      const anchor = fitWidth ? imageAnchor() : null;
      frame = requestAnimationFrame(() => layout(anchor));
    }) : null;
    if (observer) observer.observe(viewport);
    else listen(window, "resize", () => layout(zoom > 1 ? imageAnchor() : null));

    const viewer = {
      destroy() {
        if (disposed) return;
        disposed = true;
        stopDragging();
        cancelAnimationFrame(frame);
        if (observer) observer.disconnect();
        listeners.splice(0).forEach(remove => remove());
        // Restore the input markup so setup() can safely be called again.
        if (nextSibling && nextSibling.parentNode === originalParent) originalParent.insertBefore(image, nextSibling);
        else originalParent.append(image);
        image.style.width = originalSize.width;
        image.style.height = originalSize.height;
        if (originalDraggable === null) image.removeAttribute("draggable");
        else image.setAttribute("draggable", originalDraggable);
        toolbar.remove();
        help.remove();
        viewport.remove();
        if (activeViewer === viewer) activeViewer = null;
      }
    };
    if (dialog) listen(dialog, "close", () => viewer.destroy());
    activeViewer = viewer;
    updateControls();
    if (image.complete && image.naturalWidth) loaded();
    else if (image.complete) {
      viewport.setAttribute("aria-busy", "false");
      loading.textContent = "The figure could not be loaded. Try the full-resolution image link below.";
    }
    return viewer;
  }

  window.ResearchFigureViewer = Object.freeze({ setup, destroy });
})();
