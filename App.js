import { useState } from "react";
import { Button, ScrollView } from "react-native";

export default function App() {
  const [screen, setScreen] = useState("stocks");

  const [stocks, setStocks] = useState([
    { name: "AAPL", value: 100 },
    { name: "GOOG", value: 120 },
    { name: "MSFT", value: 80 }
  ]);

  return (
    <ScrollView style={{ padding: 20 }}>
      <Button title="Stocks" onPress={() => setScreen("stocks")} />
      <Button title="Names" onPress={() => setScreen("names")} />
      <Button title="Oil" onPress={() => setScreen("oil")} />
      <Button title="Dashboard" onPress={() => setScreen("dashboard")} />
    </ScrollView>
  );
}
