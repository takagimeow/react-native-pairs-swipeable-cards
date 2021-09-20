/* eslint-disable @typescript-eslint/unbound-method */
import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';

import { Controller } from '../components/Controller';

jest.mock('@expo/vector-icons', () => {
  return {
    FontAwesome: () => (<View></View>) as any,
  };
});
describe('Controller', () => {
  it('Snapshot Test', () => {
    const { toJSON } = render(
      <Controller
        onSkip={() => {
          console.log('skip');
        }}
        onLike={() => {
          console.log('like');
        }}
        onLikeWithMessage={() => {
          console.log('likeWithMessage');
        }}
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
