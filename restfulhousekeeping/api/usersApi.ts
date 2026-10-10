import {
  UpdateUserPayload,
  User,
} from '@/types/entityTypes';
import { request } from '@/api/apiClient';

export function getUserById(userId: number | null): Promise<User> {
  return request<User>({
    method: 'GET',
    url: `/cleaners/${userId}`,
  });
}

export function updateUserById(
  userId: number | null,
  user: UpdateUserPayload,
): Promise<User> {
  return request<User>({
    method: 'PATCH',
    url: `/cleaners/${userId}`,
    data: user
  });
}

export function getAllCleaners(organizationId: number): Promise<User[]> {
  return request<User[]>({
    method: 'GET',
    url: `/cleaners/${organizationId}/cleaners`,
  });
}

// info we need from the image picker
type PickedImage = {
  uri: string;
  mimeType?: string | null;
  fileName?: string | null;
};

// upload a profile picture, returns the updated user
export function uploadProfilePicture(
  userId: number,
  image: PickedImage,
): Promise<User> {
  const formData = new FormData();
  formData.append('file', {
    uri: image.uri,
    type: image.mimeType ?? 'image/jpeg',
    name: image.fileName ?? `profile-${Date.now()}.jpg`,
  } as any);

  return request<User>({
    method: 'POST',
    url: `/cleaners/${userId}/profile-picture`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

// get the saved picture path for a user (null if they don't have one)
export async function getProfilePicturePath(
  userId: number,
): Promise<string | null> {
  const path = await request<string>({
    method: 'GET',
    url: `/cleaners/${userId}/profile-picture`,
    responseType: 'text',
  });
  return path ? path : null;
}

// download the picture with our token and turn it into a data uri
// so <Image> can show it (Image can't send the token on its own)
// (split on both slashes since windows paths use \)
export async function getProfilePictureDataUri(
  path: string,
): Promise<string | null> {
  const fileName = path.split(/[\\/]/).pop();
  if (!fileName) return null;

  const blob = await request<Blob>({
    method: 'GET',
    url: `/cleaners/profile-pictures/${encodeURIComponent(fileName)}`,
    responseType: 'blob',
  });

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}