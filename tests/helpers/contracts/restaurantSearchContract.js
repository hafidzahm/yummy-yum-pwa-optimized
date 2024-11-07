const itActsAsSearchModel = (allRestaurants) => {
  it('should be able to search for movies', async () => {
    allRestaurants.putRestaurant({
      id: 1,
      name: 'resto a',
      city: 'bogor',
      rating: 4.5,
    });
    allRestaurants.putRestaurant({
      id: 2,
      name: 'resto b',
      city: 'cianjur',
      rating: 4.2,
    });
    allRestaurants.putRestaurant({
      id: 3,
      name: 'resto abc',
      city: 'bandung',
      rating: 4.3,
    });
    allRestaurants.putRestaurant({
      id: 4,
      name: 'ini mah resto abcd',
      city: 'jakarta',
      rating: 4.1,
    });

    expect(await allRestaurants.searchRestaurants('resto a')).toEqual([
      { id: 1, name: 'resto a', city: 'bogor', rating: 4.5 },
      { id: 3, name: 'resto abc', city: 'bandung', rating: 4.3 },
      { id: 4, name: 'ini mah resto abcd', city: 'jakarta', rating: 4.1 },
    ]);
  });
};

export { itActsAsSearchModel };
