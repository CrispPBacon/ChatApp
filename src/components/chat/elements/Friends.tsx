import { IonIcon } from "@ionic/react";
import { personCircleOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { userProp } from "../../../interfaces";
import { handleAPIRequest } from "../../../context/ContextFunctions";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Friends() {
  const [friends, setFriends] = useState<userProp[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchFriends = async () => {
    await handleAPIRequest("/api/users", {
      fetchFriends: { user_id: user?._id },
    })
      .then((res) => setFriends(res))
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <div className="main">
      {friends.length > 0
        ? friends.map((obj) => (
            <Friend
              fullname={obj.fullname}
              key={obj._id}
              onClick={() => navigate(`/m/${obj._id}`)}
            />
          ))
        : null}
    </div>
  );
}

interface FriendProps {
  fullname: string;
  onClick: () => void;
}
function Friend({ fullname, onClick }: FriendProps) {
  return (
    <span onClick={onClick}>
      <div className="profile">
        <span>
          <IonIcon icon={personCircleOutline} />
        </span>
        <div className="profile-details">
          <h1>{fullname}</h1>
        </div>
      </div>
    </span>
  );
}
