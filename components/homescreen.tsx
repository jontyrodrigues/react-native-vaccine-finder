import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView,TextInput,Platform, Pressable, FlatList, Text, Switch ,View , TouchableOpacity} from 'react-native';
import {Picker, PickerIOS} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../styles/styles'
import open from 'react-native-open-maps';

let session_data;
let slots;

export const HomeScreenComponent = (props) => {

  const openMapsApiKey = 'YOUR_API_KEY';

  const Item = ({ item , onPress, backgroundColor, textColor}) => (
    <TouchableOpacity onPress={onPress}>
      <Text style = {[styles.item]}>
        <Text style={[styles.title]}>{item.name} {"\n"}</Text>
        <View style={{display: "flex", flexDirection: "row"}}>
          <Text style={[{color: "#2e2e2e"},styles.vaccine]}>{item.vaccine}</Text>
          <Text style={[{color: "#c20505"},styles.vaccine]}>{" "}{item.min_age_limit}{"+"}</Text>
          <Text style={[styles.dose]}>{" D1: "}{item.available_capacity_dose1}</Text>
          <Text style={[styles.dose]}>{" D2: "}{item.available_capacity_dose2}</Text>
          <Text style={[styles.dose]}>{" Fee: "}{item.fee}</Text>
        </View>
        <Text style={[styles.dose]}>{"\n"}{"Pincode: "}{item.pincode}</Text>
        <Text style={[styles.dose]}>{"\n"}{"Address: "}{item.address}</Text>
      </Text>
    </TouchableOpacity>
  );

  const [isLoading, setLoading] = useState(true);
  const [isLoadingList,setLoadingList] = useState(false);
  const [isInitialLoad,setInitialLoad] = useState(true);
  const [hasGotData,setHasGotData] = useState(false);
  const [data, setData] = useState([]);
  const [data_district,setDataDistrict] = useState([]);
  const [isLoadingDistrict, setLoadingDistrict] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [centerDate, setCenterData] = useState();

  const today = new Date;

  const [date, setDate] = useState(new Date(today.getTime()));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  let FFP, EP, CVS, CV, Free, Paid;

  const [isEnabled18, setIsEnabled18] = useState(true);
  const toggleSwitch18 = () => {setIsEnabled18(previousState => !previousState);

  }

  const [isEnabled45, setIsEnabled45] = useState(true);
  const toggleSwitch45 = () => {setIsEnabled45(previousState => !previousState);
   
  }

  const [isEnabledCovishield, setIsEnabledCovishield] = useState(true);
  const toggleSwitchCovishield = () => {setIsEnabledCovishield(previousState => !previousState);
  
  }

  const [isEnabledCovaxin, setIsEnabledCovaxin] = useState(true);
  const toggleSwitchCovaxin = () => {setIsEnabledCovaxin(previousState => !previousState);
    
  }

  const [isEnableddose1, setIsEnableddose1] = useState(true);
  const toggleSwitchdose1 = () => {setIsEnableddose1(previousState => !previousState);
  
  }

  const [isEnableddose2, setIsEnableddose2] = useState(true);
  const toggleSwitchdose2 = () => {setIsEnableddose2(previousState => !previousState);
    
  }

  const [isEnabledFree, setIsEnabledFree] = useState(true);
  const toggleSwitchFree = () => {setIsEnabledFree(previousState => !previousState);
    
  }
  const [isEnabledPaid, setIsEnabledPaid] = useState(true);
  const toggleSwitchPaid = () => {setIsEnabledPaid(previousState => !previousState);
    
  }
  // Date Functions 
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const [text, onChangeText] = useState("");
  const [selectedId, setSelectedId] = useState(null);


  const pressed_center =  (id,pincode,district) => {
    setLoadingList(true);
    let lat, lng;
    fetch('http://open.mapquestapi.com/geocoding/v1/address?key='+openMapsApiKey+'&location='+pincode+','+district+',india',{
      method: 'GET',
      mode: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent':'Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion'
      },
      referrerPolicy: 'same-origin'
    })
      .then((response) => response.json())
      .then((response) => {
        decode(response)})
      .catch((error) => console.error(error));
      //.finally(() => console.log(session_data));


      async function decode(response){
        lat = response.results[0].locations[0].latLng.lat;
        lng = response.results[0].locations[0].latLng.lng;
        fetch('https://cdn-api.co-vin.in/api/v2/appointment/centers/public/findByLatLong?lat='+lat+'&long='+lng,{
        method: 'GET',
        mode: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent':'Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion'
        },
        referrerPolicy: 'same-origin'
      })
        .then((response) => response.json())
        .then((response) => {
          session_data = response.centers.find(element => element.center_id == id);
          slots = centerDate.find(element => element.center_id == id);
        })
        .catch((error) => console.error(error))
        .finally(() => {
          props.navigation.navigate("Details", 
        {session_data : session_data,
        slots : slots});
        setLoadingList(false);
        });
      }

  }

  const renderItem = ({ item }) => {
    const backgroundColor = item.session_id === selectedId ? "#e8e8e8" : "a8a8a8";
    const color = item.session_id === selectedId ? 'black' : 'black';
    isEnabled45 === true ? FFP = 45 : FFP = false
    isEnabled18 === true ? EP = 18 : EP = false
    isEnabledCovishield === true ? CVS = "COVISHIELD" : CVS = false
    isEnabledCovaxin === true ? CV = "COVAXIN" : CV = false
    isEnabledFree === true ? Free = "Free" : Free = false
    isEnabledPaid === true ? Paid = "Paid" : Paid = false

    if((item.name.search('WORK') !== -1 || item.name.search('Workplace') !== -1 || item.name.search('WP') !== -1 || item.name.search('PLACE') !== -1))
    {
      return;
    }
    if ((text === "" || 
    (item.name.includes(text) || item.pincode.toString().includes(text)
    || item.address.includes(text))) &&
      (item.min_age_limit === FFP || item.min_age_limit === EP )
      && (item.vaccine === CVS || item.vaccine === CV)
      && ((item.available_capacity_dose1 > 0 && isEnableddose1)|| 
      (item.available_capacity_dose2 > 0 && isEnableddose2)) &&
      (item.fee_type === Free || item.fee_type === Paid)
      )
     { return (
      <Item
        item={item}
        onPress={() => {setSelectedId(item.session_id),pressed_center(item.center_id,item.pincode,item.district_name)}}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
    }else{
      return null;
    }
  };
  const searchForText = (text) =>{
    //center_data.sessions.find(element => element.name.includes(""))
    
  }

  const copy = () => {
    //data.states.forEach(element => states.push({label:element.state_name, value: element.state_id}))
  }
  const getData = (district,selectedDate) => {
    var thisDate = date.getDate()+"-"+(date.getUTCMonth()+1)+"-"+date.getUTCFullYear();
    onChangeText("");
    fetch('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id='+district.selectedDistrict+'&date='+thisDate,{
      method: 'GET',
      mode: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent':'Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion'
      },
      referrerPolicy: 'same-origin'
    })
      .then((response) => response.json())
      .then((json) => setCenterData(json.sessions))
      .catch((error) => console.error(error))
      .finally(() => {setLoadingList(false),
      copy()});
  }

  const selectDistrict = (state_id) => {
    fetch('https://cdn-api.co-vin.in/api/v2/admin/location/districts/'+state_id,{
      method: 'GET',
      mode: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent':'Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion'
      },
      referrerPolicy: 'same-origin'
    })
      .then((response) => response.json())
      .then((json) => setDataDistrict(json.districts))
      .catch((error) => console.error(error))
      .finally(() => setLoadingDistrict(false));
  }

  useEffect(() => {
    fetch('https://cdn-api.co-vin.in/api/v2/admin/location/states',{
      method: 'GET',
      mode: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent':'Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion'
      },
      referrerPolicy: 'same-origin'
    })
      .then((response) => response.json())
      .then((json) => setData(json.states))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
      setInitialLoad(false);
  },[]);


  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator/> : (
        <Picker
        style = {styles.picker}
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) =>{setSelectedLanguage(itemValue),
          selectDistrict(itemValue)}
          }
          >
          {data.map((item,key)=> 
          <Item label = {item.state_name} value = {item.state_id} key = {key}/>
        )}
      </Picker> 
      )}
      {isLoadingDistrict ? <ActivityIndicator/> : (
        <Picker
        style = {styles.picker}
        selectedValue={selectedDistrict}
        onValueChange={(itemValue, itemIndex) =>{setSelectedDistrict(itemValue)}
          }
        >
            {data_district.map((item,key)=>
          <Item label = {item.district_name} value = {item.district_id} key = {key}/>
        )}
      </Picker>
      )}
      {isLoadingDistrict ? <ActivityIndicator/> : (
      <View>
        <View>
            <View>
              <Pressable onPress={showDatepicker}
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
              ]}>
                {
                  <Text style = {{fontSize: 17, color: "#002060" ,justifyContent: "center",alignItems: "center",fontWeight: "700"}}>
                  {date.getDate()+"-"+(date.getUTCMonth()+1)+"-"+date.getUTCFullYear()}
                  </Text>
                }
              </Pressable>
            </View>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
        </View>
      </View>
      )}
        {isLoadingDistrict ? <ActivityIndicator/> : (
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
        onPress={() => {getData({selectedDistrict},date),setHasGotData(true)}
        
      }
      >
        {({ pressed }) => (
          <Text style = {{fontSize: 17, color: "#002060" ,justifyContent: "center",alignItems: "center",fontWeight: "700"}}>
            Search
          </Text>
        )}
      </Pressable>)
      }{
        hasGotData ? 
        <View>
          <View style = {{display: "flex", flexDirection: "row", alignItems: "center", padding: 5,}}>
            <View style = {styles.flexbox}>
              <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled18 ? "#3166eb" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch18}
              value={isEnabled18}
              />
              <Text style = {styles.switchText}>
                18+
              </Text>
              <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled45 ? "#3166eb" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch45}
              value={isEnabled45}
              />
              <Text style = {styles.switchText}>
                45+
              </Text>
            </View>
            <View style = {styles.flexbox}>
              <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnableddose1 ? "#3166eb" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchdose1}
              value={isEnableddose1}
              />
              <Text style = {styles.switchText}>
                Dose 1
              </Text>
              <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnableddose2 ? "#3166eb" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchdose2}
              value={isEnableddose2}
              />
              <Text style = {styles.switchText}>
                Dose 2
              </Text>
            </View>
          </View>
          <View style = {{display: "flex", flexDirection: "row", alignItems: "center", padding: 5,}}>
           <View style = {styles.flexbox}>
            <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabledCovishield ? "#3166eb" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchCovishield}
            value={isEnabledCovishield}
            />
            <Text style = {styles.switchText}>
              Covishield
            </Text>
            <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabledCovaxin ? "#3166eb" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchCovaxin}
            value={isEnabledCovaxin}
            />
            <Text style = {styles.switchText}>
              Covaxin
            </Text>
           </View>
           <View style = {styles.flexbox}>
            <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabledFree ? "#3166eb" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchFree}
            value={isEnabledFree}
            />
            <Text style = {styles.switchText}>
              Free
            </Text>
            <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabledPaid ? "#3166eb" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchPaid}
            value={isEnabledPaid}
            />
            <Text style = {styles.switchText}>
              Paid
            </Text>
           </View>
          </View>
          <SafeAreaView>
           <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="Search Here"/>
           </SafeAreaView>
        </View>
     :
      <ActivityIndicator/>
      }
      {isLoadingList ? <ActivityIndicator size="large" color="#000747"/> :(
        <FlatList
        style = {{marginTop: 30}}
        data={centerDate}
        keyExtractor={(item) => item.session_id}
        renderItem={renderItem}
        extraData={selectedId}
      />
      )}
    </View>
  );
}