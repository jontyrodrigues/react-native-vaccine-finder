#react native vaccine finder

This app uses react native framework and the cowin api from the govt of india to provide real time vaccine information for various districts.
This app also used openmap API to get geocoding data for the latitude and longitude data of various pincode, why this is done will be explained below.


#features

Search for centers in a specific district at a specific date
Filter according to age, vaccine, availability of dose
Search for plain text in name, address and pincode of center.
Find Location of a given center on google map

#coming soon 

Set reminder for vaccine slot availability
Search nearby centers

#location issue 

By default in the findbydistrict endpoint you get latitude and longitude data but it is wrong. A more accurate result is found in the findbylonglat api endpoint but I have seen many inaccuracies in that as well. My approach isn't any better it justs find the base latitude and longitude of a pincode and then tries to call the findbylonglat api endpoint which hopefully should give the latitude and longitude data but unfortunatly some of the data is still inaccurate. 
Another approach would be to get the latitude and longitude by geocoding the name and address of the centers which would work but still there are inaccuracies. 
The method i have used is temperory as i am testing and might use some other method

#how to clone and install

Requirements
git
nodejs
react native

```console
git clone https://github.com/jontyrodrigues/react-native-vaccine-finder.git
```
```console 
cd react-native-vaccine-finder
```
```console
npm install --save
```
This installs all the depedencies
```console
expo start
```
This starts a development server and you can use the expo go app to test the app before building
Then to build use
```console
expo build:android
```
Enter all your details and then your app should be available on expo's website after the build has finised
