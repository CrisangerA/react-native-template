import storage from '@react-native-firebase/storage';
import { manageFirebaseError } from '../domain/firebase.error';
import type { StorageRepository } from '../domain/storage.repository';
import type {
  File,
  FileMetadata,
  ListOptions,
  UploadOptions,
  UploadResult,
} from '../domain/storage.model';
import { adaptFirebaseMetadata } from '../domain/storage.adapter';

class FirebaseStorageService implements StorageRepository {
  private storage = storage();

  async upload(
    path: string,
    file: File,
    options?: UploadOptions,
  ): Promise<UploadResult | Error> {
    try {
      const ref = this.storage.ref(path);
      const task = ref.putFile(file.uri, {
        contentType: options?.contentType,
        customMetadata: options?.customMetadata,
        cacheControl: options?.cacheControl,
      });

      if (options?.onProgress) {
        task.on('state_changed', snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          options.onProgress!(progress);
        });
      }

      const snapshot = await task;
      const url = await ref.getDownloadURL();

      return {
        path: snapshot.metadata.fullPath,
        url,
        metadata: adaptFirebaseMetadata(snapshot.metadata),
      };
    } catch (error) {
      return manageFirebaseError(error);
    }
  }

  async getDownloadURL(path: string): Promise<string | Error> {
    try {
      const url = await this.storage.ref(path).getDownloadURL();
      return url;
    } catch (error) {
      return manageFirebaseError(error);
    }
  }

  async delete(path: string): Promise<void | Error> {
    try {
      await this.storage.ref(path).delete();
      return;
    } catch (error) {
      return manageFirebaseError(error);
    }
  }

  async list(
    path: string,
    options?: ListOptions,
  ): Promise<FileMetadata[] | Error> {
    try {
      const ref = this.storage.ref(path);
      const result = await ref.list({
        maxResults: options?.maxResults,
        pageToken: options?.pageToken,
      });

      const metadata = await Promise.all(
        result.items.map(item => item.getMetadata()),
      );

      return metadata.map(adaptFirebaseMetadata);
    } catch (error) {
      return manageFirebaseError(error);
    }
  }

  async getMetadata(path: string): Promise<FileMetadata | Error> {
    try {
      const metadata = await this.storage.ref(path).getMetadata();
      return adaptFirebaseMetadata(metadata);
    } catch (error) {
      return manageFirebaseError(error);
    }
  }
}

function createFirebaseStorageService(): StorageRepository {
  return new FirebaseStorageService();
}

export default createFirebaseStorageService();
