import React from 'react';
import { styles } from '../styles/theme';

interface LayoutProps {
  children: React.ReactNode;
  isLoggedIn?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, isLoggedIn }) => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Google Sheets 快速部署器</h1>
        <p>此工具將自動為您建立包含自訂 Apps Script 邏輯的試算表</p>
        {isLoggedIn && <p style={{fontSize: '0.8rem', color: 'green'}}>✓ 已登入 Google 帳號</p>}
      </header>

      <main style={styles.main}>
        {children}
      </main>
    </div>
  );
};
