Feature('Adding restaurants to Favorite');
const assert = require('assert');
Before(({ I }) => {
  I.amOnPage('/#/favorite');
});
Scenario('showing empty favorited restaurants', ({ I }) => {
  I.seeElement('.empty-favorite');
  I.see('Anda tidak punya Restoran Favorit.', '.text-info');
});
Scenario('adding restaurants to favorite', async ({ I }) => {
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
});
