import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const ClientesScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [fechaReserva, setFechaReserva] = useState(new Date());
  const [cantidadPersonas, setCantidadPersonas] = useState('');
  const [clientes, setClientes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setFechaReserva(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode('date');
  };

  const agregarCliente = () => {
    const nuevoCliente = {
      id: clientes.length > 0 ? clientes[clientes.length - 1].id + 1 : 1,
      nombre: nombre,
      fechaReserva: fechaReserva,
      cantidadPersonas: cantidadPersonas,
    };
    setClientes([...clientes, nuevoCliente]);
    setNombre('');
    setFechaReserva(new Date());
    setCantidadPersonas('');
    setModalVisible(false);
  };

  const eliminarCliente = (id) => {
    setClientes(clientes.filter((cliente) => cliente.id !== id));
  };

  return (
    <View style={styles.container}>
      <Button title="Ir a Alumnos" onPress={() => navigation.navigate('Alumnos')} />
      <Button title="Agregar Cliente" onPress={() => setModalVisible(true)} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Nombre del Cliente"
              placeholderTextColor="#999"
              value={nombre}
              onChangeText={setNombre}
            />
            <TextInput
              style={styles.input}
              placeholder="Cantidad de Personas"
              placeholderTextColor="#999"
              value={cantidadPersonas}
              onChangeText={setCantidadPersonas}
              keyboardType="numeric"
            />
            <TouchableOpacity onPress={showDatePicker}><Text>Seleccionar fecha de Reserva</Text></TouchableOpacity>
            <Text>Fecha de Reserva: {fechaReserva.toLocaleString()}</Text>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
            <Button title="Agregar Cliente" onPress={agregarCliente} />
            <Button
              title="Cancelar"
              onPress={() => setModalVisible(false)}
              color="red"
            />
          </View>
        </View>
      </Modal>
      <FlatList
        data={clientes}
        renderItem={({ item }) => (
          <View style={styles.clienteItem}>
            <Text style={styles.clienteId}>Registro: {item.id}</Text>
            <Text style={styles.clienteNombre}>{item.nombre}</Text>
            <Text style={styles.clienteInfo}>Fecha de Reserva: {item.fechaReserva.toDateString()}</Text>
            <Text style={styles.clienteInfo}>Cantidad de Personas: {item.cantidadPersonas}</Text>
            <Button title="Eliminar" onPress={() => eliminarCliente(item.id)} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#333',
  },
  clienteItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  clienteId: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  clienteNombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  clienteInfo: {
    fontSize: 16,
  },
});

export default ClientesScreen;
