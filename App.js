import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import * as tf from "@tensorflow/tfjs";
import "./platform_react_native";
import { Camera, CameraType } from "expo-camera";
import Button from "./components/Buttons";

export default function App() {
  const [permission, setPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync(null);
        setImage(data.uri);
        await tf.ready();
        const model = await tf.loadLayersModel(
          "https://storage.googleapis.com/tm-model/beHhU_1vW/model.json"
        );
        console.log(model.summary());
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}></Camera>
      <View>
        <Button title={"Capture Building"} icon="camera" onPress={takePhoto} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    paddingBottom: 20,
  },
  camera: {
    flex: 1,
    borderRadius: 20,
  },
});
