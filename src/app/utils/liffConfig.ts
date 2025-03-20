// LIFFの設定を管理するユーティリティ
import liff from '@line/liff';

export const liffConfig = {
  liffId: process.env.NEXT_PUBLIC_LIFF_ID || '',
};

export const initializeLiff = async (): Promise<boolean> => {
  try {
    await liff.init({
      liffId: liffConfig.liffId,
    });
    console.log('LIFF初期化成功');
    return true;
  } catch (error) {
    console.error('LIFF初期化失敗', error);
    return false;
  }
};

export const checkLogin = (): boolean => {
  return liff.isLoggedIn();
};

export const login = (): void => {
  liff.login();
};

export const logout = (): void => {
  liff.logout();
};

export const getUserProfile = async () => {
  try {
    const profile = await liff.getProfile();
    return profile;
  } catch (error) {
    console.error('プロフィール取得エラー', error);
    throw error;
  }
};