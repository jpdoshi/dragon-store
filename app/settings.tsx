import AppBar from '@/components/AppBar'
import ScreenView from '@/components/ScreenView'
import React from 'react'
import { Text, View } from 'react-native'

const Settings = () => {
  return (
    <ScreenView>
      <AppBar>
        <View className="flex-1 flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-white leading-snug">
              Settings
            </Text>
            <Text className="font-medium text-primary">
              Tweak Settings
            </Text>
          </View>
        </View>
      </AppBar>
    </ScreenView>
  )
}

export default Settings