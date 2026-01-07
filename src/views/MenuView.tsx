import React from 'react';
import { Card, Flex, Button, Heading, Grid } from '@radix-ui/themes';
import { PlusIcon, FileTextIcon } from '@radix-ui/react-icons';

interface MenuViewProps {
  onChangeView: (view: 'create' | 'list') => void;
}

export const MenuView: React.FC<MenuViewProps> = ({ onChangeView }) => {
  return (
    <Card size="3">
      <Flex direction="column" gap="4" align="center" py="4">
        <Heading size="4">您想要做什麼？</Heading>
        
        <Grid columns="2" gap="4" width="100%">
          <Button 
            onClick={() => onChangeView('create')} 
            size="4" 
            variant="surface"
            style={{ height: '100px', flexDirection: 'column', gap: '8px', cursor: 'pointer' }}
          >
            <PlusIcon width="24" height="24" />
            新增表格
          </Button>
          
          <Button 
            onClick={() => onChangeView('list')} 
            size="4" 
            variant="surface"
            color="green"
            style={{ height: '100px', flexDirection: 'column', gap: '8px', cursor: 'pointer' }}
          >
            <FileTextIcon width="24" height="24" />
            檢視現有表格
          </Button>
        </Grid>
      </Flex>
    </Card>
  );
};
