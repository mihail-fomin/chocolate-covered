export const getDefaultValue = (currentPath: string) => {
  if (currentPath === '/') {
    return 'home'
  } else {
    return 'categories'
  }
}