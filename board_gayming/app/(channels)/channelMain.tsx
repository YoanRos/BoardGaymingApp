import {
  Text,
  FlatList,
  View,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../../provider/AuthProvider";
import { supabase } from "@/utils/supabase";
import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Message {
  id: string;
  content: string;
}

export default function CommunityScreen() {
  const { user } = useAuth();
  const { id, channelName } = useLocalSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const handlePress = () => {
    setShowModal(true);
  };

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select()
        .eq("channel_id", id);

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }
      setMessages(data as Message[]);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);
  const onValidation = async (newMessage: String): Promise<void> => {
    if (!user) return;
    console.log(user.id);
    if (newMessage) {
      const { error } = await supabase
        .from("messages")
        .insert({ content: newMessage, channel_id: id, profile_id: user.id });

      if (error) {
        console.error("Error inserting message:", error);
      } else {
        setNewMessage("");
        await fetchData();
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 relative">
      <View className="flex p-4 ">
        {messages ? (
          <FlatList
            className="flex"
            data={messages}
            renderItem={({ item }) => (
              <Text className="font-semibold m-2"># {item.content}</Text>
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <Text>Send the first message !</Text>
        )}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="p-3 border rounded-lg border-gray-400 flex justify-between">
            <TextInput
              className=""
              placeholder={`Send a message to ${channelName}`}
              value={newMessage}
              onChangeText={setNewMessage}
            ></TextInput>
            <TouchableOpacity onPress={() => onValidation(newMessage)}>
              <Ionicons name="send" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}
