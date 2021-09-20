import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

import { Button } from './Button';

export interface IController {
  onSkip?: () => void;
  onLikeWithMessage?: () => void;
  onLike?: () => void;
}

export const Controller = ({ onSkip, onLikeWithMessage, onLike }: IController) => {
  return (
    <View style={styles.container}>
      <Button name="reply" onPress={onSkip} />
      <Button name="handshake-o" color="#fc5766" onPress={onLikeWithMessage} />
      <Button name="heart" color="#fc5766" onPress={onLike} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: Dimensions.get('window').width,
    paddingBottom: 32,
    paddingHorizontal: 64,
  },
});
