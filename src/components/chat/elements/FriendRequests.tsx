import { IonIcon } from "@ionic/react";
import { checkmarkSharp, close } from "ionicons/icons";

export default function FriendRequests() {
  return (
    <div className="FR-Card">
      <h2 style={{ textAlign: "center" }}>Friend Requests</h2>
      <Request />
      <Request />
      <Request />
    </div>
  );
}

function Request() {
  return (
    <div className="friend">
      <div className="profile" style={{ flex: "1" }}>
        <div className="profile-details">
          <h1>Allan Soriano</h1>
        </div>
      </div>
      <IonIcon className="FR-icon" icon={checkmarkSharp} />
      <IonIcon className="FR-icon" icon={close} />
    </div>
  );
}
