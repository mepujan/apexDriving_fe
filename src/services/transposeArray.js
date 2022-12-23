const transpose = (inputArray) => {
  return inputArray.reduce(
    (r, a, i) => (a.forEach((b, j) => ((r[j] = r[j] || [])[i] = b)), r),
    []
  );
};

export default { transpose };
