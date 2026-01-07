import React, { useEffect } from 'react';
import { Card, Flex, Button, Heading, Text, ScrollArea, Box, Code, Badge } from '@radix-ui/themes';
import { ExternalLinkIcon, ReloadIcon, ArrowLeftIcon, LightningBoltIcon, Cross2Icon } from '@radix-ui/react-icons';
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
    <Flex direction="column" gap="4" width="100%">
      <Flex justify="between" align="center">
        <Heading size="4">您的表格 (vcqs-*)</Heading>
        <Button size="2" variant="ghost" onClick={onBack} style={{ cursor: 'pointer' }}>
            <ArrowLeftIcon /> 返回
        </Button>
      </Flex>
      
      {testData && (
        <Card size="2" style={{ backgroundColor: 'var(--gray-2)' }}>
          <Flex justify="between" align="center" mb="2">
            <Text weight="bold" size="2">測試連線回傳資料</Text>
            <Button size="1" variant="ghost" onClick={onCloseTestResult} style={{ cursor: 'pointer' }}>
                <Cross2Icon /> 關閉
            </Button>
          </Flex>
          <ScrollArea type="auto" scrollbars="vertical" style={{ maxHeight: 200 }}>
            <Box p="2" style={{ backgroundColor: 'var(--gray-3)', borderRadius: 'var(--radius-2)' }}>
                <Code variant="ghost" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                    {testData}
                </Code>
            </Box>
          </ScrollArea>
        </Card>
      )}

      {authUrl && (
        <AuthWarning authUrl={authUrl} onOpenAuth={openAuthPopup} />
      )}

      {loading && !testData ? (
        <Flex justify="center" p="4">
            <Text>載入中...</Text>
        </Flex>
      ) : (
        <Flex direction="column" gap="3">
          {files.length === 0 ? (
            <Text align="center" color="gray">沒有找到相關表格</Text>
          ) : (
            files.map(file => (
              <Card key={file.id} size="2">
                <Flex justify="between" align="center">
                  <Flex direction="column" gap="1">
                    <Text weight="bold">{file.name}</Text>
                    <Text size="1" color="gray">ID: {file.id.substring(0, 10)}...</Text>
                  </Flex>
                  
                  <Flex gap="2">
                    <Button 
                        size="2" 
                        variant="soft" 
                        onClick={() => onTestConnection(file)}
                        style={{ cursor: 'pointer' }}
                    >
                        <LightningBoltIcon /> 測試
                    </Button>
                    <Button 
                        size="2" 
                        variant="outline" 
                        asChild
                        style={{ cursor: 'pointer' }}
                    >
                        <a href={file.webViewLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLinkIcon /> 開啟
                        </a>
                    </Button>
                  </Flex>
                </Flex>
              </Card>
            ))
          )}
        </Flex>
      )}
    </Flex>
  );
};
