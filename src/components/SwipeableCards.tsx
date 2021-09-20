import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { SwipeableCard } from './SwipeableCard';
import { CARD_HEIGHT, CARD_WIDTH } from './Card';

import { Controller } from './Controller';

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms, 'sleep'));
}

export interface Item {
  id: string;
}

export type Props<T extends Item> = {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactElement;
  onSkip?: (item: T) => void;
  onLike?: (item: T) => void;
  onLikeWithMessage?: (item: T) => void;
};

export function SwipeableCards<T extends Item>({
  data,
  renderItem,
  onLike,
  onLikeWithMessage,
  onSkip,
}: Props<T>) {
  const [reversedData, setReversedData] = useState<T[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(data.length - 1);
  const currnetCardDx = useRef(new Animated.Value(0));
  const currentCardDy = useRef(new Animated.Value(0));

  const [skipped, setSkipped] = useState(-1);
  const [liked, setLiked] = useState(-1);
  const timerIdRef = useRef<NodeJS.Timeout>();

  const [scale] = useState(
    currnetCardDx.current.interpolate({
      inputRange: [-180, 0, 180],
      outputRange: [1, 0.925, 1],
      extrapolate: 'clamp',
    }),
  );

  useEffect(() => {
    data.reverse();
    setReversedData(data);
  }, []);

  const handlePanResponderMove = useCallback((_, dx, dy) => {
    currnetCardDx.current.setValue(dx);
    currentCardDy.current.setValue(dy);
  }, []);

  const next = useCallback(
    (cardId: number, from?: string) => {
      if (timerIdRef.current) {
        return;
      }
      if (from && from === 'SKIP') {
        setSkipped(cardId);
        timerIdRef.current = setTimeout(() => {
          setCurrentCardIndex(cardId - 1);
          timerIdRef.current = undefined;
        }, 500);
        onSkip && onSkip(reversedData[cardId]);
        return;
      }
      if (from && from === 'LIKE') {
        setLiked(cardId);
        timerIdRef.current = setTimeout(() => {
          setCurrentCardIndex(cardId - 1);
          timerIdRef.current = undefined;
        }, 500);
        onLike && onLike(reversedData[cardId]);
        return;
      }
      if (from && from === 'LIKE_WITH_MESSAGE') {
        setLiked(cardId);
        timerIdRef.current = setTimeout(() => {
          setCurrentCardIndex(cardId - 1);
          timerIdRef.current = undefined;
        }, 500);
        onLikeWithMessage && onLikeWithMessage(reversedData[cardId]);
        return;
      }
      if (from && from === 'SKIP_MANUALLY' && onSkip) {
        onSkip(reversedData[cardId]);
      }
      if (from && from === 'LIKE_MANUALLY' && onLike) {
        onLike(reversedData[cardId]);
      }
      setCurrentCardIndex(cardId - 1);
    },
    [currentCardIndex, setSkipped, setLiked],
  );

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.box}>
          {reversedData.map((item, index) => {
            return (
              <SwipeableCard
                key={`key_${index}`}
                id={index}
                skipped={skipped}
                liked={liked}
                current={currentCardIndex === index}
                next={currentCardIndex - 1 === index}
                scale={currentCardIndex - 1 === index ? scale : undefined}
                onPanResponderMove={handlePanResponderMove}
                onSkip={id => next(id, 'SKIP_MANUALLY')}
                onLike={id => next(id, 'LIKE_MANUALLY')}
              >
                {renderItem(item, index)}
              </SwipeableCard>
            );
          })}
        </View>
      </View>
      <Controller
        onSkip={() => {
          next(currentCardIndex, 'SKIP');
        }}
        onLike={() => {
          next(currentCardIndex, 'LIKE');
        }}
        onLikeWithMessage={() => {
          next(currentCardIndex, 'LIKE_WITH_MESSAGE');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%',
  },
  cardContainer: {
    position: 'relative',
    width: 'auto',
    height: 'auto',
    marginBottom: 48,
  },
  box: {
    position: 'relative',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
});
