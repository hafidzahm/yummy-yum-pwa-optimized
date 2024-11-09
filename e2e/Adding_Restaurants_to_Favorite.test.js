Feature('Adding restaurants to Favorite');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty favorited restaurants', ({ I }) => {
  I.seeElement('.empty-favorite');
  I.see('Anda tidak punya Restoran Favorit.', '.text-info');
});
