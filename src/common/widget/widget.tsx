import React, { useState } from "react";
import { Card, Button, Confirm } from "semantic-ui-react";
import { random } from "../../utils";
interface Props {
  id: number;
  name: string;
  language: string;
  onDelete: Function;
}

const colors = [
  "red",
  "orange",
  "yellow",
  "olive",
  "green",
  "teal",
  "blue",
  "violet",
  "purple",
  "pink",
  "brown",
  "grey",
  "black",
];

const Widget: React.FC<Props> = ({ id, name, language, onDelete }: Props) => {
  const [showConfirm, setConfirm] = useState<boolean>(false);
  const getColor = (): any => {
    const index = random(1, 10);
    return colors[index];
  };
  const handleDelete = (id: number) => {
    setConfirm(true);
  };

  const onClose = () => {
    setConfirm(false);
  };

  const onConfirm = () => {
    onDelete(id);
    setConfirm(false);
  };
  return (
    <Card key={id} color={getColor()}>
      <Card.Content>
        <Card.Header>Name: {name}</Card.Header>
        <Card.Meta>
          {language} <br /> Id: {id}
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button
            basic
            color="red"
            onClick={() => {
              handleDelete(id);
            }}
          >
            Delete
          </Button>
        </div>
      </Card.Content>

      {showConfirm && (
        <Confirm
          open={showConfirm}
          content="Are you sure, You want to delete this widget?"
          onCancel={onClose}
          onConfirm={onConfirm}
        />
      )}
    </Card>
  );
};

export default Widget;
