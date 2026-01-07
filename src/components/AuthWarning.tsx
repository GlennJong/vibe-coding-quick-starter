import React from 'react';
import { styles } from '../styles/theme';

interface AuthWarningProps {
  authUrl: string;
  onOpenAuth: (url: string) => void;
  title?: string;
}

export const AuthWarning: React.FC<AuthWarningProps> = ({ authUrl, onOpenAuth, title }) => {
  return (
    <div style={{margin: '20px 0', padding: '15px', backgroundColor: '#fff3cd', border: '1px solid #ffc107', borderRadius: '8px', textAlign: 'left'}}>
      <strong style={{display: 'block', marginBottom: '10px', color: '#856404'}}>
        {title || '⚠️ 需要授權'}
      </strong>
      <p style={{fontSize: '0.9rem', color: '#856404', margin: '0 0 10px 0'}}>
        由於這是新產生的自動化工具，Google 安全機制要求您必須手動授權一次。
      </p>
      
      <div style={{display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '15px'}}>
        <button
          onClick={() => onOpenAuth(authUrl)}
          style={{...styles.button, backgroundColor: '#4285f4', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', width: '100%', justifyContent: 'center'}}
        >
          <span style={{fontSize: '1.2rem'}}>🔑</span> 點此開啟授權彈窗
        </button>
      </div>

      <ul style={{fontSize: '0.85rem', color: '#666', marginTop: '10px', paddingLeft: '20px'}}>
        <li>彈窗開啟後，請登入您的帳號。</li>
        <li>請點擊 <b>Review Permissions</b> 並選擇您的帳號。</li>
        <li>若出現「Google hasn't verified this app」，請點擊 <b>Advanced (進階)</b> &gt; <b>Go to ... (unsafe)</b>。</li>
        <li>授權後若看到 JSON 資料即代表成功，請關閉該視窗。</li>
      </ul>
    </div>
  );
};
