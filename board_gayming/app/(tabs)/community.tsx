import { Text, FlatList, View, SafeAreaView, TextInput } from "react-native";
import { supabase } from "@/utils/supabase";
import FloatingCTA from "@/components/ui/floatingCTA";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect } from "react";
import CreationModal from "@/components/CreationModal";

interface Channel {
  id: string;
  name: string;
}
export default function CommunityScreen() {
  const [showModal, setShowModal] = useState(false);
  const [channels, setChannels] = useState<Channel[]>([]);
  const handlePress = () => {
    setShowModal(true);
  };

  const fetchData = async () => {
    const { data, error } = await supabase.from("channels").select();
    if (error) {
      console.error("Error fetching data:", error);
      return;
    }
    setChannels(data as Channel[]);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const onValidation = async (name: String): Promise<void> => {
    console.log("tchou");
    setShowModal(false);
    if (name) {
      const { error } = await supabase.from("channels").insert({ name: name });
      console.log(error);
    }
  };

  const icon = <Ionicons name="create" size={24} color="white" />;

  return (
    <SafeAreaView className="flex-1 relative">
      <CreationModal
        visible={showModal}
        title={"Create a new Channel"}
        onValidation={onValidation}
      />

      <View className="flex p-4 gap-3">
        <TextInput
          className="p-3 border rounded-lg border-gray-400"
          placeholder="Jump to..."
        ></TextInput>
        <Text className="text-gray-400">Channels</Text>
        <FlatList
          className="flex"
          data={channels}
          renderItem={({ item }) => (
            <Text className="font-semibold m-2"># {item.name}</Text>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <FloatingCTA icon={icon} onPress={handlePress} />
    </SafeAreaView>
  );
}
