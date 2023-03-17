import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from '../components/BlogForm';

describe('<BlogForm>', () => {
  test('BlogForm correct data sent on submit', async () => {
    const addBlog = jest.fn();
    const user = userEvent.setup();

    render(<BlogForm createBlog={addBlog} />);

    const sendButton = screen.getByText('create');

    await user.type(screen.getByLabelText('title'), 'new blog');
    await user.type(screen.getByLabelText('author'), 'Cool Guy');
    await user.type(screen.getByLabelText('url'), 'http://example.com');
    await user.click(sendButton);

    expect(addBlog).toBeCalledTimes(1);
    expect(addBlog).toBeCalledWith(
      expect.objectContaining({
        title: 'new blog',
        author: 'Cool Guy',
        url: 'http://example.com',
      })
    );
  });
});
