import React from 'react';

interface LiffLoginProps {
  onLogin: () => void;
  isLoaded: boolean;
}

const LiffLogin: React.FC<LiffLoginProps> = ({ onLogin, isLoaded }) => {
  return (
    <div>
      <p>LINEにログインしてUIDを取得し、QRコードを生成します。</p>
      <button 
        onClick={onLogin} 
        disabled={!isLoaded}
      >
        LINEでログイン
      </button>
    </div>
  );
};

export default LiffLogin;
