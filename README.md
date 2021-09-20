# react-native-pairs-swipeable-cards

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Github Actions](https://github.com/takagimeow/react-native-pairs-swipeable-cards/workflows/Test%20for%20PR/badge.svg)](https://github.com/takagimeow/react-native-pairs-swipeable-cards)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![NPM version](https://img.shields.io/npm/v/react-native-pairs-swipeable-cards.svg?style=flat-square)](https://npmjs.com/package/react-native-pairs-swipeable-cards)
[![NPM downloads](https://img.shields.io/npm/dm/react-native-pairs-swipeable-cards.svg?style=flat-square)](https://npmjs.com/package/react-native-pairs-swipeable-cards)

This is the simplest swipeable cards component made for React Native.

<p align="center">
  <img src="https://user-images.githubusercontent.com/66447334/134050082-a6b258a1-f6fa-4ace-a7e8-99478ee6a650.jpg" height="542" alt="Simple" />
</p>

## Installation

```bash
# npm
npm instal react-native-pairs-swipeable-cards

# yarn
yarn add react-native-pairs-swipeable-cards
```

## Usage

Here is a quick example.

```tsx
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { SwipeableCards, BORDER_RADIUS } from 'react-native-pairs-swipeable-cards';

export default function App() {
  const data: {
    id: string;
    isActive: boolean;
    name: string;
    age: number;
    place: string;
    rate: number;
    tags: string[];
    imageUri: string;
  }[] = [
    {
      id: 'misono',
      isActive: true,
      name: '高村美園',
      age: 25,
      place: '神奈川県',
      rate: 64,
      tags: ['読書好き', '友達みたいな恋人が・・・', '気ままにドライブに行きたい!'],
        'https://image.png',
    },
    {
      id: 'arisa',
      isActive: false,
      name: '須藤亜里沙',
      age: 24,
      place: '福岡県',
      rate: 64,
      tags: ['読書好き', '友達みたいな恋人が・・・', '気ままにドライブに行きたい!'],
        'https://image.png',
    },
    {
      id: 'sasaki',
      isActive: false,
      name: '佐々木涼平',
      age: 24,
      place: '東京都',
      rate: 64,
      tags: ['読書好き', '友達みたいな恋人が・・・', '気ままにドライブに行きたい!'],
      imageUri:
        'https://image.png',
    },
    {
      id: 'tsugumi',
      isActive: true,
      name: '川本つぐみ',
      age: 24,
      place: '東京都',
      rate: 64,
      tags: ['読書好き', '友達みたいな恋人が・・・', '気ままにドライブに行きたい!'],
      imageUri:
        'https://image.png',
    },
  ];
  return (
    <View style={styles.container}>
      <SwipeableCards
        data={data}
        onLike={() => console.log('いいね')}
        onSkip={() => console.log('スキップ!')}
        renderItem={(item, index) => (
          <ImageBackground
            key={`render_item_key_${index}`}
            source={{
              uri: item.imageUri,
            }}
            resizeMode="cover"
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              paddingVertical: 16,
            }}
            imageStyle={{
              borderRadius: BORDER_RADIUS,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                marginBottom: 8,
              }}
            >
              <View
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 25,
                  backgroundColor: item.isActive ? '#2cd26b' : '#cc0033',
                  marginRight: 8,
                }}
              />
              <Text
                style={{
                  color: '#ffffff',
                  fontWeight: 'bold',
                  fontSize: 32,
                }}
              >
                {item.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                marginBottom: 8,
              }}
            >
              <Text
                style={{
                  color: '#ffffff',
                  fontWeight: 'bold',
                  fontSize: 16,
                  marginRight: 10,
                }}
              >
                {`${item.age}歳`}
              </Text>
              <Text
                style={{
                  color: '#ffffff',
                  fontWeight: 'bold',
                  fontSize: 16,
                  marginRight: 10,
                }}
              >
                {`${item.place}`}
              </Text>
              <Text
                style={{
                  color: '#ffffff',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}
              >
                {`♡${item.rate}%`}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
              }}
            >
              {item.tags.map(tag => (
                <View
                  key={`tag_${tag}`}
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 10,
                    borderRadius: 6,
                    marginRight: 6,
                    backgroundColor: '#ffffff',
                  }}
                >
                  <Text
                    style={{
                      color: '#000000',
                      fontSize: 8,
                      fontWeight: 'bold',
                    }}
                  >
                    {tag}
                  </Text>
                </View>
              ))}
            </View>
          </ImageBackground>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

## Props and methods

### Props

#### data (Required)

Type: array of Object which has id: string property

For simplicity, data is a plain array.

#### renderItem (Required)

Type: (item: T, index: number) => React.ReactElement

Method which return contents to be displayed on the screen.

#### onSkip

Type: (item: Object) => void

Method called when a card is swiped to the left or when the skip button is pressed.
#### onLike

Type: (item: Object) => void

Method called when a card is swiped to the right or when the like button is pressed.
#### onLikeWithMessage

Type: (item: Object) => void

Method called when the middle button is pressed.

