import { IonIcon } from "@ionic/react";
import { personCircleOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { userProp } from "../../../interfaces";
import { handleAPIRequest } from "../../../context/ContextFunctions";
import { useAuth } from "../../../context/AuthContext";

export default function UsersController() {
  const [users, setUsers] = useState<userProp[]>([]);
  const { user } = useAuth();

  const getUsers = async () => {
    await handleAPIRequest("/api/users", { getUsers: { user } })
      .then((res) => setUsers(res))
      .catch((error) => console.log(error.message));
  };

  const mute = async (user_id: string) => {
    await handleAPIRequest("/api/users", { muteUser: { user_id } });
  };
  const unmute = async (user_id: string) => {
    await handleAPIRequest("/api/users", { unmuteUser: { user_id } });
  };
  const ban = async (user_id: string) => {
    await handleAPIRequest("/api/users", { ban: { user_id } });
  };
  const unban = async (user_id: string) => {
    await handleAPIRequest("/api/users", { unban: { user_id } });
  };

  useEffect(() => {
    getUsers();
  }, [mute, unmute, ban, unban]);

  return (
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, .75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        flexDirection: "column",
        height: "100%",
        overflowY: "auto",
      }}
    >
      {users.length > 0
        ? users.map((obj, id) => {
            if (obj._id === user?._id) {
              return null;
            }

            return (
              <span style={{ display: "flex", margin: ".5rem" }} key={id}>
                <User fullname={obj.fullname} />
                <button
                  style={{
                    width: "5rem",
                    background: "#FFAA00",
                    border: "none",
                    cursor: "pointer    ",
                  }}
                  onClick={() => {
                    if (!obj.perms.sendChat) {
                      unmute(obj._id);
                    } else {
                      mute(obj._id);
                    }
                  }}
                >
                  {!obj.perms.sendChat ? "Unmute" : "Mute"}
                </button>
                <button
                  style={{
                    width: "5rem",
                    background: "#FF5555",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (obj.perms.banned) {
                      unban(obj._id);
                    } else {
                      ban(obj._id);
                    }
                  }}
                >
                  {obj.perms.banned ? "Unban" : "Ban"}
                </button>
              </span>
            );
          })
        : null}
    </div>
  );
}

interface Props {
  fullname: string;
}
function User({ fullname }: Props) {
  return (
    <div className="profile" style={{ width: "20rem" }}>
      <span>
        <IonIcon icon={personCircleOutline} />
      </span>
      <div className="profile-details">
        <h1>{fullname}</h1>
      </div>
    </div>
  );
}
