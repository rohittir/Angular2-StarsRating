import { StarsRatingPage } from './app.po';

describe('stars-rating App', function() {
  let page: StarsRatingPage;

  beforeEach(() => {
    page = new StarsRatingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
