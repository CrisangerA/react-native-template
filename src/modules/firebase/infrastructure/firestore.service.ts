import firestore from '@react-native-firebase/firestore';
import { manageFirebaseError } from '../domain/firebase.error';
import type { FirestoreRepository } from '../domain/firestore.repository';
import type {
  CreateDocumentPayload,
  DeleteDocumentPayload,
  FirestoreCollection,
  FirestoreDocument,
  GetDocumentPayload,
  ListDocumentsPayload,
  UpdateDocumentPayload,
} from '../domain/firestore.model';

class FirebaseFirestoreService implements FirestoreRepository {
  private firestore = firestore();

  async create<T>(
    payload: CreateDocumentPayload<T>,
  ): Promise<FirestoreDocument<T> | Error> {
    try {
      let docRef;

      if (payload.id) {
        docRef = this.firestore.collection(payload.collection).doc(payload.id);
        await docRef.set(payload.data as Record<string, unknown>);
      } else {
        docRef = await this.firestore
          .collection(payload.collection)
          .add(payload.data as Record<string, unknown>);
      }

      const snapshot = await docRef.get();

      return {
        id: snapshot.id,
        data: snapshot.data() as T,
        exists: Boolean(snapshot.exists),
      };
    } catch (error) {
      return manageFirebaseError(error);
    }
  }

  async get<T>(
    payload: GetDocumentPayload,
  ): Promise<FirestoreDocument<T> | Error> {
    try {
      const docRef = this.firestore
        .collection(payload.collection)
        .doc(payload.id);
      const snapshot = await docRef.get();

      return {
        id: snapshot.id,
        data: snapshot.data() as T,
        exists: Boolean(snapshot.exists),
      };
    } catch (error) {
      return manageFirebaseError(error);
    }
  }

  async update<T>(payload: UpdateDocumentPayload<T>): Promise<void | Error> {
    try {
      const docRef = this.firestore
        .collection(payload.collection)
        .doc(payload.id);
      await docRef.update(payload.data as Record<string, unknown>);
      return;
    } catch (error) {
      return manageFirebaseError(error);
    }
  }

  async delete(payload: DeleteDocumentPayload): Promise<void | Error> {
    try {
      const docRef = this.firestore
        .collection(payload.collection)
        .doc(payload.id);
      await docRef.delete();
      return;
    } catch (error) {
      return manageFirebaseError(error);
    }
  }

  async list<T>(
    payload: ListDocumentsPayload,
  ): Promise<FirestoreCollection<T> | Error> {
    try {
      const collectionRef = this.firestore.collection(payload.collection);
      let query: ReturnType<typeof collectionRef.where> = collectionRef;

      if (payload.where) {
        payload.where.forEach(condition => {
          query = query.where(
            condition.field,
            condition.operator,
            condition.value,
          );
        });
      }

      if (payload.orderBy) {
        payload.orderBy.forEach(order => {
          query = query.orderBy(order.field, order.direction);
        });
      }

      if (payload.limit) {
        query = query.limit(payload.limit);
      }

      if (payload.startAfter) {
        const startAfterDoc = await this.firestore
          .collection(payload.collection)
          .doc(payload.startAfter as string)
          .get();
        query = query.startAfter(startAfterDoc);
      }

      const snapshot = await query.get();

      return {
        docs: snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data() as T,
          exists: Boolean(doc.exists),
        })),
        size: snapshot.size,
        empty: snapshot.empty,
      };
    } catch (error) {
      return manageFirebaseError(error);
    }
  }
}

function createFirestoreService(): FirestoreRepository {
  return new FirebaseFirestoreService();
}

export default createFirestoreService();
