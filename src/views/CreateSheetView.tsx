import React, { useState } from 'react';
import { styles } from '../styles/theme';
import type { CreationResponse } from '../types';
import { openAuthPopup } from '../utils';

interface CreateSheetViewProps {
  loading: boolean;
  creationResult: CreationResponse | null;
  onCreate: (name: string) => void;
  onBack: () => void;
  resetCreation: () => void;
}

export const CreateSheetView: React.FC<CreateSheetViewProps> = ({ 
  loading, 
  creationResult, 
  onCreate, 
  onBack,
  resetCreation 
}) => {
  const [sheetName, setSheetName] = useState('');

  if (creationResult) {
    return (
      <div style={styles.successCard}>
        <h3>🎉 部署完成！</h3>
        <p>您的表格與連動腳本已建立。</p>
        
        <div style={{margin: '20px 0', padding: '15px', backgroundColor: '#fff3cd', border: '1px solid #ffc107', borderRadius: '8px', textAlign: 'left'}}>
            <strong style={{display: 'block', marginBottom: '10px', color: '#856404'}}>⚠️ 重要：最後一步</strong>
            <p style={{fontSize: '0.9rem', color: '#856404', margin: '0 0 10px 0'}}>
              由於這是新產生的自動化工具，Google 安全機制要求您必須手動授權一次。
            </p>
            <button 
              onClick={() => creationResult.scriptUrl && openAuthPopup(creationResult.scriptUrl)}
              style={{...styles.button, backgroundColor: '#ffc107', color: '#000', display: 'block', width: '100%', cursor: 'pointer', fontWeight: 'bold'}}
            >
              👉 點此開啟授權彈窗
            </button>
            <ul style={{fontSize: '0.85rem', color: '#666', marginTop: '10px', paddingLeft: '20px'}}>
              <li>彈窗開啟後，請登入您的帳號。</li>
              <li>請點擊 <b>Review Permissions</b> 並選擇您的帳號。</li>
              <li>若出現「Google hasn't verified this app」，請點擊 <b>Advanced (進階)</b> &gt; <b>Go to ... (unsafe)</b>。</li>
              <li>授權後若看到 JSON 資料即代表成功，請關閉該視窗。</li>
            </ul>
        </div>

        <p>授權完成後，您即可使用試算表：</p>
        <a href={creationResult.spreadsheetUrl} target="_blank" rel="noopener noreferrer" style={styles.link}>
          開啟 Google 試算表
        </a>
        <div style={{ marginTop: '20px' }}>
          <button onClick={() => { resetCreation(); onBack(); }} style={styles.secondaryButton}>
            返回選單
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.card}>
      <h3>新增表格</h3>
      <div style={styles.inputGroup}>
        <span style={styles.prefix}>vcqs-</span>
        <input 
          type="text" 
          value={sheetName} 
          onChange={(e) => setSheetName(e.target.value)} 
          placeholder="請輸入名稱"
          style={styles.input}
        />
      </div>
      <div style={styles.buttonGroup}>
        <button onClick={() => onCreate(sheetName)} disabled={loading} style={styles.button}>
          {loading ? '建立中...' : '建立'}
        </button>
        <button onClick={onBack} style={styles.secondaryButton}>取消</button>
      </div>
    </div>
  );
};
