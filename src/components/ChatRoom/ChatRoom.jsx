import { useState, useEffect } from 'react';
import MessageContainer from '../MessageContainer/MessageContainer';
import InputField from '../InputField/InputField';
import './ChatRoom.css';

const ChatRoom = ({ selectedRoom, user, socket }) => {
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // 채팅방 입장할 때, 메시지 받아오기
    if (selectedRoom) {
      socket.emit('joinRoom', selectedRoom._id);

      socket.on('roomMessages', messages => {
        setMessageList(messages);
      });
    }

    // 채팅방 나갈 때, 이벤트 리스너 정리
    return () => {
      socket.emit('leaveRoom', selectedRoom._id);
      socket.off('roomMessages');
    };
  }, [selectedRoom, socket]);

  const sendMessage = event => {
    event.preventDefault();
    if (message.trim() === '') return;

    const newMessage = {
      user,
      chat: message,
      roomId: selectedRoom._id,
    };

    socket.emit('sendMessage', newMessage, res => {
      if (res.ok) {
        setMessageList([...messageList, newMessage]);
        setMessage('');
      }
    });
  };

  return (
    <div className="chat-room">
      <h2>{selectedRoom.name}</h2>
      <MessageContainer messageList={messageList} user={user} />
      <InputField message={message} setMessage={setMessage} sendMessage={sendMessage} />
    </div>
  );
};

export default ChatRoom;
