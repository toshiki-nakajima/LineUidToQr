import React from 'react';

interface LiffLoginProps {
  onLogin: () => void;
  isLoaded: boolean;
}

const LiffLogin: React.FC<LiffLoginProps> = ({ onLogin, isLoaded }) => {
  return (
    <div>
      <p>LINEにログインしてUIDを取得し、QRコードを生成します。</p>
        <div className="login-container">
            <button
                onClick={onLogin}
                disabled={!isLoaded}
                className="login-button"
            >
                <img src="/line_44.png" alt="LINEでログイン"/>
                <div className="vertical-line"></div>
                <span className="login-message">LINEでログイン</span>
            </button>
        </div>
    </div>
  );
};

export default LiffLogin;
