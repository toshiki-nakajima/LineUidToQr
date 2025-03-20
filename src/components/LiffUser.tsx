import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface LiffUserProps {
  userId: string;
  onLogout: () => void;
  onSaveQR: () => void;
}

const LiffUser: React.FC<LiffUserProps> = ({ userId, onLogout, onSaveQR }) => {
  return (
    <div>
      <p>あなたのLINE UID:</p>
      <div className="uid-display">{userId}</div>
      
      <div className="qr-container">
        <QRCodeSVG 
          id="qr-code"
          value={userId} 
          size={250}
          level="H"
        />
      </div>
      
      <div className="button-container">
        <button onClick={onSaveQR}>QRコードを保存</button>
        <button onClick={onLogout} className="logout-button">ログアウト</button>
      </div>
    </div>
  );
};

export default LiffUser;
