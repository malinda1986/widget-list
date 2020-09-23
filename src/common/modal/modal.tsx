import React, { useState } from "react";
import {
  Button,
  Header,
  Icon,
  Modal,
  Menu,
  Tab,
  Input,
  Dropdown,
  Message,
} from "semantic-ui-react";
import LanguageOptions from "../../data/languages";

interface Props {
  open: boolean;
  onAdd: Function;
  onClose: Function;
}

const TABS = {
  language: 0,
  name: 1,
};

const ModalView: React.FC<Props> = ({ open, onAdd, onClose }: Props) => {
  const [activeTab, setActiveTab] = useState(0);
  const [name, setName] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [validation, setValidation] = useState<string[]>([]);

  const handleClose = () => {
    onClose(false)
    setValidation([]);
    setActiveTab(0);
    setLanguage("");
    setName("");
  }

  const handleInputs = () => {
    let messages = [];
    if (!name) {
      messages.push("Name cannot be empty");
    }
    if (!language) {
      messages.push("Language cannot be empty");
    }
    if (messages.length > 0) {
      setValidation(messages);
    } else {
      setValidation([]);
      setActiveTab(0);
      setLanguage("");
      setName("");
      onAdd({
        name,
        language,
        id: Date.now() + Math.floor(Math.random() * 100),
      });
    }
  };
  const setOption = (event: any, { value }: any) => {
    setLanguage(value);
  };

  const handleTab = (currentTab: number, nextTab: number) => {
    let messages = [];
    if (currentTab === TABS.language) {
      if (!language || language === "") {
        messages.push("Language cannot be empty");
        setValidation(messages);
      } else {
        setValidation([])
        setActiveTab(nextTab);
      }
    }
    if (currentTab === TABS.name) {
      if (!name || name === "") {
        messages.push("Name cannot be empty");
        setValidation(messages);
      } else {
        setValidation([])
        setActiveTab(nextTab);
      }
    }
  };

  const panes = [
    {
      menuItem: { key: "language", icon: "language", content: "Language" },
      render: () => (
        <Tab.Pane>
          <Dropdown
          id="dp-language-list"
            button
            defaultValue={language || ""}
            className="icon"
            floating
            labeled
            icon="world"
            options={LanguageOptions}
            fluid
            selection
            placeholder="Select Language"
            onChange={setOption}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: (
        <Menu.Item key="name">
          <Icon name="pencil alternate" />
          Name
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane>
          <Input
            focus
            fluid
            placeholder="Name..."
            onChange={(e) => setName(e.target.value)}
          />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <div>
      <Modal closeIcon open={open} onClose={() => handleClose()}>
        <Header icon="archive" content="Create widget" />
        <Modal.Content>
          {validation.length > 0 ? (
            <Message
              error
              header="There was some errors with your submission"
              list={validation}
            />
          ) : (
            ""
          )}
          <p>
            Your inbox is getting full, would you like us to enable automatic
            archiving of old messages?
          </p>
          <Tab panes={panes} activeIndex={activeTab} />
        </Modal.Content>

        <Modal.Actions>
          {activeTab === TABS.language ? (
            <Button
            id="btn-modal-next"
              icon
              labelPosition="right"
              onClick={() => {
                handleTab(0,1);
              }}
            >
              Next
              <Icon name="angle right" />
            </Button>
          ) : (
            <>
              <Button
                icon
                labelPosition="right"
                onClick={() => {
                  setActiveTab(0);
                }}
              >
                Previous
                <Icon name="angle left" />
              </Button>
              <Button color="red" onClick={() => handleClose()}>
                <Icon name="remove" /> Close
              </Button>
              <Button id="btn-modal-add" color="green" onClick={() => handleInputs()}>
                <Icon name="checkmark" /> Add
              </Button>
            </>
          )}
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default ModalView;
