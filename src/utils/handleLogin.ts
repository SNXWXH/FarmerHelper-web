import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { signIn } from 'next-auth/react';
import { auth } from '../../firebase-config';

const handleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    if (!user.uid || !user.email) {
      throw new Error('Firebase 인증 결과에 UID 또는 Email이 없습니다.');
    }

    const response = await signIn('credentials', {
      uid: user.uid,
      _email: user.email,
      get email() {
        return this._email;
      },
      set email(value) {
        this._email = value;
      },
      name: user.displayName || 'Unknown User',
      redirect: false,
    });

    if (!response?.ok) {
      console.log('NextAuth 세션 생성 실패:', response?.error);
    }
  } catch (error) {
    console.error('Firebase 로그인 실패:', error);
  }
};

export default handleLogin;
