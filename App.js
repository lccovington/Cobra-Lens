import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import * as tf from '@tensorflow/tfjs';
import * as jpeg from 'jpeg-js';
import "./platform_react_native";
import { Camera, CameraType } from "expo-camera";
import Button from "./components/Buttons";
import ClassBanner from "./components/Banner";
import { Base64Binary } from './utils/utils';
import * as ImageManipulator from 'expo-image-manipulator';

export default function App() {
  const [permission, setPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [predictedClass, setPredictedClass] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const cameraRef = useRef(null);
  const BITMAP_DIMENSION = 224;
  const RESULT_MAPPING = ['bell-tower', 'davidson', 'gym', 'library', 'student-center'];
  

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const cropPicture = async (imageData) => {
    try {
      const { uri, width, height } = imageData;
      const actions = [
        {
          resize: {
            width: BITMAP_DIMENSION,
            height: BITMAP_DIMENSION,
          },
        },
      ];
      const saveOptions = {
        compress: 1,
        format: ImageManipulator.SaveFormat.JPEG,
        base64: true,
      };
      return await ImageManipulator.manipulateAsync(uri, actions, saveOptions);
    } catch (error) {
      console.log('Could not crop & resize photo', error);
    }
  };

const imageToTensor = async (image) => {
    try {
      const uIntArray = Base64Binary.decode(image);
      const { width, height, data } = jpeg.decode(uIntArray, {useTArray: true});
      const buffer = new Uint8Array(width * height * 3);
      let offset = 0;  // offset into original data
      for (let i = 0; i < buffer.length; i += 3) {
        buffer[i] = data[offset];
        buffer[i + 1] = data[offset + 1];
        buffer[i + 2] = data[offset + 2];
    
        offset += 4;

        const tempTensor = tf.tensor4d(buffer,[1, 224, 224, 3]);

        return tempTensor;
      }
    } catch (error) {
      console.log('Could Not Convert to Tensor', error);
    }
  };

  const classifyImage = async (model, imageData) => {
    try {
      const croppedData = await cropPicture(imageData);
      const tensor = await imageToTensor(croppedData.base64);
      const predictClasses = model.predict(tensor);
      const classArray = predictClasses.dataSync();

      const predictedClass = classArray.indexOf(
        Math.max.apply(null, classArray),
      );
      setPredictedClass(RESULT_MAPPING[predictedClass]);
      console.log("Predicted Class:", RESULT_MAPPING[predictedClass])
    } catch (error) {
      console.log(error);
    }

  }

  const takePhoto = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync({ base64: true });
        setImage(data.uri);
        await tf.ready();
        const model = await tf.loadLayersModel(
          'https://storage.googleapis.com/tm-model/beHhU_1vW/model.json'
        );

        await classifyImage(model, data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      {predictedClass == null ? null : <ClassBanner class={predictedClass} />}
      <Camera style={styles.camera} type={type} ref={cameraRef}></Camera>
      <View>
        
        <Button title={"Capture Building"} icon="camera" onPress={takePhoto} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
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
