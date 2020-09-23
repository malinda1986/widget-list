import React, { useState, useEffect } from "react";
import { Card, Button, Statistic } from "semantic-ui-react";

import Widget from "../../common/widget";
import ModalView from "../../common/modal";
import { setStorage, getStorage } from "../../utils";

interface IWidget {
  id: number;
  name: string;
  language: string;
}

const HomeLayout: React.FC<any> = () => {
  const [widgets, setWidgets] = useState<IWidget[]>([]);
  const [showModal, setModal] = useState<boolean>(false);

  const onOpenModal = () => {
    setModal(true);
  };
  const onCloseWidget = () => {
    setModal(false);
  };

  const handleDelete = (id: number) => {
    console.log(id);
    const updatedWidgets = widgets.filter((x) => x.id !== id);
    setStorage(updatedWidgets);
    setWidgets(updatedWidgets);
  };
  const onAddWidget = (widget: IWidget) => {
    const latestWidgets = [...widgets, ...[widget]];
    setWidgets(latestWidgets);
    setStorage(latestWidgets);
    onCloseWidget();
  };

  useEffect(() => {
    const widgets = getStorage();
    console.log(widgets)
    setWidgets(widgets);
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <Statistic horizontal>
        <Statistic.Value>{widgets.length}</Statistic.Value>
        <Statistic.Label>Widgets</Statistic.Label>
      </Statistic>
      <br />
      <Button id='btn-add-widget' color="green" onClick={() => onOpenModal()}>
        Add Widget
      </Button>
      <br />
      <br />
      <Card.Group >
        {widgets.map((widget) => (
          <Widget {...widget} onDelete={handleDelete} />
        ))}
      </Card.Group>
      <ModalView open={showModal} onAdd={onAddWidget} onClose={onCloseWidget} />
    </div>
  );
};

export default HomeLayout;
