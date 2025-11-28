document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('case-study-container');
  if (!container) return;

  // Create table structure
  const table = document.createElement('div');
  table.className = 'case-study-table';

  // Header
  const headers = ['Question', 'Logic Memory', 'Visual Memory', 'Attention Map'];
  const headerRow = document.createElement('div');
  headerRow.className = 'case-study-header';
  headers.forEach(text => {
    const col = document.createElement('div');
    col.className = 'case-header-cell';
    col.textContent = text;
    headerRow.appendChild(col);
  });
  table.appendChild(headerRow);

  // Rows
  caseStudyData.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'case-study-row';

    // Question Cell
    const qCell = document.createElement('div');
    qCell.className = 'case-cell case-question';
    qCell.innerHTML = `<span class="case-badge">CASE ${item.id}</span><p>${item.question}</p>`;
    row.appendChild(qCell);

    // Logic Memory Cell
    const lCell = document.createElement('div');
    lCell.className = 'case-cell case-logic';
    lCell.innerHTML = item.logic_memory ? item.logic_memory : '<span class="text-muted">/</span>';
    row.appendChild(lCell);

    // Visual Memory Cell
    const vCell = document.createElement('div');
    vCell.className = 'case-cell case-visual';
    vCell.innerHTML = item.visual_memory;
    row.appendChild(vCell);

    // Image Cell
    const iCell = document.createElement('div');
    iCell.className = 'case-cell case-image';
    const img = document.createElement('img');
    // Using placeholder logic if image fails to load, but assuming user will provide them
    img.src = item.image; 
    img.alt = `Case ${item.id} Attention Map`;
    img.onerror = function() {
      this.style.display = 'none'; // Hide if missing
      this.parentElement.innerHTML += '<div class="image-placeholder">Image not found<br><small>Place ' + item.image.split('/').pop() + ' in static/images/</small></div>';
    };
    iCell.appendChild(img);
    row.appendChild(iCell);

    table.appendChild(row);
  });

  container.appendChild(table);
});
