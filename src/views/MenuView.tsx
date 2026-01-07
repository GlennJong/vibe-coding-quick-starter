import React from 'react';
import { styles } from '../styles/theme';

interface MenuViewProps {
  onChangeView: (view: 'create' | 'list') => void;
}

export const MenuView: React.FC<MenuViewProps> = ({ onChangeView }) => {
  return (
    <div style={styles.card}>
      <h3>您想要做什麼？</h3>
      <div style={styles.menuButtonGroup}>
        <button onClick={() => onChangeView('create')} style={styles.menuButton}>
          ➕ 新增表格
        </button>
        <button onClick={() => onChangeView('list')} style={{...styles.menuButton, backgroundColor: '#34a853'}}>
          📂 檢視現有表格
        </button>
      </div>
    </div>
  );
};
