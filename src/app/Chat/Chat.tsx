import React, { useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Button from 'components/Button';
import { TextInput } from 'components/Forms';
import Header from 'components/Header';
import { UserContext } from 'context/user.context';
import { useGroup } from 'network/group.network';
import { postGroupMessage, useGroupMessages } from 'network/messages.network';
import { capitalize } from 'utility/helper';

const Chat = () => {
  const { state } = useContext(UserContext);
  const { groupId, group } = useGroup();
  const { messages } = useGroupMessages({ groupId });
  const [message, setMessage] = useState<string>('');
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    if (group?.users) {
      const userArray = [] as string[];
      for (let i = 0; i < group?.users; i++) {
        userArray.push('user');
      }
      setUsers(userArray);
    }
  }, []);

  const handlePostMessage = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      postGroupMessage({ groupId, message })
        .then(() => setMessage(''))
        .catch((err) => {
          console.log(err);
          toast.error('Something went wrong, please try again...');
        });
    },
    [groupId, message]
  );

  return (
    <div className="container">
      <Header text="Chat" />
      <div className="flex-column">
        <div className="flex-row align-center justify-flex-end margin-bottom-8">
          {users.map((_value, i) => (
            <div
              key={i}
              className="border-circle-white background-neutral height-32 width-32"
              style={{ marginLeft: -8 }}
            />
          ))}
        </div>
        <div className="flex-1">
          <div id="chatBox" className="height-600 border-neutral flex-column" style={{ overflowY: 'scroll' }}>
            {messages.map((message) => (
              <div
                key={message._id}
                className={`flex-row align-center ${
                  message.user._id === state.user?._id ? 'justify-flex-end' : 'justify-flex-start'
                }`}
              >
                <div
                  className={`margin-8 border-radius background-neutral padding-8 ${
                    message.user._id === state.user?._id ? 'text-align-right' : 'text-align-left'
                  }`}
                >
                  <div className="font-12 text-bold margin-bottom-4">{`${capitalize(
                    message.user.firstName
                  )} ${capitalize(message.user.lastName)}`}</div>
                  <div className="font-16">{message.message}</div>
                </div>
              </div>
            ))}
          </div>
          <form
            className="flex-row align-center"
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => handlePostMessage(event)}
          >
            <div className="flex-1 margin-right-8">
              <TextInput
                id="chat"
                value={message}
                onChange={(event: React.FormEvent<HTMLInputElement>) => {
                  setMessage(event.currentTarget.value);
                }}
              />
            </div>
            <Button type="submit" text="Send" width={100} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
