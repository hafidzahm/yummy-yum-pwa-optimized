export function showLoading(element) {
  element.style.display = 'block';
}

export function hideLoading(element) {
  element.style.display = 'none';
}

export function sleep(response = null) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(response);
    }, 1000)
  );
}
