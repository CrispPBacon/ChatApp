import { IonIcon } from "@ionic/react";
import { close, ellipse, menuSharp, search } from "ionicons/icons";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useChat } from "../../../context/ChatContext";

interface Props {
  header: string;
}

export default function LeftHeader({ header }: Props) {
  const [menu, setMenu] = useState(false);
  const { logout } = useAuth();
  const { searchValue, setSearchValue } = useChat();

  const title = (header: string) => {
    if (header === "CHATS") {
      return "Chats";
    } else if (header === "FRIENDS") {
      return "Friends";
    } else if (header === "ANALYTICS") {
      return "Analytics";
    } else if (header === "USERS") {
      return "Users";
    }
  };

  return (
    <div className="header">
      <div className="title">
        <h1>{title(header)}</h1>
        {header === "ANALYTICS" ? null : (
          <IonIcon icon={menuSharp} onClick={() => setMenu(!menu)} />
        )}

        {menu ? (
          <ul>
            <li onClick={logout}>Logout</li>
          </ul>
        ) : null}
      </div>
      {header === "ANALYTICS" ? null : (
        <span id="search-bar">
          <IonIcon icon={search} id="search-icon" />
          <input
            type="text"
            placeholder="Search user or chat"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <IonIcon
            icon={close}
            id="search-clear"
            onClick={() => setSearchValue("")}
          />
        </span>
      )}
      {searchValue ? null : header !== "CHATS" ? null : (
        <span id="newMessage">
          <h4 style={{ letterSpacing: "2px", fontWeight: "300" }}>New</h4>
          <IonIcon icon={ellipse} />
          <span>1</span>
        </span>
      )}
    </div>
  );
}
