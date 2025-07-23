import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

const Calcuator = () => {
  const [dispaly, setDisplay] = useState('0');
  const [operand, setOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const pressButton = value => {
    if (waitingForOperand) {
      setDisplay(value);
      setWaitingForOperand(false);
    } else {
      setDisplay(dispaly === '0' ? value : dispaly + value);
    }
  };
  const pressOperator = operation => {
    const inputValue = parseFloat(dispaly);
    if (operand === null) {
      setOperand(inputValue);
    } else if (operator) {
      const result = performCalculation();
      setOperand(result);
      setDisplay(String(result));
    }
    setWaitingForOperand(true);
    setOperator(operation);
  };
  const performCalculation = () => {
    const inputValue = parseFloat(dispaly);
    if (operand === null) return inputValue;
    switch (operator) {
      case '+':
        return operand + inputValue;
      case '-':
        return operand - inputValue;
      case '*':
        return operand * inputValue;
      case '÷':
        return operand / inputValue;
      case '%':
        return operand % inputValue;
      default:
        return inputValue;
    }
  };
  const Calcuate = () => {
    if (operator === null || waitingForOperand) return;
    const result = performCalculation();
    setDisplay(String(result));
    setOperand(result);
    setOperator(null);
    setWaitingForOperand(true);
  };
  const ClearAll = () => {
    setDisplay('0');
    setOperand(null);
    setOperator(null);
    setWaitingForOperand(false);
  };
  const toggleSign = () => {
    const newValue = parseFloat(dispaly) * -1;
    setDisplay(String(newValue));
  };
  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!dispaly.includes('.')) {
      setDisplay(dispaly + '.');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.dispaly}>
        <Text style={styles.dispalyText}>{dispaly}</Text>
      </View>
      <View style={styles.buttons}>
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.button, styles.functionButton]}
            onPress={ClearAll}
          >
            <Text style={styles.buttonText}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.functionButton]}
            onPress={toggleSign}
          >
            <Text style={styles.buttonText}>+/-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.functionButton]}
            onPress={() => pressOperator('%')}
          >
            <Text style={styles.buttonText}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.operatorButton]}
            onPress={() => pressOperator('÷')}
          >
            <Text style={styles.buttonText}>÷</Text>
          </TouchableOpacity>
        </View>
        {/* row2 */}
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => pressButton('7')}
          >
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => pressButton('8')}
          >
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => pressButton('9')}
          >
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.operatorButton]}
            onPress={() => pressOperator('×')}
          >
            <Text style={styles.buttonText}>×</Text>
          </TouchableOpacity>
        </View>
        {/* row3 */}
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => pressButton('4')}
          >
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => pressButton('5')}
          >
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => pressButton('6')}
          >
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.operatorButton]}
            onPress={() => pressOperator('-')}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
        {/* row-4 */}
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => pressButton('1')}
          >
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => pressButton('2')}
          >
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => pressButton('3')}
          >
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.operatorButton]}
            onPress={() => pressOperator('+')}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        {/* row5 */}
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.button, styles.zeroButton]}
            onPress={() => pressButton('0')}
          >
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={inputDecimal}>
            <Text style={styles.buttonText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.operatorButton]}
            onPress={Calcuate}
          >
            <Text style={styles.buttonText}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Calcuator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'flex-end',
  },
  dispaly: {
    padding: 20,
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  dispalyText: {
    color: '#fff',
    fontSize: 80,
    fontWeight: '300',
  },
  buttons: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  zeroButton: {
    width: 160,
    borderRadius: 37.5,
    alignItems: 'flex-start',
    paddingLeft: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 36,
  },
  functionButton: {
    backgroundColor: '#a5a5a5',
  },
  operatorButton: {
    backgroundColor: '#ff9f0a',
  },
});
