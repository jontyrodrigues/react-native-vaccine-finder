import React, { useState } from 'react';
import { Linking, ActivityIndicator, Platform, Pressable, FlatList, Text,View } from 'react-native';
import MapView,{ Marker} from 'react-native-maps';
import openMap, { createMapLink, createOpenLink } from 'react-native-open-maps';
import styles from '../styles/styles'

export const DetailsScreenComponent = (props) => {

  const Slots = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
    const renderSlots = ({ item }) => (
        <Slots title={item} />
      );

   if(props.session_data != null){
      var lat = parseFloat(props.session_data.lat);
      var long = parseFloat(props.session_data.long);
      const [region,onRegionChange] = useState({
        region: {
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }});
    
        function openInMaps(){
          const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
          const latLng = `${lat},${long}`;
          const label = props.session_data.name;
          const url = Platform.select({
              ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
            });
          Linking.openURL(url);
        }
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <MapView style={styles.map} 
              initialRegion={{
                latitude: lat,
                longitude: long,
                latitudeDelta: 0.0027,
                longitudeDelta: 0.0012,
              }}
              region={region}
              onRegionChange={() => onRegionChange}
              >
              <Marker
                coordinate={{ latitude : lat , longitude : long}}
                title={props.name}
              />
            </MapView>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                        ? '#e2e2e2'
                        : '#e2e2e2',
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 5,
                      borderRadius: 5,
                      borderWidth: 2,
                      borderColor: "#04005e",
              },
              styles.wrapperCustom
            ]}
            onPress={() => {openInMaps()}
            
          }
          >
            {({ pressed }) => (
              <Text style = {{fontSize: 17, color: "#002060" ,justifyContent: "center",alignItems: "center",fontWeight: "700"}}>
                Open In Maps
              </Text>
            )}
          </Pressable>
        {props.slots !== null ?
         <FlatList
            style = {{marginTop: 30}}
            data={props.slots.slots}
            keyExtractor={(item) => item}
            renderItem={renderSlots}
          />
        : <ActivityIndicator>
          </ActivityIndicator>}
        </View>
      );
    }
    else return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>
            {
              "Sorry Map Data is Unavailable"
            }
          </Text>
          <FlatList
            style = {{marginTop: 30, width: "100%"}}
            data={props.slots.slots}
            keyExtractor={(item) => item}
            renderItem={renderSlots}
          />
        </View>
    )
    if(props.slots != null){
     
    }
}