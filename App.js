import { useState } from "react";
import { Button, ScrollView } from "react-native";

export default function App() {
  const [screen, setScreen] = useState('stocks');

  const [stocks, setStocks] = useState([
    { name: "AAPL", value: 100 },
    { name: "GOOG", value: 120 },
    { name: "MSFT", value: 80 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prev =>
        prev.map(stock => {
          let change = Math.floor(Math.random() * 21) - 10;
          let value = Math.max(0, Math.min(200, stock.value + change));
          return { ...stock, value, change };
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  {screen === 'stocks' && (
    <View>
      <Text style = {{ fontSize: 20 }}> Stock Ticker</Text>

      {stocks.map((stock, i) => (
        <View key = {i}>
          <Text>
            {stock.name}: {stock.value} ({stock.change > 0 ? '+' : ''}{stock.change})
          </Text>

          <View
          style = {{
            height: 10,
            width: `${(stock.value / 200) * 100}%`,
            backgroundColor: 'green',
            marginBottom: 10
          }}
          />
          </View>
  ))}
  </View>
  )}

  return (
    <ScrollView style={{ padding: 20 }}>
      <Button title="Stocks" onPress={() => setScreen('stocks')} />
      <Button title="Names" onPress={() => setScreen('names')} />
      <Button title="Oil" onPress={() => setScreen('oil')} />
      <Button title="Dashboard" onPress={() => setScreen('dashboard')} />
    </ScrollView>
  );
}
