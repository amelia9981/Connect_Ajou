import React, {useState, Component} from 'react';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';

export const Fonts=()=> Font.loadAsync({
    'Dancing': require('./Dancing.ttf'),
    'EBS훈민정음새론L': require('./EBS훈민정음새론L.ttf'),
    'EBS훈민정음새론R': require('./EBS훈민정음새론R.ttf'),
    'EBS훈민정음새론SB': require('./EBS훈민정음새론SB.ttf'),
    'IBMPlexSansKR-Light': require('./IBMPlexSansKR-Light.ttf'),
    'IBMPlexSansKR-Regular': require('./IBMPlexSansKR-Regular.ttf'),
    'Balloo2-SB':require('./Baloo2-SemiBold.ttf'),
    'Balloo2-R': require('./Baloo2-Regular.ttf'),

});
export default function(){
    const [fontLoad, setFontLoad] = useState(false);
    if(fontLoad){
        return;
    }
    else{
        return(
            <AppLoading
            startAsync ={Fonts}
            onFinish ={()=>setFontLoad(true)}
            />
        );
    }
}