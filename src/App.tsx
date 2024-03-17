import { FC, useState } from 'react';
import {
  AppRoot,
  SplitLayout,
  SplitCol,
  View,
  Panel,
  PanelHeader,
  Group,
  usePlatform,
  Root,
  CellButton,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import BlockOne from './components/BlockOne';
import BlockTwo from './components/BlockTwo';

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
                <PanelHeader>Первая часть</PanelHeader>
                <Group>
                  <BlockOne />
                  <CellButton onClick={() => setActiveView('view2')}>Перейти на вторую страницу</CellButton>
                </Group>
              </Panel>
            </View>
            <View activePanel="panel2.1" id="view2">
              <Panel id="panel2.1">
                <PanelHeader>Вторая часть</PanelHeader>
                <Group>
                  <BlockTwo />
                  <CellButton onClick={() => setActiveView('view1')}>Перейти на первую страницу</CellButton>
                </Group>
              </Panel>
            </View>
          </Root>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
};

export default App;
