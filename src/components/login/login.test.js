import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from './login';

describe('<LoginForm />', () => {
  const setup = () => {
    render(<Login />);
  };

  test('should load project into form', () => {
    setup();
    expect(
      screen.getByRole('form', {
        name: /edit a project/i,
      })
    ).toHaveFormValues({
      name: 'name',
      password: 'password',
    });
  });
});