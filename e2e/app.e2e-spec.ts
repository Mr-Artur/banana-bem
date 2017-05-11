import { BananaBEMPage } from './app.po';

describe('banana-bem App', () => {
  let page: BananaBEMPage;

  beforeEach(() => {
    page = new BananaBEMPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
