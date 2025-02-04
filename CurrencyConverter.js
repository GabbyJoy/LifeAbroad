import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';


const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleConversion = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setLoading(true);
    const apiKey = ''; 
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.result === 'success') {
        const rate = data.conversion_rates[toCurrency];
        const converted = rate * parseFloat(amount);
        setConvertedAmount(converted.toFixed(2));
      } else {
        alert('Failed to fetch conversion data');
      }
    } catch (error) {
      alert('Error fetching data. Please try again.');
      console.error('Error fetching conversion data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Currency Converter</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter amount"
        value={amount}
        onChangeText={(text) => setAmount(text)}
      />

      <View style={styles.pickerContainer}>
        <Text>From:</Text>
        <Picker
          selectedValue={fromCurrency}
          style={styles.picker}
          onValueChange={(itemValue) => setFromCurrency(itemValue)}>
          <Picker.Item label="USD" value="USD" />
          <Picker.Item label="EUR" value="EUR" />
          <Picker.Item label="GBP" value="GBP" />
          <Picker.Item label="JPY" value="JPY" />
          <Picker.Item label="AUD" value="AUD" />
          {/* Add other currencies here */}
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Text>To:</Text>
        <Picker
          selectedValue={toCurrency}
          style={styles.picker}
          onValueChange={(itemValue) => setToCurrency(itemValue)}>
          <Picker.Item label="USD" value="USD" />
          <Picker.Item label="EUR" value="EUR" />
          <Picker.Item label="GBP" value="GBP" />
          <Picker.Item label="JPY" value="JPY" />
          <Picker.Item label="AUD" value="AUD" />
          {/* Add other currencies here */}
        </Picker>
      </View>

      <Button title={loading ? 'Converting...' : 'Convert'} onPress={handleConversion} disabled={loading} />

      {convertedAmount !== null && (
        <View style={styles.result}>
          <Text style={styles.resultText}>
            {amount} {fromCurrency} = {convertedAmount} {toCurrency}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  pickerContainer: {
    width: '100%',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  result: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CurrencyConverter;
