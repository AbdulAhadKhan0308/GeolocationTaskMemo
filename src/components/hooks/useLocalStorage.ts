const useGetItemsLocalStorage: (key: string) => string | null = key => {
  try {
    return localStorage.getItem(key);
  } catch (_e) {
    console.error('error in retrieving from local storage, return null');
    return null;
  }
};

const useSetItemsLocalStorage: (key: string, value: string) => boolean = (
  key,
  value
) => {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (_e) {
    return false;
  }
};

export const useLocalStorage = () => {
  return {
    useGetItemsFromLocalStorage: useGetItemsLocalStorage,
    useSetItemsLocalStorage: useSetItemsLocalStorage,
  };
};
