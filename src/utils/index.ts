const storageKey = "widgets";
export const setStorage = (value: any) => {
  localStorage.setItem(storageKey, JSON.stringify(value));
};

export const getStorage = () => {
  const data = localStorage.getItem(storageKey);
  if (data && data !== "") {
    try {
      const jsonData = JSON.parse(data);
      return jsonData;
    } catch (e) {
      console.log(e);
      //dirty json result, reset the local storage
      localStorage.setItem(storageKey, "");
      return [];
    }
  } else {
    return [];
  }
};

export const random = (minimum: number, maximum: number) => {
  const number = Math.floor(Math.random() * maximum + minimum);
  return number;
};
