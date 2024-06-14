import { IonIcon } from "@ionic/react";
import { personCircleOutline } from "ionicons/icons";

export default function Friends() {
  return (
    <div className="main">
      <div className="profile">
        <span>
          <IonIcon icon={personCircleOutline} />
        </span>
        <div className="profile-details">
          <h1>Allan Soriano</h1>
        </div>
      </div>
    </div>
  );
}
