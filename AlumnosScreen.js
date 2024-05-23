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

const AlumnosScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [carnet, setCarnet] = useState('');
  const [materiaFavorita, setMateriaFavorita] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const [alumnos, setAlumnos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setFechaNacimiento(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode('date');
  };

  const agregarAlumno = () => {
    const nuevoAlumno = {
      id: alumnos.length > 0 ? alumnos[alumnos.length - 1].id + 1 : 1,
      nombre: nombre,
      carnet: carnet,
      materiaFavorita: materiaFavorita,
      fechaNacimiento: fechaNacimiento,
    };
    setAlumnos([...alumnos, nuevoAlumno]);
    setNombre('');
    setCarnet('');
    setMateriaFavorita('');
    setFechaNacimiento(new Date());
    setModalVisible(false);
  };

  const eliminarAlumno = (id) => {
    setAlumnos(alumnos.filter((alumno) => alumno.id !== id));
  };

  return (
    <View style={styles.container}>
      <Button title="Ir a Clientes" onPress={() => navigation.navigate('Clientes')} />
      <Button title="Agregar Alumno" onPress={() => setModalVisible(true)} />
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
              placeholder="Nombre del Alumno"
              placeholderTextColor="#999"
              value={nombre}
              onChangeText={setNombre}
            />
            <TextInput
              style={styles.input}
              placeholder="Carnet del Alumno"
              placeholderTextColor="#999"
              value={carnet}
              onChangeText={setCarnet}
            />
            <TextInput
              style={styles.input}
              placeholder="Materia Favorita"
              placeholderTextColor="#999"
              value={materiaFavorita}
              onChangeText={setMateriaFavorita}
            />
            <TouchableOpacity onPress={showDatePicker}><Text>Seleccionar Fecha de Nacimiento</Text></TouchableOpacity>
            <Text>Fecha de Nacimiento: {fechaNacimiento.toLocaleDateString()}</Text>
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
            <Button title="Agregar Alumno" onPress={agregarAlumno} />
            <Button
              title="Cancelar"
              onPress={() => setModalVisible(false)}
              color="red"
            />
          </View>
        </View>
      </Modal>
      <FlatList
        data={alumnos}
        renderItem={({ item }) => (
          <View style={styles.alumnoItem}>
            <Text style={styles.alumnoNombre}>{item.nombre}</Text>
            <Text style={styles.alumnoInfo}>Carnet: {item.carnet}</Text>
            <Text style={styles.alumnoInfo}>Materia Favorita: {item.materiaFavorita}</Text>
            <Text style={styles.alumnoInfo}>Fecha de Nacimiento: {item.fechaNacimiento.toLocaleDateString()}</Text>
            <Button title="Eliminar" onPress={() => eliminarAlumno(item.id)} />
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
  alumnoItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  alumnoNombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  alumnoInfo: {
    fontSize: 16,
  },
});

export default AlumnosScreen;
