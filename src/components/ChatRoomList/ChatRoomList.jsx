import { useState, useEffect } from "react";
import "./ChatRoomList.css";

const ChatRoomList = ({ chatRooms, loadMoreChatRooms, selectChatRoom }) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (isFetching) {
      loadMoreChatRooms();
      setIsFetching(false);
    }
  }, [isFetching, loadMoreChatRooms]);

  const handleScroll = (e) => {
    if (
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight &&
      !isFetching
    ) {
      setIsFetching(true);
    }
  };

  return (
    <div className="chat-room-list" onScroll={handleScroll}>
      {chatRooms.map((room, index) => (
        <div
          key={room._id || index}
          className="chat-room-item"
          onClick={() => selectChatRoom(room)}
        >
          {room.name}
        </div>
      ))}
      {isFetching && <div className="loading">Loading more rooms...</div>}
    </div>
  );
};

export default ChatRoomList;
