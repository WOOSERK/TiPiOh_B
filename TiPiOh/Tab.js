import React from 'react';
import Profile from "./Profile";
import Ranking from "./Ranking";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BottomTab = createBottomTabNavigator();

export default function Tab({ navigation }) {
    return (
        <BottomTab.Navigator>
          <BottomTab.Screen name="랭킹" component={Ranking}
           options={{tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="crown" color={color} size={size} />
          ),
        }}/>
          <BottomTab.Screen name="검색" component={Ranking}
           options={{tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size} />
          ),
        }}/>
          <BottomTab.Screen name="타임라인" component={Profile}
           options={{tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="timeline-clock" color={color} size={size} />
          ),
        }}/>
          <BottomTab.Screen name="알림" component={Ranking}
           options={{tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
        }}/>
          <BottomTab.Screen name="프로필" component={Profile}
           options={{tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}/>
        </BottomTab.Navigator>
      ); 
}
