export const openAuthPopup = (url: string) => {
  const width = 500;
  const height = 600;
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;
  const newWin = window.open(url, 'GoogleAuth', `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes,status=yes`);
  if (newWin) newWin.focus();
};
