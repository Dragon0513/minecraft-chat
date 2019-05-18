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
      id="mcc-tab-container"
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
  props.panes.forEach(({ menuItem, render }, index) => {
    let _menuItem = { key: index, ...menuItem };
    let _render = () => { };

    let isHeader = false;
    if (render != undefined && typeof render == 'function') {
      _render = () => (
        <Tab.Pane className="mcc-tab-pane" inverted={props.inverted} >
          {render()}
        </Tab.Pane>
      );
    } else { // if this is menu subheader
      _menuItem = { ..._menuItem, as: Header, header: true };
      isHeader = true;
    }

    headerIndices.push(isHeader)
    panes.push({ menuItem: _menuItem, render: _render });
  });

  return { panes, headerIndices };
}

export default TabHOC;
