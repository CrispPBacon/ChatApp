import { IonIcon } from "@ionic/react";
import { barChart, chatbubbleEllipses, people } from "ionicons/icons";
import { useState } from "react";

interface Props {
  selectMenu: React.Dispatch<React.SetStateAction<string>>;
}
export default function NavMenu({ selectMenu }: Props) {
  const [selected, setSelect] = useState("CHATS");
  return (
    <>
      <span
        style={
          selected === "CHATS" ? { background: "rgba(255, 255, 255, 0.5)" } : {}
        }
        onClick={() => {
          selectMenu("CHATS");
          setSelect("CHATS");
        }}
      >
        <IonIcon icon={chatbubbleEllipses} />
      </span>
      <span
        style={
          selected === "FRIENDS"
            ? { background: "rgba(255, 255, 255, 0.5)" }
            : {}
        }
        onClick={() => {
          setSelect("FRIENDS");
          selectMenu("FRIENDS");
        }}
      >
        <IonIcon icon={people} />
      </span>
      <span
        style={
          selected === "ANALYTICS"
            ? { background: "rgba(255, 255, 255, 0.5)" }
            : {}
        }
        onClick={() => {
          setSelect("ANALYTICS");
          selectMenu("ANALYTICS");
        }}
      >
        <IonIcon icon={barChart} />
      </span>
    </>
  );
}
