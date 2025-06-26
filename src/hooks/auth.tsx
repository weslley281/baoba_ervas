// hooks/useAuth.ts
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import * as WebBrowser from 'expo-web-browser';
import {
  useAuthRequest,
  makeRedirectUri,
  exchangeCodeAsync,
  TokenResponse,
} from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthContextData {
  user: User | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext({} as AuthContextData);
const USER_STORAGE_KEY = '@baobaervas:user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '778843493797-en06e73ab4k4jgoh8f5kjbuous23ab17.apps.googleusercontent.com',
    redirectUri: makeRedirectUri({
      native: 'com.baoba_ervas:/oauthredirect', // ajuste se usar build nativo
    }),
    scopes: ['profile', 'email'],
  });

  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.accessToken) {
      fetchUserInfo(response.authentication.accessToken);
    }
  }, [response]);

  async function fetchUserInfo(token: string) {
    try {
      const res = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`
      );
      const userInfo = await res.json();

      const userLogged: User = {
        id: userInfo.id,
        name: userInfo.given_name,
        email: userInfo.email,
        photo:
          userInfo.picture ??
          `https://ui-avatars.com/api/?name=${userInfo.given_name}&length=1`,
      };

      setUser(userLogged);
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userLogged));
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    }
  }

  async function signInWithGoogle() {
    await promptAsync();
  }

  async function signOut() {
    setUser(null);
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
  }

  useEffect(() => {
    async function loadStorageUser() {
      const storaged = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (storaged) {
        setUser(JSON.parse(storaged));
      }
      setLoading(false);
    }
    loadStorageUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signInWithGoogle, signOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
