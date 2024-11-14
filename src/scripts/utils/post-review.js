import RestaurantSources from '../data/restaurant-sources';
import UrlParser from '../routes/url-parser';

const PostReview = async () => {
  const url = UrlParser.parseActiveUrlWithoutCombiner();
  const name = document.querySelector('#name');
  const review = document.querySelector('#review');
  const containerReview = document.querySelector('.reviews__container');

  const dataReview = {
    id: url.id,
    name: name.value,
    review: review.value,
  };

  const dateReview = new Date().toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const reviewTemplate = `

    <div id="review__customer" class="review__customer">
    <h1 id="review__name">${dataReview.name}</h1>
    <h1 id="review.date">${dateReview}</h3>
    <h2 id="review_review">${dataReview.review}</h2>
    </div>
        `;

  if (name.value === '' || review.value === '') {
    emptyReviewWarning();
  } else {
    checkInternet();
  }

  function checkInternet() {
    if (navigator.onLine) {
      sendReview();
      removeWarning();
    } else {
      internetOfflineWarning();
    }
  }
  function emptyReviewWarning() {
    const emptyWarning =
      '<p id="warning">Nama dan review tidak boleh kosong!</p>';
    const warningPlacement = document.querySelector('#review-warning');
    warningPlacement.innerHTML += emptyWarning;
  }
  function sendReview() {
    sendReviewApi();
  }
  async function sendReviewApi() {
    try {
      const reviewInclude = '<p id="warning">Menambahkan review anda...</p>';
      const warningPlacement = document.querySelector('#review-warning');
      warningPlacement.innerHTML += reviewInclude;
      await RestaurantSources.postReview(dataReview);
      containerReview.innerHTML += reviewTemplate;

      name.value = '';
      review.value = '';
    } catch (err) {
    } finally {
      removeWarning();
    }
  }
  function internetOfflineWarning() {
    const reviewInclude =
      '<p id="warning">Maaf jaringan anda terputus. Anda bisa berikan review ketika anda tersambung kembali...</p>';
    const warningPlacement = document.querySelector('#review-warning');
    warningPlacement.innerHTML += reviewInclude;
  }

  function removeWarning() {
    const parent = document.getElementById('review-warning');
    const warningText = document.getElementById('warning');
    if (warningText) {
      parent.removeChild(warningText);
    }
  }
};

export default PostReview;
