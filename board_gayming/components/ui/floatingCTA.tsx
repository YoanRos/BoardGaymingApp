import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

interface FloatingCTAProps {
    icon: React.ReactNode;
    onPress: ()=> void;
}

const FloatingCTA = ({icon, onPress}: FloatingCTAProps) => {
  return (
    <View className='flex-1 justify-center items-center'>
      <TouchableOpacity
        className=
          'absolute bottom-10 right-10 bg-[#F78DA7] rounded-full w-16 h-16 justify-center items-center shadow-lg'
        
        onPress={onPress}
      >
        {icon? icon : <Text className='text-white text-xl'>+</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default FloatingCTA;