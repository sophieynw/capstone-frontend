import { Alert, Image, Pressable, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ImagePlus, X } from 'lucide-react-native';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';

const MAX_PHOTOS = 10;

type PhotosSectionProps = {
  photos: ImagePicker.ImagePickerAsset[];
  onPhotosChange: (photos: ImagePicker.ImagePickerAsset[]) => void;
};

export function PhotosSection({ photos, onPhotosChange }: PhotosSectionProps) {
  async function pickPhotos() {
    if (photos.length >= MAX_PHOTOS) {
      Alert.alert(
        'Photo limit reached',
        `You can add up to ${MAX_PHOTOS} photos.`,
      );
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsMultipleSelection: true,
        selectionLimit: MAX_PHOTOS - photos.length,
        quality: 0.8,
      });

      if (result.canceled) return;

      const existingUris = new Set(photos.map((photo) => photo.uri));
      const newPhotos = result.assets.filter(
        (photo) => !existingUris.has(photo.uri),
      );

      onPhotosChange([...photos, ...newPhotos].slice(0, MAX_PHOTOS));
    } catch {
      Alert.alert(
        'Could not open photos',
        'Please try selecting photos again.',
      );
    }
  }

  function removePhoto(uri: string) {
    onPhotosChange(photos.filter((photo) => photo.uri !== uri));
  }

  return (
    <View className='flex-col justify-center gap-2'>
      <Heading size='md'>Photos</Heading>

      <View className='py-2 gap-3'>
        <Pressable
          onPress={pickPhotos}
          className='min-h-32 items-center justify-center gap-2 rounded-3xl border border-dashed border-gray-300 bg-gray-50 px-4 py-6'
          accessibilityRole='button'
          accessibilityLabel='Upload photos'
        >
          <ImagePlus size={28} />
          <Text className='font-medium'>Upload photos</Text>
          <Text className='text-center text-sm text-gray-500'>
            Choose up to {MAX_PHOTOS} photos from your library
          </Text>
        </Pressable>

        {photos.length > 0 && (
          <View className='flex-row flex-wrap gap-3'>
            {photos.map((photo) => (
              <View key={photo.assetId ?? photo.uri} className='relative'>
                <Image
                  source={{ uri: photo.uri }}
                  style={{ width: 96, height: 96, borderRadius: 12 }}
                  resizeMode='cover'
                  accessibilityLabel='Selected cleaning photo'
                />
                <Pressable
                  onPress={() => removePhoto(photo.uri)}
                  className='absolute -right-2 -top-2 h-7 w-7 items-center justify-center rounded-full bg-black'
                  accessibilityRole='button'
                  accessibilityLabel='Remove photo'
                >
                  <X size={16} color='white' />
                </Pressable>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
