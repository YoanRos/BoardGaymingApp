import { Text ,FlatList} from "react-native";
import { supabase } from "@/utils/supabase";

export default function CommunityScreen() {
  return (
    <FlatList
      data={[{ key: 'Channel1  ' }, { key: 'Channel2  ' }, { key: 'Channel3  ' }]}
      renderItem={({ item }) => <Text>{item.key}</Text>}
      keyExtractor={item => item.key}
    />
  );
}
