import { Image } from 'react-native';

export const loadImage = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    Image.getSize(
      url,
      () => {
        resolve(true);
      },
      () => {
        resolve(false);
      }
    );
  });
};

export const getImageHeaders = () => {
  return {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
    'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
  };
}; 