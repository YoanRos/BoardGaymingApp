import React from 'react';
import { TouchableOpacity, View, Text, Modal, TextInput } from 'react-native';

interface CreationModalProps {
  onValidation: () => void;
  title: string;
  visible: boolean;
}

const CreationModal = ({ onValidation, title, visible }: CreationModalProps) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onValidation}
    >
      <View className='flex-1 justify-end items-center'>
        <View className='h-1/2 w-full p-8 bg-[#FFF4FA] shadow-slate-50 drop-shadow-md rounded-xl justify-between items-center elevation-md '>
          <Text className='text-lg font-bold'>{title}</Text>
          <View className='flex gap-4'>

          <Text className='text-md font-semibold '>Name</Text>
          <TextInput className='bg-white p-4 w-64' placeholder='hoties channel'
          />
          </View>
          

          <TouchableOpacity
            className='bg-[#F78DA7] rounded-lg p-4 justify-center items-center shadow-lg'
            onPress={onValidation}
          >
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CreationModal;
