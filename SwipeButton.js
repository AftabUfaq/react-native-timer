import React, {} from 'react';
import {View} from 'react-native'
import SwipeButton from 'rn-swipe-button';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { scale } from "react-native-size-matters";
import { colors,fonts } from '../../constants/theme';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { wp } from '../../constants/sacling';
function Swiptbutton({onPress, title}) {
   return (
   <View 
        style={{
            marginTop:scale(50),
            maxHeight:50, 
            borderRadius:widthPercentageToDP(50),
            backgroundColor:"#0000",
            width:widthPercentageToDP(90), 
            justifyContent:"center"
            }}>
      <SwipeButton
          width={wp(86)}
          shouldResetAfterSuccess={true}
          resetAfterSuccessAnimDelay={20}
          resetAfterSuccessAnimDuration={20}
          containerStyles={{
            width:widthPercentageToDP(88),
            justifyContent:"center",
            backgroundColor:"red",
            alignItems:"center",
            borderWidth:0,
            height:50
          }}
          railStyles={{
            backgroundColor:"green",
            marginLeft:wp(-.50),
            height:50
          }}
         
          railBorderColor='#0000'
          railFillBorderColor={"green"}
          railFillBackgroundColor="green"
          thumbIconBorderColor={"#ffff"}
          onSwipeSuccess={() => onPress()}
          railBackgroundColor={colors.dark_primary_color}
          titleColor={"#fff"}
          titleStyles={{
            fontFamily:fonts.Medium,
            fontSize:scale(16),
            zIndex:100
          }}

          thumbIconComponent={() => <AntDesign name='doubleright' size={24} color={colors.dark_primary_color} />}
          thumbIconBackgroundColor="#FFFFFF"
          title={title}
        />
   </View>
  );
}

export default Swiptbutton;
