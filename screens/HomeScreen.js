import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image, Linking, Share } from "react-native";
import {
    Icon,
    Layout,
    TopNavigation,
    BottomNavigation,
    BottomNavigationTab,
    Divider,
    Text,
    TopNavigationAction,
    OverflowMenu,
    MenuItem,
} from '@ui-kitten/components';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment'


export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: 0,
            menuVisible: false,
            data: [],
            album: []
        }
        this.album = []
        this.lang = "cn"
    }
    async componentDidMount() {

        await fetch("https://nepho.id/pondokpujian/api/album.php",
            {
                method: 'POST'
            }
        ).then((response) => response.json())
            .then((responseJson) => {
                this.data = responseJson
                this.shuffle(this.data)
                
            })

        this.lang = "cn"

        this.setState({ data: this.data }, () => {
            this.generateAlbumChinese()
        })

        await fetch("https://nepho.id/pondokpujian/api/sermon_bundle.php",
            {
                method: 'POST'
            }
        ).then((response) => response.json())
            .then((responseJson) => {
                this.datasermon = responseJson
                this.shuffle(this.datasermon)
                this.sermon = []
                for (let i = 0; i < this.datasermon.length; i++) {
                    this.sermon.push(
                        <View style={{ flex: 1, flexDirection: "row", padding: 5, margin: 5, }} key={Math.random()}>
                            <TouchableOpacity style={{ flex: 5 }} onPress={() => {
                                this.props.navigation.navigate("BundleSermon", {
                                    bundle_id: this.datasermon[i].bundle_id,
                                    bundle_title: this.datasermon[i].bundle_title,
                                    thumbnail: this.datasermon[i].thumbnail,
                                    preacher : this.datasermon[i].preacher,
                           
                                })
                            }}>
                                <Image onPress={() => { }} style={{ width: width / 2.5, height: width / 2.5, borderRadius: 10 }} source={{ uri: "https://nepho.id/pondokpujian/img/" + this.datasermon[i].thumbnail }} />
                            </TouchableOpacity>
                            <View style={{ flex: 5, flexWrap: "nowrap" }}>
                                <Text style={{ paddingTop: 40 }} category="h6" status="highempha">{this.datasermon[i].bundle_title}</Text>
                                <Text style={{}} category="p2" status="highempha">{this.datasermon[i].preacher}</Text>
                            </View>
                        </View>
                    )
        
                }
                this.setState({ sermon: this.sermon })
            })

    }
    generateAlbumChinese() {
        this.lang = "cn"
        this.album = []
        for (let i = 0; i < this.data.length; i++) {
            this.album.push(
                <View style={{ flex: 1, flexDirection: "row", padding: 5, margin: 5, }} key={Math.random()}>
                    <TouchableOpacity style={{ flex: 5 }} onPress={() => {
                        this.props.navigation.navigate("Album", {
                            album_id: this.data[i].album_id,
                            album_name: this.data[i].album_name,
                            thumbnail: this.data[i].thumbnail,
                            lang: "cn"
                        })
                    }}>
                        <Image onPress={() => { }} style={{ width: width / 2.5, height: width / 2.5, borderRadius: 10 }} source={{ uri: "https://nepho.id/pondokpujian/img/" + this.data[i].thumbnail }} />
                    </TouchableOpacity>
                    <View style={{ flex: 5, flexWrap: "nowrap" }}>
                        <Text style={{ paddingTop: 40 }} category="h6" status="highempha">{this.data[i].album_name}</Text>
                        <Text style={{}} category="p2" status="highempha">{this.data[i].author}</Text>
                    </View>
                </View>
            )

        }
        this.setState({ album: this.album })
    }
    generateAlbumEnglish() {
        this.lang = "en"
        this.album = []
        for (let i = 0; i < this.data.length; i++) {
            this.album.push(
                <View style={{ flex: 1, flexDirection: "row", padding: 5, margin: 5, }} key={Math.random()}>
                    <TouchableOpacity style={{ flex: 5 }} onPress={() => {
                        this.props.navigation.navigate("Album", {
                            album_id: this.data[i].album_id,
                            album_name: this.data[i].album_name_en,
                            thumbnail: this.data[i].thumbnail,
                            lang: "en"
                        })
                    }}>
                        <Image onPress={() => { }} style={{ width: width / 2.5, height: width / 2.5, borderRadius: 10 }} source={{ uri: "https://nepho.id/pondokpujian/img/" + this.data[i].thumbnail }} />
                    </TouchableOpacity>
                    <View style={{ flex: 5, flexWrap: "nowrap" }}>
                        <Text style={{ paddingTop: 40 }} category="h6" status="highempha">{this.data[i].album_name_en}</Text>
                        <Text style={{}} category="p2" status="highempha">{this.data[i].author_en}</Text>
                    </View>
                </View>
            )

        }
        this.setState({ album: this.album })

    }

    async Share() {

        this.message = 'Aplikasi Mobile Pondok Pujian\n\nSilahkan Download di https://play.google.com/store/apps/details?id=com.limpingen.pondokpujian'

        try {
            const result = await Share.share({
                message: this.message

            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    }
    shuffle(array) {
        let currentIndex = array.length;
        while (currentIndex != 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
    }
    _renderItem

    render() {
        const date = new Date()
        return (
            <SafeAreaView edges={['top', 'bottom']}   style={{ flex: 1, backgroundColor: "black" }}>
                <TopNavigation
                    alignment='center'
                    title='Pondok Pujian'
                    subtitle='Songs for the glory of God'
                    accessoryLeft={(props) => (
                        <React.Fragment>
                            <TouchableOpacity>
                                <Icon
                                    style={styles.icon}
                                    fill='#8F9BB3'
                                    name='home-outline'
                                />
                            </TouchableOpacity>
                        </React.Fragment>

                    )}
                    accessoryRight={(props) => (
                        <React.Fragment>
                            <OverflowMenu
                                anchor={(props) => (<TopNavigationAction
                                    icon={<Icon
                                        style={styles.icon}
                                        fill='#8F9BB3'
                                        name='globe-outline'
                                    />}
                                    onPress={() => {
                                        this.setState({ menuVisible: !this.state.menuVisible })
                                    }}
                                />)}
                                visible={this.state.menuVisible}
                                onBackdropPress={() => { this.setState({ menuVisible: !this.state.menuVisible }) }}
                            >
                                <MenuItem onPress={() => {
                                    this.setState({ menuVisible: !this.state.menuVisible })
                                    this.generateAlbumChinese()
                                }}
                                    title='Chinese'
                                />
                                <MenuItem onPress={() => {
                                    this.setState({ menuVisible: !this.state.menuVisible })
                                    this.generateAlbumEnglish()
                                }}
                                    title='English'
                                />
                            </OverflowMenu>
                            <View style={{ width: 5 }}></View>
                            <TouchableOpacity onPress={() => { this.Share() }}>
                                <Icon
                                    style={styles.icon}
                                    fill='#8F9BB3'
                                    name='share-outline'
                                />
                            </TouchableOpacity>
                        </React.Fragment>
                    )}
                />
                <Layout style={{ flex: 1 }}>
                    <Divider />
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Layout style={{ padding: 15 }}>
                            <View style={{ flex: 1, paddingTop: 10 }}>
                                <Text category="s1" style={{ textAlign: "center", fontSize: 14 }}>{moment().format('MMMM Do YYYY, h:mm:ss a')}</Text>
                            </View>
                            <View style={{ flex: 1, paddingBottom: 10 }}>
                                <Text style={{ textAlign: "center" }} category="h5">Welcome to Pondok Pujian</Text>
                            </View>
                            <Carousel
                                layout="default"
                                loop={true}
                                autoplayInterval={3500}
                                autoplay={true}
                                sliderWidth={width}
                                sliderHeight={width}
                                itemWidth={width - 110}
                                data={this.state.data}
                                renderItem={({ item, index }, parallaxProps) => {
                                    return (
                                        <TouchableOpacity onPress={() => {

                                            if (this.lang == "cn")
                                                this.album_name = item.album_name
                                            else if (this.lang == "en")
                                                this.album_name = item.album_name_en
                                            this.props.navigation.navigate("Album", {
                                                album_id: item.album_id,
                                                album_name: this.album_name,
                                                thumbnail: item.thumbnail,
                                                lang: this.lang
                                            })
                                        }} style={styles.item}>
                                            <ParallaxImage
                                                source={{ uri: "https://nepho.id/pondokpujian/img/" + item.thumbnail }}
                                                containerStyle={styles.imageContainer}
                                                style={styles.image}
                                                parallaxFactor={0.4}
                                                {...parallaxProps}
                                            />
                                        </TouchableOpacity>
                                    );
                                }}
                                hasParallaxImages={true}
                            />
                        </Layout>
                        {this.state.selectedIndex == 0 && (
                            <Layout level="4" style={{ paddingTop: 30, paddingLeft: 10 }}>
                                <Text style={{ marginLeft: 10 }} category="h5">Album</Text>
                                <View style={{ height: 30 }}></View>
                                {this.state.album}
                                <View style={{ height: 30 }}></View>
                            </Layout>)}
                        {this.state.selectedIndex == 1 && (
                            <Layout level="4" style={{ paddingTop: 30, paddingLeft: 10 }}>
                                <Text style={{ marginLeft: 10 }} category="h5">Sermon</Text>
                                <View style={{ height: 30 }}></View>
                                {this.state.sermon}
                                <View style={{ height: 30 }}></View>
                            </Layout>)}

                    </ScrollView >
                    <Divider />
                    <BottomNavigation
                        accessibilityIgnoresInvertColors={true}
                        selectedIndex={this.state.selectedIndex}
                        onSelect={async (index) => {
                            this.setState({ selectedIndex: index })
                        }}>
                        <BottomNavigationTab title={"Music"} icon={(props) => <Icon  {...props} name={'music-outline'} />} />
                        <BottomNavigationTab title={"Sermon"} icon={(props) => <Icon  {...props} name={'speaker-outline'} />} />
                    </BottomNavigation>
                </Layout >
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
    },
    icon: {
        width: 24,
        height: 24,
    },
    content: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {

    },
    item: {
        width: width - 120,
        height: width - 120,
    },
    imageContainer: {
        flex: 1,
        borderRadius: 8,
    },
    image: {
        width: width - 60,
        height: width - 60,
        resizeMode: 'contain',
    },
})