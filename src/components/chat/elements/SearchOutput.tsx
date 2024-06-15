import { IonIcon } from "@ionic/react";
import { addCircle, personCircleOutline } from "ionicons/icons";
import { userProp } from "../../../interfaces";
import { useNavigate } from "react-router-dom";
import { useChat } from "../../../context/ChatContext";
import { useAuth } from "../../../context/AuthContext";
import { handleAPIRequest } from "../../../context/ContextFunctions";

interface Props {
  searchResult: userProp[];
}
export default function SearchOutput({ searchResult }: Props) {
  const { setSearchValue } = useChat();
  const { user } = useAuth();
  const navigate = useNavigate();
  const addFriend = async (
    person_id: string,
    sender_id: string | undefined
  ) => {
    await handleAPIRequest("/api/users", {
      addFriend: { recipient_id: person_id, sender_id: sender_id },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.error(error.message));
  };
  return (
    <div className="main">
      {searchResult.length > 0
        ? searchResult.map((obj) => (
            <span
              style={{ display: "flex", alignItems: "center" }}
              id="addFriend"
              onClick={() => addFriend(obj._id, user?._id)}
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
              <IonIcon icon={addCircle} className="addFriend" />
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
