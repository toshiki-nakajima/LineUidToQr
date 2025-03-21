import React from 'react';

const accountName = process.env.NEXT_PUBLIC_ACCOUNT_NAME || '';
const add_friend_url = `https://line.me/R/ti/p/${encodeURIComponent(accountName)}`;

const handleAddFriend = () => {
    location.href = add_friend_url;
}

const LiffLogin: React.FC = () => {
  return (
    <div>
      <p>友だち追加して下さい</p>
        <div className="add-friend-container">
            <button
                className="add-friend-button"
                onClick={handleAddFriend}
            >
                <img src="/line_44.png" alt="友だち追加"/>
                <div className="vertical-line"></div>
                <span className="add-friend-message">友だち追加</span>
            </button>
        </div>
    </div>
  );
};

export default LiffLogin;
