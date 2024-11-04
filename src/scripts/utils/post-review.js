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
    const emptyWarning =
      '<p id="warning">Nama dan review tidak boleh kosong!</p>';
    const warningPlacement = document.querySelector('#review-warning');
    warningPlacement.innerHTML += emptyWarning;
  } else {
    try {
      const reviewInclude = '<p id="warning">Menambahkan review anda...</p>';
      const warningPlacement = document.querySelector('#review-warning');
      warningPlacement.innerHTML += reviewInclude;
      await RestaurantSources.postReview(dataReview);
      containerReview.innerHTML += reviewTemplate;

      name.value = '';
      review.value = '';
    } catch (err) {
      console.log(err);
    } finally {
      const warningBox = document.querySelector('#review-warning');
      const warningText = document.querySelector('#warning');
      if (warningText) {
        warningBox.remove();
      }
    }
  }
};

export default PostReview;
