import { Text ,FlatList, View} from "react-native";
import { supabase } from "@/utils/supabase";
import FloatingCTA from "@/components/ui/floatingCTA";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";
import CreationModal from "@/components/CreationModal";


export default function CommunityScreen() {
  console.log("here")
  const [showModal, setShowModal] = useState(false)
  const handlePress =() =>{
    console.log(showModal)
  setShowModal(true)
  }
  const onValidation =()=> {
    console.log("tchou")
    setShowModal(false)
  }

  const icon =
    <Ionicons name="create" size={24} color="white" />
  
  return (
    <View className="relative h-full">

        <CreationModal visible={showModal} title={"Create a new Channel"} onValidation={onValidation} />
    
    <FlatList
      data={[{ key: 'Channel1  ' }, { key: 'Channel2  ' }, { key: 'Channel3  ' }]}
      renderItem={({ item }) => <Text>{item.key}</Text>}
      keyExtractor={item => item.key}
      />
    <FloatingCTA icon={icon} onPress={handlePress}/>
      </View>
  );
}
