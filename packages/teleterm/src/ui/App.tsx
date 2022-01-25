import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from 'styled-components';
import CatchError from './components/CatchError';
import ModalsHost from './ModalsHost';
import AppContextProvider from './appContextProvider';
import AppContext from './appContext';
import ThemeProvider, { ThemeProviderTemp } from './ThemeProvider';
import { LayoutManager } from './LayoutManager';

const App: React.FC<{ ctx: AppContext }> = ({ ctx }) => {
  return (
    <StyledApp>
      <CatchError>
        <DndProvider backend={HTML5Backend}>
          <AppContextProvider value={ctx}>
            <ThemeProvider>
              <LayoutManager />
              <ThemeProviderTemp>
                <ModalsHost />
              </ThemeProviderTemp>
            </ThemeProvider>
          </AppContextProvider>
        </DndProvider>
      </CatchError>
    </StyledApp>
  );
};

export default App;

const StyledApp = styled.div`
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
  display: flex;
  flex-direction: column;
`;
