let platf = '';
const innerAudioContext = wx.createInnerAudioContext();

export default class Music {
  static playList(platform, song_name, callback) {
    let url = '';
    let data = null;
    switch (platform) {
      case 'qq':
        platf = 'qq';
        url = 'https://api.bzqll.com/music/tencent/search';
        data = {key: '579621905', s: song_name};
        break;

      case 'histories':
        callback(wx.getStorageSync('histories'));
        return;
        break;

      case 'collection':
        callback(wx.getStorageSync('collection'));
        return;
        break;

      default:
        return;
    }

    wx.request({
      url,
      data,
      success: (result) => {
        console.log(result);
        result.data.data.map((val) => {val.platf = platf;});
        callback(result.data.data);
      }
    })
  }

  static addSong(list_name, song_info) {
    let key = '';
    switch (list_name.toLocaleLowerCase()) {
      case 'histories':
        key = 'histories';
        break;

      case 'collection':
        key = 'collection';
        break;

      default:
        return;
    }

    let list = wx.getStorageSync(key);
    if (!list) {
      wx.setStorageSync(key, []);
      list = wx.getStorageSync(key);
    }

    for (const i of list) {
      if (song_info.id === i.id) {
        return;
      }
    }

    list.unshift(song_info);
    wx.setStorageSync(key, list);
  }

  static removeSong(list_name, song_info) {
    let key = '';
    switch (list_name.toLocaleLowerCase()) {
      case 'histories':
        key = 'histories';
        break;

      case 'collection':
        key = 'collection';
        break;

      default:
        return;
    }

    let list = wx.getStorageSync(key);
    if (!list) {
      return;
    }

    if (song_info === 'all') {
      wx.setStorageSync(key, []);
      return;
    }

    list.map((val, i) => {
      if (song_info.id === val.id) {
        list.splice(i, 1);
        wx.setStorageSync(key, list);
        return;
      }
    })
  }

  static play(song_info, callback) {

  }

  static pause() {}

  static seek() {}
}