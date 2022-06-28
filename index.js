import React, {useRef, useEffect, useState } from 'react';
import {SafeAreaView,StatusBar,AppState, Text,View} from 'react-native';
import { commonStyles,textStyles } from '../../styles';
import CustomHeader from '../../components/CustomHeader';
import { colors, fonts } from '../../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiptbutton from './SwipeButton';
import TimerView from './Timer';
import moment from 'moment';
const END_TIME = "endDuration"

    const OnBoardingScreen = ({navigation}) => {
        const [start, setStart] = useState(false)
     
        const [endDuration, setEndDuration] = useState(moment().add(300, "seconds").unix())
        const appState = useRef(AppState.currentState);
        const [appStateVisible, setAppStateVisible] = useState(appState.current);
        const [duration , setDuration] = useState(300)
        const [loading, setLoading] = useState(true)
        
        const onStartTimer = async () => {
           await AsyncStorage.setItem(END_TIME, JSON.stringify(moment().add(300, "seconds").unix()))
           setDuration(moment().add(300, "seconds").unix()-moment().unix())
           setStart(!start)
           setLoading(false)
        }

        useEffect(() => {
            AsyncStorage.getItem(END_TIME).then((value) => {
                if(value !== null){
                    setEndDuration(parseInt(value))
                    if(parseInt(value) - moment().unix() < 0){
                        ResetTimer()
                    }else{
                        setDuration(parseInt(value) - moment().unix()) 
                        setLoading(false)
                        setStart(true)
                    }
                   
                }
            })
        },[])
        useEffect(() => {
            const subscription = AppState.addEventListener("change", nextAppState => {
              if (appState.current.match(/inactive|background/) && nextAppState === "active") {
                AsyncStorage.getItem(END_TIME).then((value) => {
                  
                 
                    if(value !== null){
                        setEndDuration(parseInt(value))
                        if(parseInt(value) - moment().unix() < 0){
                            ResetTimer()
                        }else{
                            setDuration(parseInt(value) - moment().unix()) 
                            setLoading(false)
                            setStart(true)
                        }
                       
                    }
                })
              }
        
              appState.current = nextAppState;
              setAppStateVisible(appState.current);
              
            });
        
            return () => {
              subscription.remove();
            };
          }, [duration]);

        const ResetTimer = async () => {
            await AsyncStorage.removeItem(END_TIME)
            setStart(false)
            setLoading(true)
            setDuration(0)
        }

        return (
            <SafeAreaView style={{flex:1, backgroundColor:colors.dark_primary_color}} >
                <StatusBar barStyle={"light-content"} />
                <View style={commonStyles.container} >
                    <CustomHeader 
                        show_backButton={true}
                        isdrawer={false}
                        onPress={() => navigation.goBack()}
                        title={"OnBoarding"}
                    />
                    <Swiptbutton 
                        title={"Start Timer"}
                        onPress={() => onStartTimer()}
                    />
                    {
                        !loading && 
                            <TimerView
                                duration={duration} 
                                start={start}
                                timeout_Function={() => ResetTimer()}
                            />
                    }
                    <Swiptbutton 
                        title={"Reset Timer"}
                        onPress={() => ResetTimer()}
                    />
                </View>
            </SafeAreaView>
            
        );
    };


export default OnBoardingScreen;

