import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
  Share,
  ScrollView, Linking
} from "react-native";
import * as eva from '@eva-design/eva';
import { MenuItem, Layout, TopNavigation, Divider, Text, Card, Button, Menu as UKMenu, TopNavigationAction, Icon, OverflowMenu, Avatar, } from '@ui-kitten/components';
import HTMLView from 'react-native-htmlview';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import {
  Capability, AppKilledPlaybackBehavior,
  RepeatMode,
} from 'react-native-track-player';
import YoutubePlayer from "react-native-youtube-iframe";
import Slider from '@react-native-community/slider';
import Pdf from 'react-native-pdf';
import { SafeAreaView } from 'react-native-safe-area-context';
const WindowWidth = Dimensions.get('window').width;
class AudioScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalvisible: false,
      modalvisible2: false,
      modalnext: false,
      paused: true,
      orientation: '',
      activeIndex: 0,
      activeSlide: 0,
      selectedIndex: 0,
      entries: [],
      myplaylist: '',
      descriptiontextshown: false,
      desctextshown: false,
      index: 0,
      isloading: false,
      resolution: 'auto',
      play: false,
      youtube: false,
      partitur: 100,
      audio_url: 1
    }
    this.currentTime = 0;
    this.playvideo = true
    this.VideoUrl = ""
    this.AudioUrl = ""
    this.LatestTime = 0;
    this.transitionvideo = false
    this.next = false
    this.htmlContent = "<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>"
    this.partitur = ""
    this.youtube = ""
    this.audio_url_2 = false
    this.source = "https://nepho.id/pondokpujian/pdf/sample.pdf"
  }


  async componentDidMount() {
    this.album_id = this.props.route.params.album_id
    this.lang = this.props.route.params.lang
    this.position = this.props.route.params.position
    this.data = []
    await fetch('https://nepho.id/pondokpujian/api/song.php?album_id=' + this.album_id,
      {
        method: 'POST',
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.data = responseJson
        if (this.data[0].audio_url_2 != "") {
          this.audio_url_2 = true
        }
      })
    await this.Play()
  };
  async Play() {

    this.episode = []
    await global.MyTrackPlayer.reset()
    await global.MyTrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
      ],
      progressUpdateEventInterval: 2,
    });


    for (let i = 0; i < this.data.length; i++) {

      this.episode.push({
        "id": i,
        "title": this.data[i].song_title,
        "url": "https://nepho.id/pondokpujian/mp3/" + this.data[i].audio_url,
        "artwork": 'https://nepho.id/pondokpujian/img/' + this.album_id + ".jpg"
      })


    }
    await global.MyTrackPlayer.add(this.episode)
    await global.MyTrackPlayer.skip(Number(this.position))
    await this.generateAll(this.position)
    let trackIndex = await global.MyTrackPlayer.getCurrentTrack()
    let trackObject = await global.MyTrackPlayer.getTrack(trackIndex)
    this.id = trackObject.id

    this.interval = setInterval(async () => {

      this.progress = await global.MyTrackPlayer.getProgress()
      let trackIndex = await global.MyTrackPlayer.getCurrentTrack()
      let trackObject = await global.MyTrackPlayer.getTrack(trackIndex)
      if (this.id != trackObject.id) {
        this.id = trackObject.id
        if (this.state.audio_url == 2)
          this.song_title = trackObject.title + " (Acc)"
        else
          this.song_title = trackObject.title
        await this.generateAll(this.id)
      }

      this.setState({ progress: this.progress.position, duration: this.progress.duration })

    }, 1000);

    this.setState({ playingTitle: "Run" })
  }
  async set_audio_url_1() {
    this.episode = []
    await global.MyTrackPlayer.reset()
    await global.MyTrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
      ],
      progressUpdateEventInterval: 2,
    });

    for (let i = 0; i < this.data.length; i++) {

      this.episode.push({
        "id": i,
        "title": this.data[i].song_title,
        "url": "https://nepho.id/pondokpujian/mp3/" + this.data[i].audio_url,
        "artwork": 'https://nepho.id/pondokpujian/' + this.album_id + ".jpg"
      })


    }

    await global.MyTrackPlayer.add(this.episode)
    await global.MyTrackPlayer.skip(Number(this.position))
    await global.MyTrackPlayer.seekTo(this.state.progress)
    await global.MyTrackPlayer.play()
    await this.generateAll(this.position)
    let trackIndex = await global.MyTrackPlayer.getCurrentTrack()
    let trackObject = await global.MyTrackPlayer.getTrack(trackIndex)
    this.id = trackObject.id

    this.interval = setInterval(async () => {

      this.progress = await global.MyTrackPlayer.getProgress()
      let trackIndex = await global.MyTrackPlayer.getCurrentTrack()
      let trackObject = await global.MyTrackPlayer.getTrack(trackIndex)
      if (this.id != trackObject.id) {
        this.id = trackObject.id
        if (this.state.audio_url == 2)
          this.song_title = trackObject.title + " (Acc)"
        else
          this.song_title = trackObject.title
        await this.generateAll(this.id)
      }

      this.setState({ progress: this.progress.position, duration: this.progress.duration })

    }, 1000);

    this.setState({ playingTitle: "Run", play: true })
  }
  async set_audio_url_2() {
    this.episode = []
    await global.MyTrackPlayer.reset()
    await global.MyTrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
      ],
      progressUpdateEventInterval: 2,
    });

    for (let i = 0; i < this.data.length; i++) {

      this.episode.push({
        "id": i,
        "title": this.data[i].song_title,
        "url": "https://nepho.id/pondokpujian/mp3/" + this.data[i].audio_url_2,
        "artwork": 'https://nepho.id/pondokpujian/' + this.album_id + ".jpg"
      })


    }
    await global.MyTrackPlayer.add(this.episode)
    await global.MyTrackPlayer.skip(Number(this.position))
    await global.MyTrackPlayer.seekTo(this.state.progress)
    await global.MyTrackPlayer.play()
    await this.generateAll(this.position)
    let trackIndex = await global.MyTrackPlayer.getCurrentTrack()
    let trackObject = await global.MyTrackPlayer.getTrack(trackIndex)
    this.id = trackObject.id

    this.interval = setInterval(async () => {

      this.progress = await global.MyTrackPlayer.getProgress()
      let trackIndex = await global.MyTrackPlayer.getCurrentTrack()
      let trackObject = await global.MyTrackPlayer.getTrack(trackIndex)
      if (this.id != trackObject.id) {
        this.id = trackObject.id
        if (this.state.audio_url == 2)
          this.song_title = trackObject.title + " (Acc)"
        else
          this.song_title = trackObject.title
        await this.generateAll(this.id)
      }

      this.setState({ progress: this.progress.position, duration: this.progress.duration })

    }, 1000);

    this.setState({ playingTitle: "Run", play: true })
  }

  async generateAll(id) {
    if (this.lang == "cn") {
      if (this.state.audio_url == 2)
        this.song_title = this.data[Number(id)].song_title + " (Acc)"
      else
        this.song_title = this.data[Number(id)].song_title

      this.song_seq = this.data[Number(id)].seq
      await fetch('https://nepho.id/pondokpujian/api/song.php?song_id=' + this.data[Number(id)].song_id,
        {
          method: 'POST',
        })
        .then((response) => response.json())
        .then((responseJson) => {
          this.data2 = responseJson
          this.htmlContent = this.data2[0].lyrics
          if (this.htmlContent == "") this.htmlContent = "<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>"

          if (this.data2.partitur != "")
            this.partitur = this.data2[0].partitur
          if (this.data2.youtube != "")
            this.youtube = this.data2[0].youtube
          else
            this.youtube == ""

          console.log(this.youtube)
        })

    }
    else {
      if (this.state.audio_url == 2)
        this.song_title = this.data[Number(id)].song_title_en + " (Acc)"
      else
        this.song_title = this.data[Number(id)].song_title_en


      this.song_seq = this.data[Number(id)].seq
      await fetch('https://nepho.id/pondokpujian/api/song.php?song_id=' + this.data[Number(id)].song_id,
        {
          method: 'POST',
        })
        .then((response) => response.json())
        .then((responseJson) => {
          this.data2 = responseJson
          this.htmlContent = this.data2[0].lyrics_en
          if (this.htmlContent == "") this.htmlContent = "<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>"

          if (this.data2.partitur != "")
            this.partitur = this.data2[0].partitur
          if (this.data2.youtube != "")
            this.youtube = this.data2[0].youtube
          else
            this.youtube == ""


        })

    }

  }

  async generateLyricChinese() {
    this.lang = "cn"
    this.generateLyrics()

  }
  async generateLyricEnglish() {
    this.lang = "en"
    this.generateLyrics()
  }
  async generateLyrics() {

    if (this.lang == "cn") {
      this.song_title = this.data[this.position].song_title
      this.song_seq = this.data[this.position].seq
      await fetch('https://nepho.id/pondokpujian/api/song.php?song_id=' + this.data[this.position].song_id,
        {
          method: 'POST',
        })
        .then((response) => response.json())
        .then((responseJson) => {
          this.data2 = responseJson
          this.htmlContent = this.data2[0].lyrics
          if (this.htmlContent == "") this.htmlContent = "<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>"

          if (this.data2.partitur != "")
            this.partitur = this.data2[0].partitur
          else
            this.partitur = ""
          if (this.data2.youtube != "")
            this.youtube = this.data2[0].youtube
          else
            this.youtube == ""

          console.log(this.youtube)
        })

    }
    else {
      this.song_title = this.data[this.position].song_title_en
      this.song_seq = this.data[this.position].seq
      await fetch('https://nepho.id/pondokpujian/api/song.php?song_id=' + this.data[this.position].song_id,
        {
          method: 'POST',
        })
        .then((response) => response.json())
        .then((responseJson) => {
          this.data2 = responseJson
          this.htmlContent = this.data2[0].lyrics_en
          if (this.htmlContent == "") this.htmlContent = "<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>"

          if (this.data2.partitur != "")
            this.partitur = this.data2[0].partitur
          else
            this.partitur = ""
          if (this.data2.youtube != "")
            this.youtube = this.data2[0].youtube
          else
            this.youtube == ""


        })
    }
  }
  TimeConvert(second) {
    second = Number(second)
    let h = Math.floor(second / 3600);
    let m = Math.floor(second % 3600 / 60);
    let s = Math.floor(second % 3600 % 60);
    if (m.toString().length == 1)
      m = "0" + m.toString()
    if (s.toString().length == 1)
      s = "0" + s.toString()

    if (h > 0) {

      return h.toString() + ":" + m.toString() + ":" + s.toString()
    }
    else {
      return m.toString() + ":" + s.toString()
    }
  }
  async Share() {

    this.message = ''

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
  render() {

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        <Layout style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'stretch' }} level='4'>
          <TopNavigation
            title={(props) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Avatar
                  style={{ marginLeft: 5, marginRight:15 }}
                  source={{ uri: 'https://nepho.id/pondokpujian/img/' + this.album_id + ".jpg" }}
                />
                <Text {...props}>
                  {this.song_title}
                </Text>
              </View>
            )}
            accessoryLeft={(props) => (
              <React.Fragment>
                <TouchableOpacity onPress={() => {
                  this.props.navigation.pop()
                }}>
                  <Icon
                    style={styles.icon}
                    fill='#8F9BB3'
                    name='arrow-back-outline'
                  />
                </TouchableOpacity>
              </React.Fragment>
            )}
            accessoryRight={(props) => (
              <React.Fragment>
                {this.audio_url_2 == true && (
                  <TouchableOpacity onPress={async () => {
                    this.source = "https://nepho.id/pondokpujian/pdf/" + this.partitur
                    if (this.state.audio_url == 1) {
                      clearInterval(this.interval)
                      this.setState({ audio_url: 2 }, async () => {
                        await this.set_audio_url_2();
                      })

                      console.log("audio url 2")

                    }
                    else {
                      clearInterval(this.interval)
                      this.setState({ audio_url: 1 }, async () => {
                        await this.set_audio_url_1();
                      })

                      console.log("audio url 1")

                    }


                  }}>
                    <Icon
                      style={styles.icon}
                      fill='#8F9BB3'
                      name='sync-outline'
                    />
                  </TouchableOpacity>)}
                {this.audio_url_2 == true && (<View style={{ width: 10 }}></View>)}
                {!(this.partitur == undefined || this.partitur == null || this.partitur == "" || this.partitur == 0) && (
                  <TouchableOpacity onPress={() => {
                    this.source = "https://nepho.id/pondokpujian/pdf/" + this.partitur
                    if(this.state.partitur == 100)
                      this.setState({ partitur: 0 })
                    else if(this.state.partitur == 0)
                      this.setState({partitur : 1})
                    else if(this.state.partitur == 1)
                      this.setState({partitur : 100})

                  }}>
                    <Icon
                      style={styles.icon}
                      fill='#8F9BB3'
                      name='file-text-outline'
                    />
                  </TouchableOpacity>)}
                {!(this.partitur == undefined || this.partitur == null || this.partitur == "" || this.partitur == 0) && (<View style={{ width: 10 }}></View>)}
                {this.state.partitur == true && (<TouchableOpacity onPress={() => {
                  this.source = "https://nepho.id/pondokpujian/pdf/" + this.partitur
                  Linking.openURL(this.source)

                }}>
                  <Icon
                    style={styles.icon}
                    fill='#8F9BB3'
                    name='download-outline'
                  />
                </TouchableOpacity>)}
                {this.state.partitur == true && (<View style={{ width: 10 }}></View>)}
                {!(this.youtube == undefined || this.youtube == null || this.youtube == "") && (
                  <TouchableOpacity onPress={async () => {
                    await global.MyTrackPlayer.stop()
                    console.log(this.state.youtube)
                    this.setState({ youtube: !this.state.youtube })
                  }}>
                    <Icon
                      style={styles.icon}
                      fill='#8F9BB3'
                      name='video-outline'
                    />
                  </TouchableOpacity>)}
                {!(this.youtube == undefined || this.youtube == null || this.youtube == "") && (<View style={{ width: 10 }}></View>)}
                <TouchableOpacity onPress={() => {
                  this.Share();
                }}>
                  <Icon
                    style={styles.icon}
                    fill='#8F9BB3'
                    name='share-outline'
                  />
                </TouchableOpacity>
              </React.Fragment>
            )}
          />
          <Divider />
          <View style={{ flex: 1 }}>
            {true && (
              <View style={{
                alignSelf: "stretch",
              }}>
                {this.state.partitur == 100 && (
                  <ScrollView style={{ height: 370, }}>
                    <Image style={{ width: WindowWidth, height: WindowWidth }}   source={{ uri: 'https://nepho.id/pondokpujian/img/' + this.album_id + ".jpg" }}/>
                  </ScrollView>)}
                {this.state.partitur == 0 && (
                  <ScrollView style={{ height: 370, }}>
                    <HTMLView
                      addLineBreaks={false}
                      style={{ backgroundColor: "#000", paddingTop: 20, paddingHorizontal: 15, paddingBottom: 50 }}
                      value={this.htmlContent.replace(/(\r\n|\n|\r)/gm, "")}
                      stylesheet={{
                        p: {
                          color: "white",
                          fontSize: 16
                        }, h2: {
                          fontSize: 20,
                          fontWeight: "bold",
                          color: "white",
                          linebreak: 2
                        }
                      }} />
                  </ScrollView>)}
                {this.state.partitur == 1 && (

                  <ScrollView style={{ height: 370, }}>
                    <Pdf
                      trustAllCerts={false}
                      source={{ uri: this.source }}
                      onLoadComplete={(numberOfPages, filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                      }}
                      onPageChanged={(page, numberOfPages) => {
                        console.log(`Current page: ${page}`);
                      }}
                      onError={(error) => {
                        console.log(error);
                      }}
                      onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                      }}
                      style={styles.pdf} />
                  </ScrollView>
                )}
                {(this.state.youtube == false) && (
                <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                  <Text>{this.song_seq}{". "}</Text>
                  <Text>{this.song_title}</Text>
                </View>
                )}
                {((this.youtube != null || this.youtube != undefined) && this.state.youtube == true) && (
                  <View style={{ paddingTop: 10 }}>
                    <YoutubePlayer
                      height={250}
                      play={true}
                      videoId={this.youtube}
                    />
                  </View>)}
                {(this.state.youtube == false) && (
                  <View>
                    <Slider
                      style={styles.progressBar}
                      value={this.state.progress}
                      minimumValue={0}
                      maximumValue={this.state.duration}
                      thumbTintColor="#FFFFFF"
                      minimumTrackTintColor="#E82627"
                      maximumTrackTintColor="#fff"
                      onSlidingComplete={async value => await global.MyTrackPlayer.seekTo(value)}
                    />
                    <View style={{ flexDirection: "row", marginLeft: 15, marginRight: 15 }}>
                      <View style={{ flex: 0.5, flexDirection: "row" }}>
                        <Text category={"c2"} style={{ color: "#BAC3CE" }}>{this.TimeConvert(this.state.progress)}</Text>
                      </View>
                      <View style={{ flex: 0.5, flexDirection: "row-reverse" }}>
                        <Text category={"c2"} style={{ color: "#BAC3CE" }}>{this.TimeConvert(this.state.duration)}</Text>
                      </View>
                    </View>
                    <View style={{ flex: 5, justifyContent: "center", alignItems: "center", flexDirection: "row", marginTop: 40 }}>
                      <TouchableOpacity style={{ flex: 1, alignItems: "center" }} onPress={async () => {
                        this.position--
                        if (this.position < 0) this.position++
                        if (this.lang == "cn") {
                          this.song_title = this.data[this.position].song_title

                          this.song_seq = this.data[this.position].seq
                          await fetch('https://nepho.id/pondokpujian/api/song.php?song_id=' + this.data[this.position].song_id,
                            {
                              method: 'POST',
                            })
                            .then((response) => response.json())
                            .then((responseJson) => {
                              this.data2 = responseJson
                              this.htmlContent = this.data2[0].lyrics
                              if (this.htmlContent == "") this.htmlContent = "<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>"

                              if (this.data2.partitur != "")
                                this.partitur = this.data2[0].partitur
                              else
                                this.partitur = ""
                              if (this.data2.youtube != "")
                                this.youtube = this.data2[0].youtube
                              else
                                this.youtube == ""
                            })

                        }
                        else {
                          this.song_title = this.data[this.position].song_title_en

                          this.song_seq = this.data[this.position].seq
                          await fetch('https://nepho.id/pondokpujian/api/song.php?song_id=' + this.data[this.position].song_id,
                            {
                              method: 'POST',
                            })
                            .then((response) => response.json())
                            .then((responseJson) => {
                              this.data2 = responseJson
                              this.htmlContent = this.data2[0].lyrics_en
                              if (this.htmlContent == "") this.htmlContent = "<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>"

                              if (this.data2.partitur != "")
                                this.partitur = this.data2[0].partitur
                              else
                                this.partitur = ""
                              if (this.data2.youtube != "")
                                this.youtube = this.data2[0].youtube
                              else
                                this.youtube == ""
                            })
                        }
                        await global.MyTrackPlayer.skip(Number(this.position))
                        await global.MyTrackPlayer.play()
                        this.setState({ play: true })

                      }}>
                        <Image style={{ width: 40, height: 40 }} source={require('../assets/images/previous.png')} />
                      </TouchableOpacity>
                      <TouchableOpacity style={{ flex: 1, alignItems: "center" }} onPress={async () => {
                        let position = this.state.progress - 10
                        if (position < 0)
                          position = 0
                        await global.MyTrackPlayer.seekTo(position)


                      }}>
                        <Image style={{ width: 40, height: 40, }} source={require('../assets/images/back10.png')} />
                      </TouchableOpacity>
                      {this.state.play == true && (
                        <TouchableOpacity style={{ flex: 1, alignItems: "center" }} onPress={async () => {
                          this.setState({ play: false })
                          await global.MyTrackPlayer.stop()
                        }}>
                          <Image style={{ width: 70, height: 70 }} source={require('../assets/images/stopplay.png')} />
                        </TouchableOpacity>
                      )}
                      {this.state.play == false && (
                        <TouchableOpacity style={{ flex: 1, alignItems: "center" }} onPress={async () => {
                          this.setState({ play: true })

                          await global.MyTrackPlayer.play()

                        }}>
                          <Image style={{ width: 70, height: 70 }} source={require('../assets/images/playcontinue.png')} />
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity style={{ flex: 1, alignItems: "center" }} onPress={async () => {
                        let position = this.state.progress + 10
                        if (position > this.state.duration)
                          position = 0
                        await global.MyTrackPlayer.seekTo(position)
                      }}>
                        <Image style={{ width: 40, height: 40, alignItems: "center" }} source={require('../assets/images/next10.png')} />
                      </TouchableOpacity>
                      <TouchableOpacity style={{ flex: 1, alignItems: "center" }} onPress={async () => {
                        this.position++
                        if (this.position >= this.data.length) this.position--
                        if (this.lang == "cn") {
                          this.song_title = this.data[this.position].song_title

                          this.song_seq = this.data[this.position].seq
                          await fetch('https://nepho.id/pondokpujian/api/song.php?song_id=' + this.data[this.position].song_id,
                            {
                              method: 'POST',
                            })
                            .then((response) => response.json())
                            .then((responseJson) => {
                              this.data2 = responseJson
                              this.htmlContent = this.data2[0].lyrics
                              if (this.htmlContent == "") this.htmlContent = "<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>"

                              if (this.data2.partitur != "")
                                this.partitur = this.data2[0].partitur
                              else
                                this.partitur = ""
                              if (this.data2.youtube != "")
                                this.youtube = this.data2[0].youtube
                              else
                                this.youtube == ""

                            })

                        }
                        else {
                          this.song_title = this.data[this.position].song_title_en

                          this.song_seq = this.data[this.position].seq
                          await fetch('https://nepho.id/pondokpujian/api/song.php?song_id=' + this.data[this.position].song_id,
                            {
                              method: 'POST',
                            })
                            .then((response) => response.json())
                            .then((responseJson) => {
                              this.data2 = responseJson
                              this.htmlContent = this.data2[0].lyrics_en
                              if (this.htmlContent == "") this.htmlContent = "<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>"

                              if (this.data2.partitur != "")
                                this.partitur = this.data2[0].partitur
                              else
                                this.partitur = ""
                              if (this.data2.youtube != "")
                                this.youtube = this.data2[0].youtube
                              else
                                this.youtube == ""

                            })
                        }
                        await global.MyTrackPlayer.skip(Number(this.position))
                        await global.MyTrackPlayer.play()
                        this.setState({ play: true })

                      }}>
                        <Image style={{ width: 40, height: 40 }} source={require('../assets/images/next.png')} />
                      </TouchableOpacity>
                    </View>
                  </View>)}


              </View>
            )}
            <View style={{ height: 20 }}></View>
          </View>
        </Layout>
      </SafeAreaView>

    );
  }

}
const styles = StyleSheet.create({
  header: {

  },
  container: {
    flex: 1,
    backgroundColor: "#3B64DB",
    flexDirection: "column",
  },
  container2: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  containertopRow: {
    marginTop: 20,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30,
  },
  txtBottom: {
    fontSize: 15,
    fontWeight: "100",
  },
  imageTopRow: {
    height: 80,
    width: 80,
    ...Platform.select({
      ios: {
        borderRadius: 80 / 2,
      },
      android: {
        borderRadius: 80,
      },
    }),
  },
  icon: {
    height: 25,
    width: 25,
    marginRight: 10,
  },
  button: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  containertopRowText: {
    flexDirection: "column",
    marginLeft: 5,
  },

  containerBottom: {
    flex: 8,
    paddingRight: 20,
  },
  containerBottomItem: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-start",

  }, icon: {
    width: 24,
    height: 24,
  }, pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }

});
export default AudioScreen;
