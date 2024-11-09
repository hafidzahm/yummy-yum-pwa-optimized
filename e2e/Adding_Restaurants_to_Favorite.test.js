Feature('Adding restaurants to Favorite');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty favorited restaurants', ({ I }) => {
  I.seeElement('.empty-favorite');
  I.see('Anda tidak punya Restoran Favorit.', '.text-info');
});

Scenario('adding restaurants to favorite', ({ I }) => {
  I.see('Anda tidak punya Restoran Favorit.', '.text-info');

  I.amOnPage('/');

  I.seeElement('#card-item__name a');
  I.click(locate('#card-item__name a').first());

  I.seeElement('.favoriteButton');
  I.click('.favoriteButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');

});