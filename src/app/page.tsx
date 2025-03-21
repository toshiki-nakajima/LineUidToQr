'use client';

import { useEffect, useState } from 'react';
import LiffLogin from '@/components/LiffLogin';
import LiffUser from '@/components/LiffUser';
import * as liffConfig from './utils/liffConfig';
import AddFriend from "@/components/AddFriend";

const DONT_KNOW_FRIEND = 'dontKnowFriend';
const IS_FRIEND = 'isFriend';
const IS_NOT_FRIEND = 'isNotFriend';
export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [isLiffLoaded, setIsLiffLoaded] = useState(false);
  const [isFriend, setIsFriend] = useState(DONT_KNOW_FRIEND);
  const [error, setError] = useState('');

  useEffect(() => {
    // LIFF SDKを読み込む
    const loadLiffSDK = async () => {
      try {
        const liffInitialized = await liffConfig.initializeLiff();
        if (liffInitialized) {
          setIsLiffLoaded(true);

          // 既にログインしている場合
          if (liffConfig.checkLogin()) {
            const isFriend = await liffConfig.checkIsFriend();
            if (!isFriend) {
              setIsFriend(IS_NOT_FRIEND);
              return;
            }
            setIsFriend(IS_FRIEND)
            setIsLoggedIn(true);
            await getUserProfile();
          }
        }
      } catch (error) {
        console.error('LIFF SDKの読み込みに失敗しました', error);
        setError('LIFF SDKの読み込みに失敗しました。ページを再読み込みしてください。');
      }
    };

    loadLiffSDK();
  }, []);

  const getUserProfile = async () => {
    try {
      const profile = await liffConfig.getUserProfile();
      setUserId(profile.userId);
    } catch (error) {
      console.error('プロフィール取得エラー', error);
      setError('ユーザー情報の取得に失敗しました。');
    }
  };

  const handleLogin = async () => {
    liffConfig.login();
    // setIsLoggedIn(true);
  };

  const handleLogout = () => {
    if (confirm('ログアウトしますか？')) {
      liffConfig.logout();
      setIsFriend(DONT_KNOW_FRIEND);
      setIsLoggedIn(false);
      setUserId('');
    }
  };

  const saveQRCode = () => {
    const svg = document.getElementById('qr-code');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL('image/png');

        const downloadLink = document.createElement('a');
        downloadLink.download = 'line-uid-qr.png';
        downloadLink.href = pngFile;
        downloadLink.click();
      };

      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main>
      <h1>LINE UID QRコード</h1>

      {!isLoggedIn
          ? (<LiffLogin onLogin={handleLogin} isLoaded={isLiffLoaded} />)
          : isFriend === DONT_KNOW_FRIEND
              ? (<div>友達追加状態を取得中...</div>)
              : isFriend === IS_NOT_FRIEND
                  ? (<AddFriend/>)
                  : (<LiffUser
                      userId={userId}
                      onLogout={handleLogout}
                      onSaveQR={saveQRCode}
                  />)
      }
    </main>
  );
}
