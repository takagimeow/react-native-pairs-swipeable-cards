/* eslint-disable @typescript-eslint/unbound-method */
import React from 'react';
import { render } from '@testing-library/react-native';

import { SwipeableCards } from '../components/SwipeableCards';
import { BORDER_RADIUS } from '../components/Card';
import { ImageBackground, Text, View } from 'react-native';

jest.mock('@expo/vector-icons', () => {
  return {
    FontAwesome: () => (<View></View>) as any,
  };
});
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
    imageUri: 'https://pakutaso.cdn.rabify.me/shared/img/thumb/AMEMAN17826009.jpg.webp?d=1420',
  },
  {
    id: 'arisa',
    isActive: false,
    name: '須藤亜里沙',
    age: 24,
    place: '福岡県',
    rate: 64,
    tags: ['読書好き', '友達みたいな恋人が・・・', '気ままにドライブに行きたい!'],
    imageUri: 'https://pakutaso.cdn.rabify.me/shared/img/thumb/TS0529003.jpg.webp?d=1420',
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
      'https://pakutaso.cdn.rabify.me/shared/img/thumb/SSK_hinatawomitumeruretoribar.jpg.webp?d=710',
  },
  {
    id: 'tsugumi',
    isActive: true,
    name: '川本つぐみ',
    age: 24,
    place: '東京都',
    rate: 64,
    tags: ['読書好き', '友達みたいな恋人が・・・', '気ままにドライブに行きたい!'],
    imageUri: 'https://pakutaso.cdn.rabify.me/shared/img/thumb/nekocatIMGL54791978.jpg.webp?d=710',
  },
];

describe('SwipeableCards', () => {
  it('Snapshot Test', () => {
    const { toJSON } = render(
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
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
