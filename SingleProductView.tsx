import React from 'react';
import { View, StyleSheet } from 'react-native';

import { ZMCameraView } from './CameraViewManager'; // Assuming this is your custom native module

// Sample values for the API token, lens ID, and group ID
const apiToken =
  "eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzMxOTMxMTYxLCJzdWIiOiJiY2JjYWZiYi1jMzQzLTQwZjYtYTEzMS0zMTQyNDg5MzRmMjB-U1RBR0lOR35hZjliZGRjOC04Y2IwLTRkMzQtOTZlZS1jNWNjYWQ0NGNlMzcifQ.ZNRJ5hmUI6titUTZLEi_A9jd8tKwyDQoBqG-w0ef3AU";
const lensId = "73916018-6dfd-42a4-892c-0affad447eb8";
const groupId = "5492a049-1f90-46cb-bbdb-082092ec55e9";


const SingleProductView = () => {
  return (
    <View style={styles.container}>
                <ZMCameraView
                  style={styles.cameraView}
                  singleLens = {true}
                  apiToken={apiToken}
                  lensId={lensId}
                  groupId={groupId}
                />
        
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    },
    cameraView: {
    flex: 1,
  },
});

export default SingleProductView;  // Ensure this is a default export
