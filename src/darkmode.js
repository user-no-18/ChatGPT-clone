export function darkModeswitch(e) {
  const isChecked = e.target.checked;
  console.log("Dark mode switch toggled:", isChecked);
  document.body.classList.toggle('dark-mode', isChecked); // Use body not html
}
