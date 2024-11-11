Feature('Customer review');
const assert = require('assert');
Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('adding a review from homepage', async ({ I }) => {
  I.amOnPage('/#/home');

  I.seeElement('#card-item__name a');

  I.click(locate('#card-item__name a').first());

  I.seeElement('form');

  reviewName = [];
  review = [];

  const fillQueryName = 'Sarah';
  const fillQueryReview = 'Enak  bangedddd  +1000 aura';
  reviewName.push(fillQueryName);
  review.push(fillQueryReview);

  const lastArrayName = reviewName.length - 1;
  const lastArrayReview = review.length - 1;
  const lastReviewerName = reviewName[lastArrayName];
  const lastReview = review[lastArrayReview];

  I.seeElement('input');
  I.seeElement('textarea');

  I.fillField('#name', fillQueryName);
  I.fillField('#review', fillQueryReview);

  I.click('#review_submit');

  const nameValue = String(lastReviewerName);
  const reviewTextValue = String(lastReview);

  assert.strictEqual(fillQueryName, nameValue);
  assert.strictEqual(fillQueryReview, reviewTextValue);
});

Scenario('adding a review from favorited restaurant', async ({ I }) => {
  I.amOnPage('/#/favorite');

  I.see('Anda tidak punya Restoran Favorit.', '.text-info');

  I.amOnPage('/');

  I.seeElement('#card-item__name a');

  const firstRestaurant = locate('#card-item__name a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('.favoriteButton');
  I.click('.favoriteButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.card-item__container');

  const favoritedRestaurantName = await I.grabTextFrom('#card-item__name');

  assert.strictEqual(firstRestaurantName, favoritedRestaurantName);

  I.seeElement('#card-item__name a');

  I.click(locate('#card-item__name a').first());

  I.seeElement('form');

  reviewName = [];
  review = [];

  const fillQueryName = 'Dedoo';
  const fillQueryReview = 'Enak  beuud';
  reviewName.push(fillQueryName);
  review.push(fillQueryReview);

  const lastArrayName = reviewName.length - 1;
  const lastArrayReview = review.length - 1;
  const lastReviewerName = reviewName[lastArrayName];
  const lastReview = review[lastArrayReview];

  I.seeElement('input');
  I.seeElement('textarea');

  I.fillField('#name', fillQueryName);
  I.fillField('#review', fillQueryReview);

  I.click('#review_submit');

  const nameValue = String(lastReviewerName);
  const reviewTextValue = String(lastReview);

  assert.strictEqual(fillQueryName, nameValue);
  assert.strictEqual(fillQueryReview, reviewTextValue);
});
