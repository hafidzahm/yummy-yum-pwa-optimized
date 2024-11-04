export function showLoading() {
  const loading = document.querySelector('#loading');
  loading.style.display = 'block';
}

export function hideLoading() {
  const loading = document.querySelector('#loading');
  loading.style.display = 'none';
}

export function sleep(response = null) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(response);
    }, 1000)
  );
}
