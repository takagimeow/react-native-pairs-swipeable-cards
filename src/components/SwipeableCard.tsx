import React, { useEffect, useRef, useState } from 'react';
import { Animated, PanResponder, Dimensions } from 'react-native';
import { Card } from './Card';

export function isDropArea(moveX: number) {
  const screenWidth = Dimensions.get('screen').width;
  if (moveX < -(screenWidth * 0.4) || moveX > screenWidth * 0.7) {
    return true;
  }
  return false;
}

export type Props = {
  id: number;
  children: React.ReactElement;
  skipped: number;
  liked: number;
  current?: boolean;
  next?: boolean;
  scale?: Animated.Value | Animated.AnimatedInterpolation;
  onSkip?: (id: number) => void;
  onLike?: (id: number) => void;
  onPanResponderMove: (id: number, dx: number, dy: number) => void;
};

export function SwipeableCard({
  id,
  children,
  skipped,
  liked,
  current,
  next,
  scale,
  onSkip,
  onLike,
  onPanResponderMove,
}: Props) {
  const pan = useRef(new Animated.ValueXY()).current;
  const opacityRef = useRef(new Animated.Value(1));
  const [visibility, setVisibility] = useState(true);
  const [cardState, setCardState] = useState('skip');
  // これで、左下から右上に移動するとき、本来ならpan.xは正の値になるが、
  // pan.x（プラス）とpan.y（マイナス）を掛け合わせているので、-20degが設定される
  // 加えて、右下から左上に移動するとき、本来ならpan.xは負の値になるが、
  // pan.x（マイナス）とpan.y（マイナス）を掛け合わせているので、20degが設定される
  const rotateValue = Animated.multiply(pan.x, pan.y).interpolate({
    inputRange: [-18000, 0, 18000],
    outputRange: ['-20deg', '0deg', '20deg'],
    extrapolate: 'clamp',
  });
  const overlayOpacity = pan.x.interpolate({
    inputRange: [-360, 0, 360],
    outputRange: [1, 0, 1],
    extrapolate: 'clamp',
  });
  const overlayColor = pan.x.interpolate({
    inputRange: [-360, 0, 360],
    outputRange: ['#f0f0f0', 'transparent', '#fc5766'],
    extrapolate: 'clamp',
  });

  const horizontalOffset = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: pan.x, // x,y are Animated.Value
            dy: pan.y,
          },
        ],
        {
          listener: _ => {
            if (onPanResponderMove) {
              onPanResponderMove(id, (pan.x as any)._value, (pan.y as any)._value);
            }
            if ((pan.x as any)._value > 0) {
              setCardState('good');
            } else {
              setCardState('skip');
            }
          },
          useNativeDriver: false,
        },
      ),
      onPanResponderRelease: (_, gesture) => {
        if (isDropArea(gesture.dx)) {
          horizontalOffset.current = gesture.dx;
          if (horizontalOffset.current < 0 && onSkip) {
            onSkip(id);
          }
          if (horizontalOffset.current > 0 && onLike) {
            onLike(id);
          }
          Animated.parallel([
            Animated.timing(opacityRef.current, {
              toValue: 0,
              duration: 450,
              useNativeDriver: false,
            }),
            Animated.spring(pan, {
              toValue: {
                x: gesture.dx * 1.25,
                y: 50,
              },
              useNativeDriver: false,
            }),
          ]).start(({}) => {
            setVisibility(false);
          });
        } else {
          Animated.spring(
            pan, // Auto-multiplexed
            { toValue: { x: 0, y: 0 }, useNativeDriver: false }, // Back to zero
          ).start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    const token = pan.x.addListener(({ value }) =>
      onPanResponderMove(id, value, (pan.y as any)._value),
    );
    return () => {
      pan.x.removeListener(token);
    };
  }, []);

  useEffect(() => {
    if (skipped === id) {
      setCardState('skip');
      skip();
      return;
    }
    if (liked === id) {
      setCardState('good');
      like();
      return;
    }
  }, [skipped, liked]);

  const skip = () => {
    Animated.parallel([
      Animated.timing(opacityRef.current, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.spring(pan, {
        toValue: {
          x: (Dimensions.get('window').width / 2) * -1,
          y: 50,
        },
        useNativeDriver: false,
      }),
    ]).start(({}) => {
      setVisibility(false);
    });
  };

  const like = () => {
    Animated.parallel([
      Animated.timing(opacityRef.current, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.spring(pan, {
        toValue: {
          x: Dimensions.get('window').width / 2,
          y: 50,
        },
        useNativeDriver: false,
      }),
    ]).start(({}) => {
      setVisibility(false);
    });
  };

  if (!visibility) {
    return null;
  }
  return (
    <Card
      panResponder={panResponder}
      pan={pan}
      opacity={opacityRef.current}
      overlayOpacity={overlayOpacity}
      overlayColor={overlayColor}
      cardState={cardState}
      rotate={rotateValue}
      scale={current ? new Animated.Value(1) : next && scale ? scale : 0.925}
    >
      {children}
    </Card>
  );
}
