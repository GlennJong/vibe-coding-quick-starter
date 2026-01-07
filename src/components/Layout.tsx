import React from 'react';
import { Container, Flex, Heading, Text, Separator, Box, Badge } from '@radix-ui/themes';
import { CheckCircledIcon } from '@radix-ui/react-icons';

interface LayoutProps {
  children: React.ReactNode;
  isLoggedIn?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, isLoggedIn }) => {
  return (
    <Container size="2" p="4">
      <Flex direction="column" gap="4" align="center" mb="6">
        <Heading size="8" align="center" style={{ background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
          Vibe Sheets
        </Heading>
        <Text size="3" color="gray" align="center">
          無伺服器資料庫解決方案：Google Sheets + Apps Script
        </Text>
        
        <Box maxWidth="400px" style={{ textAlign: 'center' }}>
            <Text as="p" size="1" color="gray">
            快速產生具備 JSON API 的試算表，讓前端能夠直接讀取資料。
            </Text>
        </Box>

        {isLoggedIn && (
          <Badge color="green" variant="soft" size="2">
            <Flex align="center" gap="2">
              <CheckCircledIcon />
              已登入 Google 帳號
            </Flex>
          </Badge>
        )}
      </Flex>
      
      <Separator size="4" mb="6" />

      <Flex direction="column" width="100%" gap="4">
        {children}
      </Flex>
    </Container>
  );
};
