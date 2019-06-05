import { Table, Checkbox } from "semantic-ui-react";
import './CheckTable.scss';

/** 
 * <CheckTableHOC
 *  dark_mode={Bool}
 *  name={String}         => value name
 *  indeies={Object}      => current index value
 *  datas={Object}        => display data
 *  displays={[           => display setting
 *    {name: String, key: String},...
 *  ]}
 *  onChange={Function}   => when value change
 * />
*/


function CheckTableHOC(props) {
  const handleClick = (index) => {
    props.handleChange({}, { name: props.name, value: index });
  }

  return (
    <Table size='large' celled striped inverted={props.dark_mode}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Select</Table.HeaderCell>
          {props.displays.map((display, index) => (
            <Table.HeaderCell key={index}>{display.name}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.datas.map((data, index) => (
          <Table.Row key={index} onClick={() => handleClick(index.toString())}>
            <Table.Cell collapsing textAlign='center'>
              <Checkbox
                radio fitted
                checked={props.indeies[props.name] === index.toString()}
              />
            </Table.Cell>
            {props.displays.map((display, index) => (
              <Table.Cell key={index}>{data[display.key]}</Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default CheckTableHOC;
