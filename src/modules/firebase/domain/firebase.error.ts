import { FIREBASE_MESSAGES } from './firebase.messages';

export function manageFirebaseError(error: unknown) {
  if (error instanceof Error) {
    const code = error.message;

    if (code.includes('auth/email-already-in-use')) {
      const e = new Error(FIREBASE_MESSAGES.EMAIL_ALREADY_IN_USE);
      e.name = 'DuplicateIdentifierError';
      return e;
    }

    if (code.includes('auth/invalid-email')) {
      const e = new Error(FIREBASE_MESSAGES.INVALID_EMAIL);
      e.name = 'FormError';
      return e;
    }

    if (code.includes('auth/weak-password')) {
      const e = new Error(FIREBASE_MESSAGES.WEAK_PASSWORD);
      e.name = 'FormError';
      return e;
    }

    if (code.includes('auth/user-not-found')) {
      return new Error(FIREBASE_MESSAGES.USER_NOT_FOUND);
    }

    if (code.includes('auth/wrong-password')) {
      return new Error(FIREBASE_MESSAGES.WRONG_PASSWORD);
    }

    if (code.includes('storage/object-not-found')) {
      return new Error(FIREBASE_MESSAGES.OBJECT_NOT_FOUND);
    }

    if (code.includes('storage/unauthorized')) {
      return new Error(FIREBASE_MESSAGES.UNAUTHORIZED);
    }

    if (code.includes('storage/quota-exceeded')) {
      return new Error(FIREBASE_MESSAGES.QUOTA_EXCEEDED);
    }

    if (code.includes('auth/network-request-failed')) {
      return new Error(FIREBASE_MESSAGES.NETWORK_ERROR);
    }

    if (
      code.includes('firestore/not-found') ||
      code.includes('firestore/(not-found)')
    ) {
      return new Error(FIREBASE_MESSAGES.DOCUMENT_NOT_FOUND);
    }

    if (
      code.includes('firestore/already-exists') ||
      code.includes('firestore/(already-exists)')
    ) {
      const e = new Error(FIREBASE_MESSAGES.DOCUMENT_ALREADY_EXISTS);
      e.name = 'DuplicateIdentifierError';
      return e;
    }

    if (
      code.includes('firestore/invalid-argument') ||
      code.includes('firestore/(invalid-argument)')
    ) {
      const e = new Error(FIREBASE_MESSAGES.INVALID_ARGUMENT);
      e.name = 'FormError';
      return e;
    }

    if (
      code.includes('firestore/deadline-exceeded') ||
      code.includes('firestore/(deadline-exceeded)')
    ) {
      return new Error(FIREBASE_MESSAGES.DEADLINE_EXCEEDED);
    }

    if (
      code.includes('firestore/permission-denied') ||
      code.includes('firestore/(permission-denied)')
    ) {
      return new Error(FIREBASE_MESSAGES.PERMISSION_DENIED);
    }

    if (
      code.includes('firestore/resource-exhausted') ||
      code.includes('firestore/(resource-exhausted)')
    ) {
      return new Error(FIREBASE_MESSAGES.RESOURCE_EXHAUSTED);
    }

    if (
      code.includes('firestore/cancelled') ||
      code.includes('firestore/(cancelled)')
    ) {
      return new Error(FIREBASE_MESSAGES.CANCELLED);
    }

    if (
      code.includes('firestore/unavailable') ||
      code.includes('firestore/(unavailable)')
    ) {
      return new Error(FIREBASE_MESSAGES.UNAVAILABLE);
    }

    if (code.includes('firestore/network-request-failed')) {
      return new Error(FIREBASE_MESSAGES.NETWORK_ERROR);
    }

    return error;
  }

  return new Error(FIREBASE_MESSAGES.UNKNOWN_ERROR);
}
