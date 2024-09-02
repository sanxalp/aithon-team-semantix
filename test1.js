function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar.style.left === '-200px') {
      sidebar.style.left = '0';
  } else {
      sidebar.style.left = '-200px';
  }
}
