import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

interface CreationModalProps {
  onValidation: (name: String) => Promise<void>;
  title: string;
  visible: boolean;
}

const CreationModal = ({
  onValidation,
  title,
  visible,
}: CreationModalProps) => {
  const [name, setName] = useState("");
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={() => {
        onValidation("");
      }}
    >
      <View className="flex-1 justify-end items-center">
        <View className="flex w-full h-1/2 p-6 bg-[#FFF4FA] shadow-slate-50 drop-shadow-md rounded-xl gap-4 items-center elevation-md ">
          <TouchableOpacity
            className="items-end w-full"
            onPress={() => onValidation("")}
          >
            <Ionicons name="close" size={24} color="#F78DA7" />
          </TouchableOpacity>
          <Text className="text-lg font-bold">{title}</Text>
          <View className="justify-between flex-1 w-full ">
            <View className="flex gap-6">
              <Text className="text-md font-semibold ">Name</Text>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                <TextInput
                  className="bg-white p-4 w-64"
                  placeholder="hoties channel"
                  value={name}
                  onChangeText={setName}
                />
              </KeyboardAvoidingView>
            </View>

            <TouchableOpacity
              className={`bg-[#F78DA7] rounded-lg p-4 justify-center items-center shadow-lg ${!name ? "opacity-50" : ""}`}
              onPress={() => onValidation(name)}
              disabled={!name}
            >
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreationModal;
