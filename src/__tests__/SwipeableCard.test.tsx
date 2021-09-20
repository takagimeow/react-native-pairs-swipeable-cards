/* eslint-disable @typescript-eslint/unbound-method */
import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';

import { SwipeableCard } from '../components/SwipeableCard';

jest.mock('@expo/vector-icons', () => {
  return {
    FontAwesome: () => <View></View> as any,
  };
});
describe('SwipeableCard', () => {
  it('Snapshot Test', () => {
    const { toJSON } = render(
      <SwipeableCard
        key={`key_${0}`}
        id={0}
        skipped={-1}
        liked={-1}
        current={true}
        next={false}
        scale={undefined}
        onPanResponderMove={(id, dx, dy) => {
          console.log('id: ', id);
          console.log('dx: ', dx);
          console.log('dy: ', dy);
        }}
        onSkip={id => console.log('skip: ', id)}
        onLike={id => console.log('like: ', id)}
      >
        <View></View>
      </SwipeableCard>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
