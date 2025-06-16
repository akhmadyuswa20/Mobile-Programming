import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

export default function App() {
  const [screen, setScreen] = useState('login');

  // Input login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Input registrasi
  const [regName, setRegName] = useState('');
  const [regDob, setRegDob] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // Data user
  const [userData, setUserData] = useState(null);

  // Tampilan Login
  const renderLogin = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (!email || !password) {
            Alert.alert('Error', 'Harap isi semua field');
            return;
          }

          if (userData && email === userData.email && password === userData.password) {
            setScreen('dashboard');
          } else {
            Alert.alert('Login Gagal', 'Email atau password salah');
          }
        }}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setScreen('register')}>
        <Text style={styles.link}>Belum punya akun? Daftar</Text>
      </TouchableOpacity>
    </View>
  );

  // Tampilan Register
  const renderRegister = () => (
  <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.title}>Register</Text>

    <TextInput
      placeholder="Nama Lengkap"
      value={regName}
      onChangeText={setRegName}
      style={styles.input}
    />
    <TextInput
      placeholder="Tanggal Lahir (YYYY-MM-DD)"
      value={regDob}
      onChangeText={setRegDob}
      style={styles.input}
    />
    <TextInput
      placeholder="Alamat"
      value={regAddress}
      onChangeText={setRegAddress}
      style={styles.input}
    />
    <TextInput
      placeholder="Email"
      value={regEmail}
      onChangeText={setRegEmail}
      style={styles.input}
    />
    <TextInput
      placeholder="Password"
      value={regPassword}
      onChangeText={setRegPassword}
      style={styles.input}
      secureTextEntry
    />

    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        if (!regName || !regDob || !regAddress || !regEmail || !regPassword) {
          Alert.alert('Error', 'Harap isi semua data');
        } else if (regPassword.length < 8) {
          Alert.alert('Error', 'Password harus minimal 8 karakter');
        } else {
          setUserData({
            name: regName,
            dob: regDob,
            address: regAddress,
            email: regEmail,
            password: regPassword,
          });
          Alert.alert('Sukses', 'Registrasi berhasil! Silakan login.');
          setScreen('login');
        }
      }}
    >
      <Text style={styles.buttonText}>Register</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => setScreen('login')}>
      <Text style={styles.link}>Sudah punya akun? Login</Text>
    </TouchableOpacity>
  </ScrollView>
);


  const renderDashboard = () => (
    <ScrollView style={styles.dashboardContainer}>
      <Text style={styles.welcomeText}>Halo, {userData?.name}</Text>

      {/* Kartu Profil */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>👤 Profil</Text>
        <Text style={styles.cardText}>Nama: {userData?.name}</Text>
        <Text style={styles.cardText}>Email: {userData?.email}</Text>
        <Text style={styles.cardText}>Tanggal Lahir: {userData?.dob}</Text>
        <Text style={styles.cardText}>Alamat: {userData?.address}</Text>
      </View>

      {/* Kalender */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📅 Mata Kuliah</Text>
        <Text style={styles.cardText}>Belum ada event hari ini.</Text>
      </View>

      {/* Tugas */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📝 List Tugas</Text>
        <Text style={styles.cardText}>- Belajar React Native</Text>
        <Text style={styles.cardText}>- Upload ke GitHub</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={() => setScreen('login')}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  return screen === 'login'
    ? renderLogin()
    : screen === 'register'
    ? renderRegister()
    : renderDashboard();
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, textAlign: 'center', marginBottom: 20 },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    borderColor: '#999',
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: { color: 'white', textAlign: 'center' },
  link: { color: 'blue', textAlign: 'center' },

  dashboardContainer: {
    flex: 1,
    backgroundColor: '#999999',
    padding: 20,
  },
  welcomeText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#2C2C2C',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  cardTitle: {
    color: '#00BFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardText: {
    color: '#FFF',
    fontSize: 14,
  },
  logoutButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  logoutText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
