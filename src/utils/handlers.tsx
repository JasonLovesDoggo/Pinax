export const navigateTo = (path: string, newTab?: boolean) => {
  return () => {
    if (newTab) {
      window.open(path, "_blank");
    } else {
      window.location.href = path;
    }
  };
};
