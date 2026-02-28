import auth from '@react-native-firebase/auth';
import { manageFirebaseError } from '@modules/firebase/domain/firebase.error';
import type { AuthRepository } from '../domain/auth.repository';
import type {
  SignUpPayload,
  SignUpResponse,
  SignInPayload,
  SignInResponse,
} from '../domain/auth.model';

class FirebaseAuthService implements AuthRepository {
  async signup(data: SignUpPayload): Promise<SignUpResponse | Error> {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        data.email,
        data.password,
      );

      return {
        user: {
          email: userCredential.user.email!,
        },
      };
    } catch (error) {
      return manageFirebaseError(error);
    }
  }

  async signin(data: SignInPayload): Promise<SignInResponse | Error> {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        data.email,
        data.password,
      );

      return {
        user: {
          email: userCredential.user.email!,
        },
      };
    } catch (error) {
      return manageFirebaseError(error);
    }
  }

  async signout(): Promise<void | Error> {
    try {
      await auth().signOut();
      return;
    } catch (error) {
      return manageFirebaseError(error);
    }
  }

  async getCurrentUser(): Promise<{ email: string } | Error> {
    try {
      const user = auth().currentUser;
      if (!user) {
        return new Error('No hay usuario autenticado');
      }
      return { email: user.email! };
    } catch (error) {
      return manageFirebaseError(error);
    }
  }
}

function createFirebaseAuthService(): AuthRepository {
  return new FirebaseAuthService();
}

export default createFirebaseAuthService();
