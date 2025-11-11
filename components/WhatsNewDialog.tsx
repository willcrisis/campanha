import { useWhatsNew } from '@/contexts/WhatsNewContext';
import { useI18n } from '@/contexts/I18nContext';
import { Button, Dialog, Portal, Checkbox } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import InputLabel from './inputs/InputLabel';
import { useState } from 'react';

type WhatsNewContent = {
  [version: string]: {
    title: string;
    items: string[];
  };
};

const WhatsNewDialog = () => {
  const { showDialog, dontShowUpdates, currentVersion, dismissDialog, toggleDontShowUpdates } = useWhatsNew();
  const { locale } = useI18n();
  const [localDontShow, setLocalDontShow] = useState(dontShowUpdates);

  // Load content based on locale
  let whatsNewContent: WhatsNewContent = {};
  try {
    if (locale.startsWith('en')) {
      whatsNewContent = require('@/assets/translations/whats-new.en-us.json');
    } else {
      whatsNewContent = require('@/assets/translations/whats-new.pt-br.json');
    }
  } catch (error) {
    console.error('Failed to load whats new content:', error);
  }

  const content = whatsNewContent[currentVersion];

  // Don't render if no content for this version
  if (!content) {
    return null;
  }

  const handleDismiss = () => {
    if (localDontShow !== dontShowUpdates) {
      toggleDontShowUpdates();
    }
    dismissDialog();
  };

  return (
    <Portal>
      <Dialog visible={showDialog} onDismiss={handleDismiss}>
        <Dialog.Title>
          <InputLabel size="lg" bold style={{ textAlign: 'center' }}>
            {content.title}
          </InputLabel>
        </Dialog.Title>
        <Dialog.ScrollArea style={{ maxHeight: 400 }}>
          <ScrollView>
            <View style={{ paddingHorizontal: 24, paddingVertical: 8 }}>
              {content.items.map((item, index) => (
                <View key={index} style={{ flexDirection: 'row', marginBottom: 12 }}>
                  <InputLabel style={{ marginRight: 8 }}>•</InputLabel>
                  <InputLabel style={{ flex: 1 }}>{item}</InputLabel>
                </View>
              ))}
            </View>
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions style={{ flexDirection: 'column', alignItems: 'stretch' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 8,
              marginBottom: 8,
            }}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: '#666666',
                borderRadius: 50,
                marginRight: 8,
              }}
            >
              <Checkbox
                status={localDontShow ? 'checked' : 'unchecked'}
                onPress={() => setLocalDontShow(!localDontShow)}
                color="#ffffff"
                uncheckedColor="#666666"
              />
            </View>
            <InputLabel size="sm" onPress={() => setLocalDontShow(!localDontShow)}>
              {locale.startsWith('en') ? "Don't show me updates" : 'Não mostrar atualizações'}
            </InputLabel>
          </View>
          <Button mode="outlined" onPress={handleDismiss}>
            {locale.startsWith('en') ? 'Got it' : 'Entendi'}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default WhatsNewDialog;
