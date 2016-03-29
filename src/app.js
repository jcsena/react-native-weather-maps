//@flow

import React,{ Component, AppRegistry, StyleSheet, View, Text } from 'react-native';
import MapView from 'react-native-maps';
import Apis from './api';

type Coor = { latitude: number, longitude: number, latitudeDelta: number, longitudeDelta: number };

class weather extends Component {

    state: Object;

    constructor(){

        super();

        var initialRegion : Coor = {
            longitudeDelta: 0.07106781773516957,
            latitude: 9.032978516935259,
            longitude: -79.49107502314355,
            latitudeDelta: 0.1213852293936881
        };

        this.state = { region: initialRegion } ;
        this.onRegionChangeComplete(initialRegion);

    }

    onRegionChangeComplete(region: Coor): void{
        this.setState( { region: region });
        Apis.apiWeather(region.latitude, region.longitude)
        .then((data) => this.setState(data))
        .catch((err) => console.log(err))
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                style={styles.map}
                region={this.state.region}
                onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}>
                    <MapView.Marker
                        coordinate={this.state.region}
                        title="Is't my region"
                        description="ILPANAMA"
                    />
                </MapView>
                <View style={styles.viewWrapper}>
                    <View style={[styles.bgCity, styles.textWrapper]}>
                        <Text style={styles.text}>
                            {this.state.city}
                        </Text>
                    </View>
                    <View style={[styles.bgTemp, styles.textWrapper]}>
                        <Text style={styles.text}>
                            {this.state.temp}
                        </Text>
                    </View>
                    <View style={[styles.bgDesc, styles.textWrapper]}>
                        <Text style={styles.text}>
                            {this.state.description}
                        </Text>
                    </View>
                </View>


            </View>

        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    map: {
        flex: 4
    },
    viewWrapper: {
        flex: 2,
    },
    textWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    bgCity:{
        flex: 1,
        backgroundColor: '#00b2f4'
    },
    bgTemp:{
        backgroundColor: '#152b39'
    },
    bgDesc:{
        backgroundColor: '#18bc9c'
    },
    text: {
        fontSize: 40,
        color: '#ffffff',
        fontWeight:'500'
    }
});

export default weather;
