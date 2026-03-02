document.addEventListener('DOMContentLoaded', () => {

  const sidebar = document.querySelector('.work-sidebar');
  const blocks = document.querySelectorAll('.work-block');

  // 清空现有sidebar内容（保留label）
  const label = sidebar.querySelector('.sidebar-label');
  sidebar.innerHTML = '';
  sidebar.appendChild(label);

  // 遍历所有work-block，自动生成侧栏
  blocks.forEach(block => {
    const id = block.id;

    // 如果有chapter-title，先插入chapter标题
    const chapterEl = block.querySelector('.chapter-title');
    if (chapterEl) {
      const chapterSpan = document.createElement('span');
      chapterSpan.className = 'sidebar-chaper';
      chapterSpan.textContent = chapterEl.textContent.trim();
      sidebar.appendChild(chapterSpan);
    }

    // 插入block标题链接
    const titleEl = block.querySelector('.block-title');
    if (titleEl && id) {
      const link = document.createElement('a');
      link.className = 'sidebar-link';
      link.href = `#${id}`;
      link.textContent = titleEl.textContent.trim();
      sidebar.appendChild(link);
    }
  });

  // 重新获取生成后的链接，监听滚动active
  const sidebarLinks = document.querySelectorAll('.sidebar-link');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        sidebarLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.sidebar-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '-10% 0px -60% 0px' // 触发区域在屏幕上方偏一点
  });

  blocks.forEach(block => observer.observe(block));

});
