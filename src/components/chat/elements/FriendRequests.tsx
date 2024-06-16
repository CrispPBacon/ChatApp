import { IonIcon } from "@ionic/react";
import { checkmarkSharp, close } from "ionicons/icons";
import { useEffect, useState } from "react";
import { socket } from "../../../socket";
import { handleAPIRequest } from "../../../context/ContextFunctions";
import { useAuth } from "../../../context/AuthContext";

type requestsType = {
  fullname: string;
  person_id: string;
};

export default function FriendRequests() {
  const [requests, setRequests] = useState<requestsType[]>([]);
  const { user } = useAuth();

  const acceptRequest = async (
    user_id: string | undefined,
    person_id: string | undefined
  ) => {
    handleAPIRequest("/api/users", {
      acceptRequest: { user_id, person_id },
    }).catch((error) => {
      console.log(error.message);
    });
  };
  const rejectRequest = async (
    user_id: string | undefined,
    person_id: string | undefined
  ) => {
    handleAPIRequest("/api/users", {
      rejectRequest: { user_id, person_id },
    }).catch((error) => {
      console.log(error.message);
    });
  };

  const handleFriendRequest = (data: any) => {
    setRequests((prev) => [...prev, data]);
  };

  useEffect(() => {
    const fetchRequests = async () => {
      await handleAPIRequest("/api/users", {
        friendRequests: { user_id: user?._id },
      })
        .then((res) => {
          setRequests(res);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    fetchRequests();
  }, []);
  useEffect(() => {
    socket.on("friend_request", handleFriendRequest);
    return () => {
      socket.off("friend_request", handleFriendRequest);
    };
  }, [socket]);

  return (
    <div className="FR-Card">
      <h2 style={{ textAlign: "center", margin: ".5rem 0" }}>
        Friend Requests
      </h2>
      {requests.length > 0
        ? requests.map((obj) => (
            <Request
              fullname={obj.fullname}
              onAccept={() => acceptRequest(user?._id, obj.person_id)}
              onReject={() => rejectRequest(user?._id, obj.person_id)}
              key={obj.person_id}
            />
          ))
        : null}
    </div>
  );
}

interface RequestProps {
  fullname: string;
  onAccept: () => void;
  onReject: () => void;
}
function Request({ fullname, onAccept, onReject }: RequestProps) {
  return (
    <div className="friend">
      <div className="profile" style={{ flex: "1" }}>
        <div className="profile-details">
          <h1>{fullname}</h1>
        </div>
      </div>
      <IonIcon className="FR-icon" icon={checkmarkSharp} onClick={onAccept} />
      <IonIcon className="FR-icon" icon={close} onClick={onReject} />
    </div>
  );
}
