const path = window.location.pathname.split('/').filter(item => item !== "")[0];
const ROOT = `${window.location.protocol}/${path}/`;