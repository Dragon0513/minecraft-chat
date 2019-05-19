import { useState, useEffect } from 'react';

import { Header, Tab } from "semantic-ui-react";
import './Tab.scss';

function TabHOC(props) {
  const { panes, headerIndices } = generatePanes(props);

  const [activeIndex, setactiveIndex] = useState(props.defaultActiveIndex + 1);
  const handleTabChange = (event, data) => {
    if (headerIndices[data.activeIndex] == false) {
      setactiveIndex(data.activeIndex);
    }
  }

  useEffect(() => {
    if (props.socket) {
      props.socket.on('bot:connect', () => { setactiveIndex(1); });
    }
  }, [props.socket]);

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
  let headerIndices = [true];
  let panes = [{
    menuItem: {
      key: 'header', content: 'MinecraftChat',
      as: Header, header: true, size: 'huge'
    }
  }];

  // set menu
  props.panes.forEach(({ menuItem, paneTab }, index) => {
    let pane = {
      menuItem: { key: index, ...menuItem }
    };

    let isHeader = false;
    if (paneTab != undefined) {
      pane.pane = {
        key: index, content: paneTab,
        className: 'mcc-tab-pane', inverted: props.inverted
      };
    } else { // if this is menu subheader
      pane.menuItem = { ...pane.menuItem, as: Header, header: true };
      isHeader = true;
    }

    headerIndices.push(isHeader)
    panes.push(pane);
  });

  return { panes, headerIndices };
}

export default TabHOC;
