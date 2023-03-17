import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Blog from '../components/Blog';

describe('<Blog>', () => {
  let userSetup = null;
  let likeHandler = null;

  beforeEach(() => {
    const blog = {
      title: 'How to annoy Teddy',
      author: 'Mishka Aldanova',
      url: 'http://example.com',
      likes: 1,
      user: { username: 'mishka' },
    };

    const user = {
      username: 'mishka',
    };

    userSetup = userEvent.setup();
    likeHandler = jest.fn();
    render(<Blog likeHandler={likeHandler} user={user} blog={blog} />);
  });

  test('Blog only render title/author', async () => {
    const definedElement = screen.getByTestId('title-author');
    expect(definedElement).toBeDefined();

    const url = screen.queryByText('http://example.com');
    expect(url).toBeNull();

    const likes = screen.queryByText('1 likes');
    expect(likes).toBeNull();
  });

  test('Blog show url/likes after clicking view', async () => {
    const button = screen.getByRole('button');
    await userSetup.click(button);

    const url = screen.queryByText('http://example.com');
    expect(url).toBeDefined();

    const likes = screen.queryByText('1 likes');
    expect(likes).toBeDefined();
  });

  test('Blog likeHandler called twice for two clicks', async () => {
    const button = screen.getByRole('button');
    await userSetup.click(button);

    const likeButton = screen.getByText('like');
    await userSetup.click(likeButton);
    await userSetup.click(likeButton);

    expect(likeHandler).toHaveBeenCalledTimes(2);
  });
});
