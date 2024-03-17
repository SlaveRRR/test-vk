import { FC, useState } from 'react';
import {
  AppRoot,
  SplitLayout,
  SplitCol,
  View,
  Panel,
  PanelHeader,
  Header,
  Group,
  SimpleCell,
  usePlatform,
  Root,
  CellButton,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import BlockOne from './components/BlockOne';

const App: FC = () => {
  const platform = usePlatform();
  const [activeView, setActiveView] = useState('view1');
  
  return (
    <AppRoot>
      <SplitLayout header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}>
        <SplitCol autoSpaced>
          <Root activeView={activeView}>
            <View activePanel="panel1.1" id="view1">
              <Panel id="panel1.1">
                <PanelHeader>View 1</PanelHeader>
                <Group>
                  <BlockOne />
                  <CellButton onClick={() => setActiveView('view2')}>Open View 2</CellButton>
                  <div style={{ height: 600 }} />
                </Group>
              </Panel>
            </View>
            <View activePanel="panel2.1" id="view2">
              <Panel id="panel2.1">
                <PanelHeader>View 2</PanelHeader>
                <Group>
                  <div style={{ height: 200 }} />
                  <CellButton onClick={() => setActiveView('view1')}>Back to View 1</CellButton>
                  <div style={{ height: 600 }} />
                </Group>
              </Panel>
            </View>
          </Root>
          ;
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
};

export default App;
