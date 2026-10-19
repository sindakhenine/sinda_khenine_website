export const themeStorageKey = "sinda-theme";
// Runs before paint; a system preference is used when no explicit choice is saved.
export const themeScript = `(function(){try{var t=localStorage.getItem('${themeStorageKey}');if(t!=='dark'&&t!=='light')t=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}})()`;
