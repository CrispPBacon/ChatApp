import { IonIcon } from "@ionic/react";
import {
  barChart,
  chatbubbleEllipses,
  codeSlash,
  people,
} from "ionicons/icons";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

interface Props {
  selectMenu: React.Dispatch<React.SetStateAction<string>>;
}
export default function NavMenu({ selectMenu }: Props) {
  const [selected, setSelect] = useState("CHATS");
  const { user } = useAuth();
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
      {user?.role !== "admin" ? null : (
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
      )}
      {user?.role !== "admin" ? null : (
        <span
          style={
            selected === "ADMINPANEL"
              ? { background: "rgba(255, 255, 255, 0.5)" }
              : {}
          }
          onClick={() => {
            setSelect("ADMINPANEL");
            selectMenu("ADMINPANEL");
          }}
        >
          <IonIcon icon={codeSlash} />
        </span>
      )}
    </>
  );
}
