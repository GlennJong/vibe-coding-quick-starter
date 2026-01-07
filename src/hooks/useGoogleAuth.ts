import { useState, useEffect, useCallback } from 'react';

declare global {
  interface Window {
    google: any;
  }
}

const CLIENT_ID = import.meta.env['VITE_GOOGLE_CLIENT_ID'];
const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/script.projects',
  'https://www.googleapis.com/auth/script.deployments',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.metadata.readonly'
].join(' ');

export const useGoogleAuth = () => {
  const [tokenClient, setTokenClient] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');


  const handleTokenResponse = useCallback((response: any) => {
    if (response.error) {
      setError(`授權失敗: ${response.error}`);
      setLoading(false);
      return;
    }
    setAccessToken(response.access_token);
    setError('');
    setLoading(false);
  }, []);

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
  }, [handleTokenResponse]);

  const login = () => {
    if (!tokenClient) {
      setError('Google SDK 尚未載入完成');
      return;
    }
    setLoading(true);
    tokenClient.requestAccessToken({ prompt: 'consent' });
  };

  return { accessToken, login, loading, error };
};
