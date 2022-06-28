import React, {useEffect, useState} from 'react'
import {View, Text, Alert} from 'react-native'
import {fonts } from '../../constants/theme';
import { scale } from "react-native-size-matters";
import { useFocusEffect } from '@react-navigation/native';
const TimerView = ({duration, start=false, timeout_Function}) =>  {

    const [countDownTime,  setcountDownTime] = useState(duration)
        useEffect(() => {
            const intervalId = setInterval(() => {
                if(start){
                    if(countDownTime > 0){
                        setcountDownTime(countDownTime => countDownTime-1)
                     
                    }else{
                        setcountDownTime(0)
                       timeout_Function()
                    }
                }
            }, 1000)
        return () => clearInterval(intervalId)
    });
         useFocusEffect(
            React.useCallback(() => {
                setcountDownTime(duration)
            }, [duration])
          );

    const fancyTimeFormat = (duration) => {
        var mins = ~~((duration % 3600) / 60);
        var secs = ~~duration % 60;
        var ret = "";
        ret += "" + mins + " mins " + (secs < 10 ? "0" : "");
        ret += "" + secs + " Secs ";
        return ret;
    }
    return(
        <View>
            <Text 
                style ={{
                    color: '#4A90E2',
                    fontSize:scale(16),
                    fontFamily:fonts.Medium,
                    alignSelf: 'center',
                    marginVertical: 10,
                }}> 
                {fancyTimeFormat(countDownTime)} remaining ...
              
            </Text>
            <Text 
                style ={{
                    color: '#4A90E2',
                    fontSize:scale(16),
                    fontFamily:fonts.Medium,
                    alignSelf: 'center',
                    marginVertical: 10,
                }}> 
               
                {countDownTime} remaining ...
            </Text>
        </View>
    )
}

export default TimerView
