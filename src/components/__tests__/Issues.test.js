import React from 'react';
import renderer from 'react-test-renderer';
import Issues from '../Issues';

beforeAll(() => {
  Date.now = jest.fn(() => 1487076708000);
});

afterAll(() => {});

describe('Issue', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Issues
          issues={[
            {
              id: 1,
              html_url: 'html_url-test',
              user: {
                avatar_url: 'avatar_url-test',
                html_url: 'html_url-test',
              },
              title: 'title-test',
              assignee: {
                html_url: 'html_url_test-2',
                avatar_url: 'avatar_url-test',
              },
              created_at: '2020-10-09T15:39:00Z',
              updated_at: '2020-11-12T17:21:00Z',
              labels: [
                { name: 'label-1-test', color: '012345' },
                { name: 'label-2-test', color: 'fedba0' },
              ],
              body: 'body-test',
              draft: false,
              state: 'state-test',
            },
            {
              id: 2,
              html_url: 'html_url-test',
              user: {
                avatar_url: 'avatar_url-test',
                html_url: 'html_url-test',
              },
              title: 'title-test',
              assignee: {
                html_url: 'html_url_test-2',
                avatar_url: 'avatar_url-test',
              },
              created_at: '2020-10-09T15:39:00Z',
              updated_at: '2020-11-12T17:21:00Z',
              labels: [
                { name: 'label-1-test', color: '012345' },
                { name: 'label-2-test', color: 'fedba0' },
              ],
              body: 'body-test',
              draft: false,
              state: 'state-test',
            },
            {
              id: 3,
              html_url: 'html_url-test',
              user: {
                avatar_url: 'avatar_url-test',
                html_url: 'html_url-test',
              },
              title: 'title-test',
              assignee: {
                html_url: 'html_url_test-2',
                avatar_url: 'avatar_url-test',
              },
              created_at: '2020-10-09T15:39:00Z',
              updated_at: '2020-11-12T17:21:00Z',
              labels: [
                { name: 'label-1-test', color: '012345' },
                { name: 'label-2-test', color: 'fedba0' },
              ],
              body: 'body-test',
              draft: true,
              state: 'state-test',
            },
            {
              id: 4,
              html_url: 'html_url-test',
              user: {
                avatar_url: 'avatar_url-test',
                html_url: 'html_url-test',
              },
              title: 'title-test',
              assignee: {
                html_url: 'html_url_test-2',
                avatar_url: 'avatar_url-test',
              },
              created_at: '2020-10-09T15:39:00Z',
              updated_at: '2020-11-12T17:21:00Z',
              labels: [
                { name: 'label-1-test', color: '012345' },
                { name: 'label-2-test', color: 'fedba0' },
              ],
              body: 'body-test',
              draft: true,
              state: 'state-test',
            },
          ]}
          filter={true}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
