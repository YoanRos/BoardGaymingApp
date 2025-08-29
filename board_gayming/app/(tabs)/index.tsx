import {
  Alert,
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import React from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { supabase } from "../../utils/supabase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Sign in with email and password
  const onSignInPress = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  };

  // Create a new user
  const onSignUpPress = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  };

  return (
    <View className="bg-[#F78DA7] " style={styles.container}>
      <Spinner visible={loading} />

      <Text style={styles.header}>Board Gayming</Text>

      <View className="flex gap-2">
        <TextInput
          autoCapitalize="none"
          placeholder="john@doe.com"
          value={email}
          onChangeText={setEmail}
          className="bg-[#FFF4FA] border border-white rounded-md p-4 h-12"
        />
        <TextInput
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="bg-[#FFF4FA] border border-white rounded-md p-4 h-12"
        />
      </View>
      <View className="flex gap-4 mt-10">
        <TouchableOpacity
          className="flex bg-[#2b825b] border border-[#2b825b] rounded-md p-3 "
          onPress={onSignInPress}
        >
          <Text className="text-white  text-center">Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex bg-[#FFF4FA] border border-white rounded-md p-3 align-middle justify-center "
          onPress={onSignUpPress}
        >
          <Text className=" text-black text-center">Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
    padding: 20,
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    margin: 50,
    color: "#fff",
  },
});

export default Login;
