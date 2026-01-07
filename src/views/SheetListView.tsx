import React, { useEffect } from 'react';
import { styles } from '../styles/theme';
import type { DriveFile } from '../types';
import { AuthWarning } from '../components/AuthWarning';
import { openAuthPopup } from '../utils';

interface SheetListViewProps {
  files: DriveFile[];
  loading: boolean;
  onBack: () => void;
  onFetch: () => void;
  onTestConnection: (file: DriveFile) => void;
  testData: string;
  authUrl: string;
  onCloseTestResult: () => void;
}

export const SheetListView: React.FC<SheetListViewProps> = ({ 
  files, 
  loading, 
  onBack, 
  onFetch,
  onTestConnection,
  testData,
  authUrl,
  onCloseTestResult
}) => {
  
  useEffect(() => {
    onFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{width: '100%'}}>
      <div style={styles.headerRow}>
        <h3>現有表格 (vcqs-*)</h3>
        <button onClick={onBack} style={styles.secondaryButton}>返回</button>
      </div>

      {testData && (
        <div style={{...styles.card, marginBottom: '20px', backgroundColor: '#f8f9fa', borderColor: '#4285f4'}}>
          <h4>測試連線回傳資料</h4>
          <pre style={{textAlign: 'left', overflow: 'auto', maxHeight: '200px', fontSize: '0.85rem', backgroundColor: '#eee', padding: '10px', borderRadius: '4px'}}>
            {testData}
          </pre>
          <button onClick={onCloseTestResult} style={{...styles.secondaryButton, marginTop: '10px'}}>關閉結果</button>
        </div>
      )}

      {authUrl && (
        <AuthWarning authUrl={authUrl} onOpenAuth={openAuthPopup} />
      )}

      {loading && !testData ? <p style={{textAlign: 'center'}}>處理中...</p> : (
        <ul style={styles.list}>
          {files.length === 0 ? <p style={{textAlign: 'center', color: '#666'}}>沒有找到相關表格</p> : files.map(file => (
            <li key={file.id} style={styles.listItem}>
              <span style={{fontWeight: 500}}>{file.name}</span>
              <a href={file.webViewLink} target="_blank" rel="noopener noreferrer" style={styles.linkButton}>
                開啟
              </a>
              <button onClick={() => onTestConnection(file)} style={styles.linkButton}>
                測試連線
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
