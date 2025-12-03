document.addEventListener("DOMContentLoaded", function () {
  // HIDE EVENTS FROM EMPLOYEES
  
  if (inSidedData.user.role.includes('Employee')) { 
    document.querySelectorAll('li.header-navigation_list-item a').forEach(link => {
      if (link.classList.contains('title-events')) {
        link.closest('li').style.display = 'none';
      }
    });
  }

  // ADD OTHER JS HERE

  
});

// Helper to style CKEditor content iframe
  function styleEditorIframe(iframe) {
    if (iframe && iframe.contentDocument) {
      const doc = iframe.contentDocument;
      if (doc && doc.body && !iframe.dataset.styled) {
        doc.body.style.backgroundColor = "#121212";
        doc.body.style.color = "white";

        // Optional: make links readable too
        const style = doc.createElement("style");
        style.textContent = `
          a { color: #aad8ff !important; }
        `;
        doc.head.appendChild(style);

        iframe.dataset.styled = "true";
      }
    }
  }

  // Helper to style the dropdown format menu
  function styleDropdownIframe(iframe) {
    if (iframe && iframe.contentDocument && !iframe.dataset.styled) {
      const doc = iframe.contentDocument;
      const style = doc.createElement("style");
      style.textContent = `
        .cke_panel_listItem a,
        .cke_panel_listItem a:hover,
        .cke_panel_listItem a:focus,
        .cke_panel_listItem a:active,
        .cke_panel_listItem {
          color: black !important;
          background-color: white !important;
        }
      `;
      doc.head.appendChild(style);
      iframe.dataset.styled = "true";
    }
  }

  // Interval to watch for any new CKEditor iframes
  setInterval(() => {
    document.querySelectorAll('iframe.cke_wysiwyg_frame').forEach(styleEditorIframe);
    document.querySelectorAll('iframe.cke_panel_frame').forEach(styleDropdownIframe);
  }, 400);
