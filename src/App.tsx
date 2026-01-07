import React, { useState, useEffect, useCallback } from 'react';

declare global {
  interface Window {
    google: any;
  }
}

// 定義後端回傳的資料格式
interface CreationResponse {
  scriptUrl?: string;
  spreadsheetUrl?: string;
  spreadsheetId?: string;
  success?: boolean;
  error?: string;
}

interface DriveFile {
  id: string;
  name: string;
  webViewLink: string;
}

const CLIENT_ID = import.meta.env['VITE_GOOGLE_CLIENT_ID'];
const MASTER_SCRIPT_URL = import.meta.env['VITE_MASTER_SCRIPT_URL'];

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/script.projects',
  'https://www.googleapis.com/auth/script.deployments',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.metadata.readonly'
].join(' ');

const App: React.FC = () => {
  const [tokenClient, setTokenClient] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // 頁面狀態管理
  const [view, setView] = useState<'login' | 'menu' | 'create' | 'list'>('login');
  
  // 建立表格相關
  const [sheetName, setSheetName] = useState<string>('');
  const [creationResult, setCreationResult] = useState<CreationResponse | null>(null);

  // 列表相關
  const [files, setFiles] = useState<DriveFile[]>([]);

  // 初始化 Google SDK
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (tokenResponse: any) => handleTokenResponse(tokenResponse),
      });
      setTokenClient(client);
    };
    document.body.appendChild(script);
  }, []);

  // 進入列表模式時自動抓取資料
  useEffect(() => {
    if (view === 'list' && accessToken) {
      fetchFiles();
    }
  }, [view, accessToken]);

  // 處理 Token 回傳
  const handleTokenResponse = useCallback((response: any) => {
    if (response.error) {
      setError(`授權失敗: ${response.error}`);
      return;
    }
    setAccessToken(response.access_token);
    setError('');
    setView('menu');
  }, []);

  const handleStartProcess = () => {
    if (!tokenClient) {
      setError('Google SDK 尚未載入完成');
      return;
    }
    // 請求 Token
    tokenClient.requestAccessToken({ prompt: 'consent' });
  };

  // 建立新表格
  const createSheet = async () => {
    if (!sheetName.trim()) {
      setError('請輸入表格名稱');
      return;
    }
    setLoading(true);
    setError('');
    
    try {
      const fullName = `vcqs-${sheetName}`;
      const targetUrl = `${MASTER_SCRIPT_URL}?token=${accessToken}&name=${encodeURIComponent(fullName)}`;
      
      const res = await fetch(targetUrl);
      if (!res.ok) throw new Error('網路請求失敗');
      
      const data: CreationResponse = await res.json();
      if (data.error) throw new Error(data.error);

      setCreationResult(data);
    } catch (err: any) {
      setError(err.message || '建立資源時發生未知錯誤');
    } finally {
      setLoading(false);
    }
  };

  // 取得檔案列表
  const fetchFiles = async () => {
    setLoading(true);
    setError('');
    try {
      const query = "name contains 'vcqs-' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false";
      const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id, name, webViewLink)`;
      
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error('Drive API Error:', errorData);
        throw new Error(errorData.error?.message || `請求失敗 (${res.status}): 請確認 Google Drive API 已啟用`);
      }
      
      const data = await res.json();
      setFiles(data.files || []);
    } catch (err: any) {
      setError(err.message || '取得列表失敗');
    } finally {
      setLoading(false);
    }
  };

  // 登入畫面
  const renderLogin = () => (
    <div style={styles.card}>
      <button 
        onClick={handleStartProcess} 
        disabled={loading}
        style={{...styles.button, backgroundColor: loading ? '#ccc' : '#4285f4'}}
      >
        {loading ? '正在處理中...' : '授權並登入'}
      </button>
      {loading && <p style={styles.loadingText}>這可能需要幾秒鐘...</p>}
    </div>
  );

  // 選單畫面
  const renderMenu = () => (
    <div style={styles.card}>
      <h3>您想要做什麼？</h3>
      <div style={styles.menuButtonGroup}>
        <button onClick={() => setView('create')} style={styles.menuButton}>
          ➕ 新增表格
        </button>
        <button onClick={() => setView('list')} style={{...styles.menuButton, backgroundColor: '#34a853'}}>
          📂 檢視現有表格
        </button>
      </div>
    </div>
  );

  // 建立畫面
  const renderCreate = () => {
    if (creationResult) {
      return (
        <div style={styles.successCard}>
          <h3>🎉 部署完成！</h3>
          <p>您的表格已建立：</p>
          <a href={creationResult.spreadsheetUrl} target="_blank" rel="noopener noreferrer" style={styles.link}>
            開啟 Google 試算表
          </a>
          <div style={{ marginTop: '20px' }}>
            <button onClick={() => { setCreationResult(null); setView('menu'); }} style={styles.secondaryButton}>
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
          <button onClick={createSheet} disabled={loading} style={styles.button}>
            {loading ? '建立中...' : '建立'}
          </button>
          <button onClick={() => setView('menu')} style={styles.secondaryButton}>取消</button>
        </div>
      </div>
    );
  };

  // 列表畫面
  const renderList = () => (
    <div style={{width: '100%'}}>
      <div style={styles.headerRow}>
        <h3>現有表格 (vcqs-*)</h3>
        <button onClick={() => setView('menu')} style={styles.secondaryButton}>返回</button>
      </div>
      {loading ? <p style={{textAlign: 'center'}}>載入中...</p> : (
        <ul style={styles.list}>
          {files.length === 0 ? <p style={{textAlign: 'center', color: '#666'}}>沒有找到相關表格</p> : files.map(file => (
            <li key={file.id} style={styles.listItem}>
              <span style={{fontWeight: 500}}>{file.name}</span>
              <a href={file.webViewLink} target="_blank" rel="noopener noreferrer" style={styles.linkButton}>
                開啟
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Google Sheets 快速部署器</h1>
        <p>此工具將自動為您建立包含自訂 Apps Script 邏輯的試算表</p>
        {accessToken && <p style={{fontSize: '0.8rem', color: 'green'}}>✓ 已登入 Google 帳號</p>}
      </header>

      <main style={styles.main}>
        {view === 'login' && renderLogin()}
        {view === 'menu' && renderMenu()}
        {view === 'create' && renderCreate()}
        {view === 'list' && renderList()}

        {error && <div style={styles.errorBox}>❌ {error}</div>}
      </main>
    </div>
  );
};

// 簡單的 CSS-in-JS 樣式
const styles: { [key: string]: React.CSSProperties } = {
  container: { maxWidth: '600px', margin: '0 auto', padding: '40px 20px', fontFamily: 'system-ui' },
  header: { textAlign: 'center', marginBottom: '40px' },
  main: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  card: { textAlign: 'center', padding: '30px', border: '1px dashed #ccc', borderRadius: '12px', width: '100%', backgroundColor: '#fff' },
  successCard: { padding: '30px', backgroundColor: '#eaffea', border: '1px solid #2ecc71', borderRadius: '12px', width: '100%', textAlign: 'center' },
  button: { padding: '12px 24px', fontSize: '1rem', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: '0.3s' },
  secondaryButton: { padding: '8px 16px', background: 'none', border: '1px solid #999', cursor: 'pointer', borderRadius: '4px', color: '#555' },
  link: { color: '#4285f4', fontWeight: 'bold', wordBreak: 'break-all' },
  errorBox: { marginTop: '20px', color: '#d32f2f', padding: '10px', backgroundColor: '#ffebee', borderRadius: '4px', width: '100%' },
  loadingText: { marginTop: '15px', color: '#666', fontSize: '0.9rem' },
  
  // 新增樣式
  menuButtonGroup: { display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '20px', flexWrap: 'wrap' },
  menuButton: { padding: '15px 25px', fontSize: '1rem', backgroundColor: '#4285f4', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', minWidth: '120px' },
  inputGroup: { display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 0', gap: '10px' },
  prefix: { fontSize: '1.2rem', fontWeight: 'bold', color: '#555' },
  input: { padding: '10px', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc', outline: 'none', width: '200px' },
  buttonGroup: { display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '10px' },
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '20px' },
  list: { listStyle: 'none', padding: 0, width: '100%', border: '1px solid #eee', borderRadius: '8px' },
  listItem: { display: 'flex', justifyContent: 'space-between', padding: '15px', borderBottom: '1px solid #eee', alignItems: 'center', backgroundColor: '#fff' },
  linkButton: { padding: '6px 12px', backgroundColor: '#e8f0fe', color: '#1967d2', borderRadius: '4px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }
};

export default App;