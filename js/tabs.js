const tabs = document.querySelectorAll('.service-tab');
  const panels = document.querySelectorAll('.services-panel');
 
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
 
      tab.classList.add('active');
      document.getElementById('panel-' + tab.dataset.target).classList.add('active');
    });
  });