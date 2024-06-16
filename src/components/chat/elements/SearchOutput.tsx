import { IonIcon } from "@ionic/react";
import { addCircle, personCircleOutline } from "ionicons/icons";
import { userProp } from "../../../interfaces";
import { useNavigate } from "react-router-dom";
import { useChat } from "../../../context/ChatContext";
import { useAuth } from "../../../context/AuthContext";
import { socket } from "../../../socket";

interface Props {
  searchResult: userProp[];
}
export default function SearchOutput({ searchResult }: Props) {
  const { setSearchValue } = useChat();
  const { user } = useAuth();
  const navigate = useNavigate();
  const addFriend = async (
    user_id: string | undefined,
    person_id: string | undefined
  ) => {
    if (!person_id || !user_id) {
      return alert("FILL IN THE IDS");
    }
    if (person_id === user_id) {
      return alert("You cant sent friend request to yourself!")
    }

    socket.emit(
      "send_friend_request",
      { user_id, person_id },
      (response: string) => {
        alert(response);
      }
    );
  };
  return (
    <div className="main">
      {searchResult.length > 0
        ? searchResult.map((obj) => (
            <span
              style={{ display: "flex", alignItems: "center" }}
              id="addFriend"
              key={obj._id}
            >
              <People
                fullname={obj.fullname}
                image={null}
                onSelect={() => {
                  navigate(`/m/${obj._id}`);
                  setSearchValue("");
                }}
              />
              <IonIcon
                icon={addCircle}
                className="addFriend"
                onClick={() => addFriend(user?._id, obj?._id)}
              />
            </span>
          ))
        : null}
    </div>
  );
}

interface PeopleProps {
  fullname: string;
  image: string | null;
  onSelect: () => void;
}
function People({ fullname, image, onSelect }: PeopleProps) {
  return (
    <div className="profile" onClick={onSelect} style={{ flex: 1 }}>
      <span>
        {image ? (
          <img src={image} alt="PROFILE" />
        ) : (
          <IonIcon icon={personCircleOutline} />
        )}
      </span>
      <div className="profile-details">
        <h1>{fullname}</h1>
      </div>
    </div>
  );
}
