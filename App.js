import { useState } from "react";
import { Button, ScrollView } from "react-native";

export default function App() {
  const [screen, setScreen] = useState("stocks");

  return (
    <ScrollView style={{ padding: 20 }}>
      <Button title="Stocks" onPress={() => setScreen("stocks")} />
      <Button title="Names" onPress={() => setScreen("names")} />
      <Button title="Oil" onPress={() => setScreen("oil")} />
      <Button title="Dashboard" onPress={() => setScreen("dashboard")} />
    </ScrollView>
  );
}