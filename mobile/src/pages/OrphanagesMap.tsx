import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import mapMarker from '../images/map-marker.png';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap() {
  const navigation = useNavigation();

  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useFocusEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data)
    })
  })

  function handleNavigationToOrphanageDatails(id: number) {
    navigation.navigate('OrphanageDetails', {id})
  }

  function handleNavigationToCreateOrphanage() {
    navigation.navigate('SelectMapPosition')
  }

  return (
    <View style={styles.container}>
    <MapView 
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion= {{
        latitude: -3.7386361,
        longitude: -38.6005319,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
      }}
    >
      {orphanages.map(orphanage => {
        return (
          <Marker
            key={orphanage.id}
            icon={mapMarker}
            coordinate={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
            }}
            calloutAnchor= {{
              x: 2.4,
              y: 0.8
            }}
          >
            <Callout tooltip onPress={() => handleNavigationToOrphanageDatails(orphanage.id)}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText} >{orphanage.name}</Text>
              </View>
            </Callout>
          </Marker>
        )
      })}
    </MapView>

    <View style={styles.footer}>
      <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>

      <RectButton 
        style={styles.createOrphanegeButton} 
        onPress={handleNavigationToCreateOrphanage}
      >
        <Feather name='plus' size={20} color="#fff" />
      </RectButton>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  calloutContainer: {
    width: 168,
    height: 46,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 16,
    borderRadius: 16,
    justifyContent: 'center',
    elevation: 6,

  },

  calloutText: {
    color: '#0089a5',
    fontSize: 14,
    fontFamily: 'Nunito_700Bold'
  },

  footer: {
    position: 'absolute',
    right: 24,
    left: 24,
    bottom: 32,
    height: 56,
    backgroundColor: '#fff',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 24,
    elevation: 6,
  },

  footerText: {
    flex: 1,
    color: '#8fa7b3',
    fontFamily: 'Nunito_700Bold'
  },

  createOrphanegeButton: {
    backgroundColor: '#15c3d6',
    height: 56,
    width: 56,
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
  }
});