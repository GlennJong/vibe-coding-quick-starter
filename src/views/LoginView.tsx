import React from 'react';
import { styles } from '../styles/theme';

interface LoginViewProps {
  onLogin: () => void;
  loading: boolean;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin, loading }) => {
  return (
    <div style={styles.card}>
      <button 
        onClick={onLogin} 
        disabled={loading}
        style={{...styles.button, backgroundColor: loading ? '#ccc' : '#4285f4'}}
      >
        {loading ? '正在處理中...' : '授權並登入'}
      </button>
      {loading && <p style={styles.loadingText}>這可能需要幾秒鐘...</p>}
    </div>
  );
};
