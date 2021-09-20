import React from 'react';
import { Animated, View, StyleSheet, Dimensions, PanResponderInstance, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export const CARD_WIDTH = Dimensions.get('screen').width * 0.915;
export const CARD_HEIGHT = Dimensions.get('screen').height * 0.695;
export const BORDER_RADIUS = 12;

export interface ICard {
  children: JSX.Element;
  panResponder: PanResponderInstance;
  pan: Animated.ValueXY;
  opacity: Animated.Value;
  overlayOpacity: Animated.AnimatedInterpolation;
  overlayColor: Animated.AnimatedInterpolation;
  cardState: string;
  rotate: string | Animated.Value | Animated.AnimatedInterpolation;
  scale: number | Animated.Value | Animated.AnimatedInterpolation;
}

export const Card = ({
  children,
  panResponder,
  pan,
  opacity,
  overlayOpacity,
  overlayColor,
  cardState,
  rotate,
  scale,
}: ICard) => {
  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        pan.getLayout(),
        styles.box,
        {
          opacity,
          transform: [
            {
              rotate,
            },
            {
              scale: scale,
            },
          ],
        },
        {
          position: 'absolute',
        },
      ]}
    >
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: overlayColor,
            zIndex: 1,
            opacity: overlayOpacity,
            paddingHorizontal: 8,
            paddingVertical: 8,
            borderRadius: BORDER_RADIUS - 1,
          },
        ]}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: cardState === 'good' ? 'flex-start' : 'flex-end',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              marginRight: 8,
            }}
          >
            <FontAwesome
              name={cardState === 'good' ? 'thumbs-up' : 'reply'}
              size={40}
              color={'#ffffff'}
            />
          </View>
          <Text style={styles.text}>{cardState === 'good' ? 'いいね' : 'スキップ'}</Text>
        </View>
      </Animated.View>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#f0f0f0',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
  },
  text: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
