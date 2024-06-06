export const extractHTML = (str) => {
    const regex = /{{\w+}}/g;
    const matches = str?.match(regex);
    return matches ? matches : [];
  };