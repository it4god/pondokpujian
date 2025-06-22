import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  Platform,
  View,
  Image,
  Dimensions, TouchableOpacity,
} from "react-native";
import { Layout, TopNavigation, toggleMenu, Toggle, Divider, Button, Card, Menu as UKMenu, Modal, TopNavigationAction, Icon, Text, OverflowMenu, Tab, TabView, Avatar, MenuItem } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import Share from 'react-native-share';
import styles from '../common/style1'
const WindowWidth = Dimensions.get('window').width;
import { SafeAreaView } from 'react-native-safe-area-context';
class AlbumScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      thumb_detail: false,
      selectedIndex: 0,
      menuvisible1: false,
      menuVisible: false,
      menuresetplay: false,
      descriptiontextshown: false,
      moredescription : false

    };
    this.content_completed = false;
  }
  componentDidMount = () => {
    this.album_id = this.props.route.params.album_id
    this.title = this.props.route.params.album_name
    this.thumbnail = this.props.route.params.thumbnail
    this.lang = this.props.route.params.lang
    this.subs = this.props.navigation.addListener("focus", () => {

    }
    );

    this.album = [];
    this.SetContentAndSession(this.album_id, this.lang)
    this.setState({ thumb_detail: true })
  };
  componentWillUnmount() {
    this._isMounted = false;
  }
  MoveToContentScreen(content_id) {

    const { push } = this.props.navigation;
    push("ContentScreen", {
      content_id: content_id
    });
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
        <TopNavigation style={{}}
          title={this.title}
          alignment='start'
          accessoryLeft={(props) => (
            <TopNavigationAction
              {...props}
              icon={(props) => <Icon {...props} name={'arrow-ios-back-outline'} />}
              onPress={() => {
                this.props.navigation.pop();
              }} />
          )}
          accessoryRight={(props) => (
            <React.Fragment>
              <OverflowMenu
                anchor={(props) => (<TopNavigationAction
                  icon={<Icon
                    style={{ width: 24, height: 24 }}
                    fill='#8F9BB3'
                    name='globe-outline'
                  />}
                  onPress={() => {
                    this.setState({ menuVisible: !this.state.menuVisible })
                  }}
                />)}
                visible={this.state.menuVisible}
                onBackdropPress={toggleMenu}
              >
                <MenuItem onPress={() => {
                  this.setState({ menuVisible: !this.state.menuVisible })
                  this.SetContentAndSession(this.album_id, "cn")
                  this.lang = "cn"

                }}
                  title='Chinese'
                />
                <MenuItem onPress={() => {
                  this.setState({ menuVisible: !this.state.menuVisible })
                  this.SetContentAndSession(this.album_id, "en")
                  this.lang = "en"
                }}
                  title='English'
                />
              </OverflowMenu>
              <View style={{ width: 5 }}></View>
              <TouchableOpacity onPress={() => { this.Share() }}>
                <Icon
                  style={{ width: 24, height: 24 }}
                  fill='#8F9BB3'
                  name='share-outline'
                />
              </TouchableOpacity>
            </React.Fragment>
          )}
        />
        <Modal
          visible={this.state.menuresetplay}
          backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onBackdropPress={() => { this.setState({ menuresetplay: true }); this.setState({ menuresetplay: false, }) }}>

          <Layout style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'stretch', margin: 15, padding: 15 }}>

            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                style={{
                  textAlign: "center", fontWeight: 'bold', paddingLeft: 5, fontSize: 20
                }}
              >Pilihan : </Text>
            </View>
            <View style={{ flexDirection: "row", paddingTop: 15, justifyContent: "center", alignItems: "center" }}>
              <Button status="primary" onPress={() => { this.setState({ menuresetplay: false }); }}>
                <Text style={{ color: '#FFF' }}>Batal</Text>
              </Button>
              <Text>{" "}</Text>
              <Button status="primary" onPress={() => { this.setState({ menuresetplay: false }); this.ClearData(this.album_id) }}>
                <Text style={{ color: '#FFF' }}>Clear Data</Text>
              </Button><Text>{" "}</Text>
              <Button status="primary" onPress={() => { this.setState({ menuresetplay: false }); this.Mulai(this.song_id) }}>
                <Text style={{ color: '#FFF' }}>Mulai</Text>
              </Button>
            </View>
          </Layout>
        </Modal>
        <Layout style={{ flex: 1 }}>
          <ScrollView>
            <Image style={{ width: WindowWidth, height: WindowWidth }} source={{ uri: "https://nepho.id/pondokpujian/img/" + this.thumbnail }} />
            <View>
              <View style={styles.content_container}>
                <Text style={styles.content_title_text} category="h4" status="highempha" numberOfLines={3} ellipsizeMode={"head"}>
                  {this.title}
                </Text>
                <Button style={styles.content_subscribe_button} onPress={() => {
                  this.props.navigation.navigate("Audio", {
                    album_id: this.album_id,
                    lang: this.lang,
                    position: 0
                  })

                }}>
                  <Text style={{ color: "#FFF" }} category="button-xl-semibold" status="primary">
                    Listen
                  </Text>
                </Button>
              </View>
              <View style={{ flexWrap: "wrap", flexDirection: "row",marginHorizontal:10, marginBottom:15 }}>
                  <Text onTextLayout={(e) => {
                    if (e.nativeEvent.lines.length >= 3)
                      this.setState({ moredescription: true })
                    else
                      this.setState({ moredescription: false })
                  }} numberOfLines={this.state.descriptiontextshown ? undefined : 4} category="p2" style={{ color: "#BAC3CE" }} >{this.Description}</Text>
                  {
                    this.state.moredescription ? <Text
                      onPress={() => { this.setState({ descriptiontextshown: !this.state.descriptiontextshown }) }}
                      style={{ color: "#3366FF",}} category="p2">{this.state.descriptiontextshown ? "Read Less" : "Read More" }</Text>
                      : null
                  }
                </View>
                <Divider/>
            </View>
            <View style={styles.content_container}>
              <View style={styles.content_attribute_grouper}>
                <View style={styles.content_attribute_container}>
                  <Icon style={styles.content_attribute_icon} fill={eva['dark']['color-warning-500']} name='star' />
                  <Text style={styles.content_attribute_text} category="label-m-regular" status="highempha">
                    5.0
                  </Text>
                </View>
                <View style={styles.content_attribute_container}>
                  <Icon style={styles.content_attribute_icon} fill="#FFF" name='globe-outline' />
                  <Text style={styles.content_attribute_text} category="label-m-regular" status="highempha">
                    Chinese Song
                  </Text>
                </View>
                <View style={styles.content_attribute_container}>
                  <Icon style={styles.content_attribute_icon} fill="#FFF" name='people-outline' />
                  <Text style={styles.content_attribute_text} category="label-m-regular" status="highempha">
                    1000+
                  </Text>
                </View>
                <View style={styles.content_attribute_container}>
                  <Icon style={styles.content_attribute_icon} fill={eva['dark']['color-primary-600']} name='lock-outline' />
                  <Text style={styles.content_attribute_text} category="label-m-regular" status="primary_dark">
                    Premium
                  </Text>
                </View>
              </View>
            </View>
            <Divider />
            <Layout>
              <TabView
                swipeEnabled={false}
                style={{ marginVertical: 15, }}
                selectedIndex={this.state.selectedIndex}
                onSelect={index => this.setState({ selectedIndex: index })}>
                <Tab title="Song">
                  <View style={{ paddingLeft: 5, paddingTop: 5 }}>
                    <Text >TOTAL : {this.total_session} Song</Text>
                    <View style={{ margin: 15 }}>
                      {this.state.content}
                    </View>

                  </View>
                </Tab>
                <Tab title="Artist">
                  <View style={styles.content_tabview_container}>
                    <View style={{ height: 30 }}></View>
                    <Text category="h6" status="highempha">Artist</Text>
                    <View style={styles.content_author_container}>
                      <Avatar style={styles.content_author_avatar} size="large" source={require('../assets/images/thumb/profile.jpg')} />
                      <View style={styles.content_author_desc_container}>
                        <Text category="h5" status="highempha">林美耘</Text>
                        <Text category="p2" status="highempha"></Text>
                      </View>
                    </View>


                  </View>
                </Tab>
              </TabView>
            </Layout>
            <View style={{ height: 10 }}></View>
          </ScrollView>
        </Layout>
      </SafeAreaView>

    );
  }
  async SetContentAndSession(album_id, lang) {
    this.content = []
    await fetch("https://nepho.id/pondokpujian/api/album.php?album_id=" + album_id)
      .then((response) => response.json())
      .then(async (responseJson) => {

        let lc = responseJson;
        if(lang=="cn")
        {
          this.title = lc[0].album_name
          this.Description = lc[0].album_desc
        }
        else if(lang=="en")
        {
          this.title = lc[0].album_name_en
          this.Description =lc[0].album_desc_en
        }
        this.thumb = "https://nepho.id/pondokpujian/img/" + album_id + ".jpg"
        await fetch("https://nepho.id/pondokpujian/api/song.php?album_id=" + album_id)
          .then((response) => response.json())
          .then((responseJson) => {
            let ls = responseJson;
            for (let i = 0; i < ls.length; i++)
              this.content.push(
                <TouchableOpacity style={{ padding: 10 }} key={Math.random()} onLongPress={() => {
                  this.song_id = ls[i].song_id;
                  this.position = Number(i)

                }} onPress={() => {
                  this.album_id = album_id;
                  this.position = Number(i)
                  this.props.navigation.navigate("Audio", {
                    album_id: this.album_id,
                    lang: this.lang,
                    position: this.position
                  })

                }}>
                  <View style={{ flex: 1, flexDirection: "row", marginHorizontal: 10, marginBottom: 10 }}>
                    {lang == "en" && (<Text style={{ flex: 7 }} category="subtitle-s-regular" status="highempha">{(i + 1).toString()}. {ls[i].song_title_en}</Text>)}
                    {lang == "cn" && (<Text style={{ flex: 7 }} category="subtitle-s-regular" status="highempha">{(i + 1).toString()}. {ls[i].song_title}</Text>)}
                    <View style={{ flex: 3 }}>
                      <Text style={{ textAlign: "right", color: "gray" }} category="label-m-regular" status="lowempha">{ls[i].duration} m</Text>
                    </View>
                  </View>
                  <Divider />
                </TouchableOpacity>
              )
            this.setState({ isLoading: true, content: this.content })
            this.total_session = ls.length
          })

        this.setState({ isLoading: true, })

      })


  }





  ClickAuthor(data, props) {
    alert(data)
  }
  Mulai() {
    this.props.navigation.navigate("SegmentScreen", {})
  }



  Share() {
    Share.open({
      title: "Share",
      subject: "Share",
      message: "Marilah download Aplikasi Pondok Pujian dan temukan Bahan ini : " + this.title
    })
      .then((res) => { console.log(res) })
      .catch((err) => { err && console.log(err); });
  }


}


export default AlbumScreen
