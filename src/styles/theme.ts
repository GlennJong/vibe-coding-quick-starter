import React from 'react';

export const styles: { [key: string]: React.CSSProperties } = {
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
