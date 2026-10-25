document.addEventListener("DOMContentLoaded", function() {
  
  // 1. INJECT THE HTML AUTOMATICALLY
  const tocUI = document.createElement('div');
  tocUI.innerHTML = `
    <button id="floating-toc-btn">Contents</button>
    <div id="toc-panel">
      <ul id="toc-list"></ul>
    </div>
  `;
  document.body.appendChild(tocUI);

  // 2. SET UP THE TOGGLE BUTTON
  const tocBtn = document.getElementById('floating-toc-btn');
  const tocPanel = document.getElementById('toc-panel');
  const tocList = document.getElementById('toc-list');

  tocBtn.addEventListener('click', () => {
    if (tocPanel.style.display === 'none' || tocPanel.style.display === '') {
      tocPanel.style.display = 'block';
    } else {
      tocPanel.style.display = 'none';
    }
  });

  // 3. SCAN HEADINGS AND BUILD LINKS
  const headings = document.querySelectorAll('h1, h2, h3'); 
  
  if (headings.length === 0) {
    tocList.innerHTML = '<li style="color: #666;">No headings found</li>';
    return;
  }

  headings.forEach((heading, index) => {
    if (!heading.id) {
      const safeText = heading.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
      heading.id = `section-${index}-${safeText}`;
    }

    const li = document.createElement('li');
    li.style.marginBottom = '10px'; 

    const a = document.createElement('a');
    a.href = '#' + heading.id;
    a.textContent = heading.textContent || 'Untitled Section';
    a.style.textDecoration = 'none';
    a.style.color = '#007bff';
    a.style.fontFamily = 'sans-serif';
    
    // Indent sub-headings
    if (heading.tagName === 'H2') li.style.marginLeft = '15px';
    if (heading.tagName === 'H3') li.style.marginLeft = '30px';

    li.appendChild(a);
    tocList.appendChild(li);
  });
});