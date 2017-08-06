import { AutomationDashboardPage } from './app.po';

describe('automation-dashboard App', () => {
  let page: AutomationDashboardPage;

  beforeEach(() => {
    page = new AutomationDashboardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
