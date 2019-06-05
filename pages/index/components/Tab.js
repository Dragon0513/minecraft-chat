import { useState } from 'react';
import useIsLogin from '../hooks/useIsLogin';

import { Header, Tab } from "semantic-ui-react";
import './Tab.scss';

/** 
 * <TabHOC
 *  inverted={Bool}
 *  socket={socket}
 *  defaultActiveIndex={Int}
 *  panes={Object}
 * />
*/

function TabHOC(props) {
  const { panes, tabIndices } = generatePanes(props);

  const [activeIndex, setactiveIndex] = useState(props.defaultActiveIndex + 1);
  const handleTabChange = (event, data) => {
    if (tabIndices[data.activeIndex] == true) {
      setactiveIndex(data.activeIndex);
    }
  }

  useIsLogin(props.socket, () => { setactiveIndex(1); }, () => { setactiveIndex(1); })
  return (
    <Tab
      id="mcc-tab-container" renderActiveOnly={false}
      activeIndex={activeIndex} onTabChange={handleTabChange}
      grid={{ className: "mcc-tab-grid", paneWidth: 12, tabWidth: 4 }}
      menu={{ fluid: true, pointing: true, vertical: true, inverted: props.inverted }}
      menuPosition='left'
      panes={panes}
    />
  )
}

function generatePanes(props) {
  // set Header
  let tabIndices = [true];
  let panes = [{
    menuItem: {
      key: 'header', content: 'MinecraftChat',
      as: Header, header: true, size: 'huge'
    }
  }];

  // set menu
  props.panes.forEach(({ type, menuItem, paneTab }, index) => {
    let pane = {
      menuItem: { key: index, ...menuItem }
    };

    let isTab = true;
    if (type === 'tab') {
      pane.pane = {
        key: index, content: paneTab,
        className: 'mcc-tab-pane', inverted: props.inverted
      };
    } else if (type === 'header') { // if this is menu subheader
      pane.menuItem = { ...pane.menuItem, as: Header, header: true };
      isTab = false;
    } else if (type === 'button') { // if this is menu subheader
      pane.menuItem = { ...pane.menuItem };
      isTab = false;
    }

    tabIndices.push(isTab)
    panes.push(pane);
  });

  return { panes, tabIndices };
}

export default TabHOC;
