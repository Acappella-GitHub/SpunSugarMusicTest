import Music from '../../utils/Music.js'

const app = getApp()
const music_platf = [{ key: 'qq', value: 'QQ' }, { key: 'netease', value: '网易' }];
let status = [];

Page({
  data: {
    array: music_platf.map((val) => {return val.value}),
    picker_text: 'QQ',
    platform: 'qq',
    song_info_arr: []
  },

  platformSelection: function(data) {
    this.setData({
      picker_text: music_platf[data.detail.value].value,
      platform: music_platf[data.detail.value].key
    })
  },

  songSearch: function(data) {
    const that = this;

    Music.playList(this.data.platform, data.detail.value, (data) => {
      that.setData({song_info_arr: data})
      status = data;
      console.log(that.data.song_info_arr);
    });
  },

  addSong: function(data) {
    Music.addSong('collection', data.target.dataset.song_info);
    console.log(data);
  },

  tabSwitch: function(data) {
    switch (data.target.dataset.name) {
      case 'search_tab':
        this.setData({picker_text: 'QQ', platform: 'qq', song_info_arr: status});
        break;
      case 'history_tab':
        this.setData({picker_text: '历史', platform: 'history'});
        break;
      case 'collection_tab':
        this.setData({picker_text: '收藏', platform: 'collection', song_info_arr: wx.getStorageSync('collection')});
        break;
    }
  }
})
