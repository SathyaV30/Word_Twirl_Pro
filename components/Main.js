import React, { useState, useRef, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import Rules from "./Rules";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { playButtonSound } from '../AudioHelper';
import { FontAwesome } from '@expo/vector-icons';
import SoundContext from '../SoundContext';
import GradientContext from "../GradientContext";
import { scaledSize } from "../ScalingUtility";
const { width, height } = Dimensions.get("window");

//Main menu screen
export default function Main({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { isSoundMuted, setIsSoundMuted, isMusicMuted, setIsMusicMuted } = useContext(SoundContext);
  const {gradientColors} = useContext(GradientContext)

  
  return (
    <LinearGradient colors={gradientColors} style={styles.container}>
      <View style={[styles.overlayContainer, { zIndex: 1 }]}>
        <Text style={styles.titleText}>Word Twirl</Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {navigation.navigate("Start Screen"); playButtonSound(isSoundMuted)}}
          >
            <BlurView intensity={50} tint="light" style={styles.glassButton}>
              <Text style={styles.buttonText}>Start</Text>
            </BlurView>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {setModalVisible(true);playButtonSound(isSoundMuted)}}
          >
            <BlurView intensity={50} tint="light" style={styles.glassButton}>
              <Text style={styles.buttonText}>Rules</Text>
            </BlurView>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>{navigation.navigate("Stats"); playButtonSound(isSoundMuted)}}
          >
            <BlurView intensity={50} tint="light" style={styles.glassButton}>
              <Text style={styles.buttonText}>Stats</Text>
            </BlurView>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>{navigation.navigate("StylesScreen"); playButtonSound(isSoundMuted)}}
          >
            <BlurView intensity={50} tint="light" style={styles.glassButton}>
              <Text style={styles.buttonText}>Styles</Text>
            </BlurView>
          </TouchableOpacity>
         
  
          <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.iconButtonContainer} onPress={() => {
            setIsSoundMuted(!isSoundMuted);
            playButtonSound(isSoundMuted); 
        }}>
            <BlurView intensity={50} tint="light" style={[styles.glassButton, styles.iconGlassButton]}>
                <FontAwesome name={isSoundMuted ? 'volume-off' : 'volume-up'} size={scaledSize(38)}color={isSoundMuted ? 'gray' : '#fff'} />
            </BlurView>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButtonContainer} onPress={() => {
            setIsMusicMuted(!isMusicMuted);
            playButtonSound(isSoundMuted); 
        }}>
            <BlurView intensity={50} tint="light" style={[styles.glassButton, styles.iconGlassButton]}>
                <FontAwesome name={isMusicMuted ? 'music' : 'music'} size={scaledSize(38)} color={isMusicMuted ? 'gray' : '#fff'} />
            </BlurView>
        </TouchableOpacity>
    </View>

        </View>
      </View>




      <Rules modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </LinearGradient>
  );
}
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: scaledSize(16),
  },
  overlayContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  letterRow: {
    flexDirection: "row",
    height: scaledSize(height / 10),
    alignItems: "center",
  },
  letter: {
    fontSize: scaledSize(60),
    color: "rgba(255,255,255,0.25)",
    opacity: 0.5,
    fontFamily: "ComicSerifPro",
  },
  titleText: {
    fontFamily: "ComicSerifPro",
    fontSize: scaledSize(65),
    marginTop: scaledSize(100),
    color: "#fff",
    textShadowOffset: { width: scaledSize(2), height: scaledSize(2) },
    textShadowRadius: scaledSize(3),
    textShadowColor: "#333",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flex: 1,
  },
  button: {
    height: scaledSize(80),
    borderRadius: scaledSize(15),
    minWidth: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: scaledSize(25),
  },
  glassButton: {
    height: '100%',
    borderRadius: scaledSize(15),
    minWidth: "84.2%",
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: scaledSize(1),
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "ComicSerifPro",
    color: "#fff",
    fontSize: scaledSize(40),
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: '84.2%', 
    marginBottom: scaledSize(25),
  },
  iconButtonContainer: {
    flex: 1,
    height: scaledSize(80),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 0,  
  },
  iconGlassButton: {
    width: '100%', 
    height: '100%',
    padding: scaledSize(18),
    borderRadius: scaledSize(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
});



