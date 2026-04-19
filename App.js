import { useEffect, useState } from "react";
import { Button, ScrollView, Text, TextInput, View } from "react-native";

export default function App() {
  const [screen, setScreen] = useState('stocks');
  const [stocks, setStocks] = useState([
    { name: 'AAPL', value: 100, change: 0 },
    { name: 'GOOG', value: 120, change: 0 },
    { name: 'MSFT', value: 80, change: 0 }
  ]);

  const [generatedNames, setGeneratedNames] = useState([]);
  const [count, setCount] = useState('');
  const firstNames = ['Joshua', 'Margaret', 'Alexander', 'Holly'];
  const lastNames = ['Williams', 'Roberts', 'Smith', 'Bellinger'];

  const [pumps, setPumps] = useState([
    { id: 1, value: 50, direction: 1, total: 0 },
    { id: 2, value: 25, direction: 1, total: 0 }
  ]);

  useEffect(() => {
    const stockInterval = setInterval(() => {
      setStocks(prev =>
        prev.map(stock => {
          let change = Math.floor(Math.random() * 21) - 10;
          let newValue = Math.max(0, Math.min(200, stock.value + change));

          return {
            ...stock,
            value: newValue,
            change: change
          };
        })
      );
    }, 1000);

    return () => clearInterval(stockInterval);
  }, []);

  useEffect(() => {
    const pumpInterval = setInterval(() => {
      setPumps(prev =>
        prev.map(pump => {
          let newValue = pump.value + pump.direction * 5;
          let newDirection = pump.direction;

          if (newValue >= 100) newDirection = -1;
          if (newValue <= 0) newDirection = 1;

          return {
            ...pump,
            value: newValue,
            direction: newDirection,
            total: pump.total + Math.abs(newValue)
          };
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

  const avgStock =
    stocks.reduce((sum, s) => sum + s.value, 0) /
    stocks.length;
  const totalPumpOutput =
    pumps.reduce((sum, p) => sum + p.total, 0);

  return (
    <ScrollView style={{ padding: 20, marginTop: 40 }}>
      <Button title="Stocks" onPress={() => setScreen('stocks')} />
      <Button title="Names" onPress={() => setScreen('names')} />
      <Button title="Oil" onPress={() => setScreen('oil')} />
      <Button
        title="Dashboard"
        onPress={() => setScreen('dashboard')}
      />

      {screen === 'stocks' && (
        <View>
          <Text style={{ fontSize: 22, marginVertical: 10 }}>
            Stock Ticker
          </Text>

          {stocks.map((stock, index) => (
            <View key={index}>
              <Text>
                {stock.name}: {stock.value} (
                {stock.change > 0 ? '+' : ''}
                {stock.change})
              </Text>

              <View
                style={{
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
          <Text style={{ fontSize: 22, marginVertical: 10 }}>
            Name Generator
          </Text>

          <TextInput
            placeholder="How many names?"
            keyboardType="numeric"
            value={count}
            onChangeText={setCount}
            style={{
              borderWidth: 1,
              padding: 8,
              marginBottom: 10
            }}
          />

          <Button
            title="Generate Names"
            onPress={generateNames}
          />

          {generatedNames.map((name, index) => (
            <Text key={index}>{name}</Text>
          ))}
        </View>
      )}

      {screen === 'oil' && (
        <View>
          <Text style={{ fontSize: 22, marginVertical: 10 }}>
            Oil Pump Monitor
          </Text>

          {pumps.map(pump => (
            <Text key={pump.id}>
              Pump {pump.id}: {pump.value} | Total:{' '}
              {pump.total}
            </Text>
          ))}
        </View>
      )}

      {screen === 'dashboard' && (
        <View>
          <Text style={{ fontSize: 22, marginVertical: 10 }}>
            Dashboard
          </Text>

          <Text>Total Stocks: {stocks.length}</Text>
          <Text>
            Average Stock Value: {avgStock.toFixed(2)}
          </Text>
          <Text>
            Total Pump Output: {totalPumpOutput}
          </Text>
          <Text>
            Generated Names: {generatedNames.length}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
