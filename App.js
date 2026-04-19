import { useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";

export default function App() {
  const [screen, setScreen] = useState('stocks');
  const [stocks, setStocks] = useState([
    { name: "AAPL", value: 100 },
    { name: "GOOG", value: 120 },
    { name: "MSFT", value: 80 }
  ]);

  const [generatedNames, setGeneratedNames] = useState([]);
  const [count, setCount] = useState('');
  const firstNames = ['Joshua', 'Margaret', 'Alexander', 'Holy'];
  const lastNames = ['Williams', 'Roberts', 'Smith', 'Bellinger'];

  const [pumps, setPumps] = useState([
    { id: 1, value: 50, direction: 1, total: 0 }
    { id: 2, value: 25, direction: 1, total: 0 }
  ]);
  const [count, setCount] = useState('');


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

    useEffect(() => {
    const pumpInterval = setInterval(() => {
      setPumps(pump =>
        prev.map(stock => {
          let newValue = pump.value + pump.direction * 5;
          let newDirection = pumpdirection;

          if (newValue >= 100) newDirection = -1;
          if (newValue <= 0) newDirection = 1;
          return { ...pump, value: newValue, total: pump.total + Math.abs(newValue) };
        })
      );
    }, 1000);
    return () => clearInterval(pumpInterval);
  }, []);

  const generateNames = () => {
    let results = new Set();

    while (results.size < Number(count)) {
      let first = firstNames[Math.floor(Math.random() * firstNames.length)];
      let last = lastNames[Math.floor(Math.random() * lastNames.length)];
      results.add(`${first} ${last}`);
    }
    setGeneratedNames([...results]);
  };


  return (
    <ScrollView style={{ padding: 20 }}>
      <Button title="Stocks" onPress={() => setScreen('stocks')} />
      <Button title="Names" onPress={() => setScreen('names')} />
      <Button title="Oil" onPress={() => setScreen('oil')} />
      <Button title="Dashboard" onPress={() => setScreen('dashboard')} />

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

      {screen === 'names' && (
    <View>
      <Text style = {{ fontSize: 22 }}> Name Generator</Text>

      <TextInput
      placeholder = "How Many Names?"
      keyboardType = "numeric"
      value = {count}
      onChangeText = {setCount}
      style = {{
        borderWidth: 1,
        padding: 8,
        marginBottom: 10
      }}
      />

      <Button
        title = "Generate Names"
        onPress = {generateNames}
      />

      {generatedNames.map((name, index) => (
        <Text key = {index}>{name}</Text>
      ))}
      </View>
      )}

    {screen === 'oil' && (
    <View>
      <Text style = {{ fontSize: 22, marginVertical: 10 }}> Oil Pump Monitor</Text>

      {pumps.map(pump  => (
        <Text key = {pump.id}>
          Pump {pump.id}: {pump.value} | Total:{' '}
          {pump.total}
        </Text>
      ))}
    </View>
  )}
      </ScrollView>
  );
}
