
import Vue from 'vue'

Vue.filter('getTypeColor', function (value) {
  if (!value) return ''
      var color="#ccc"
      switch(value) {
        case 'ノーマル':
            color = "#b1b1b1";
            break;
        case 'ほのお':
            color = "#e4653f";
            break;
        case 'みず':
            color = "#50abda";
            break;
        case 'くさ':
            color = "#9ac30e";
            break;
        case 'でんき':
            color = "#e8c71a";
            break;
        case 'こおり':
            color = "#53c4e5";
            break;
        case 'かくとう':
            color = "#e99a3f";
            break;
        case 'どく':
            color = "#ba79c1";
            break;
        case 'じめん':
            color = "#c8a841";
            break;
        case 'ひこう':
            color = "#5e9fe2";
            break;
        case 'エスパー':
            color = "#e885b2";
            break;
        case 'むし':
            color = "#6cbe50";
            break;
        case 'いわ':
            color = "#b08754";
            break;
        case 'ゴースト':
            color = "#756eb4";
            break;
        case 'ドラゴン':
            color = "#6c81c8";
            break;
        case 'あく':
            color = "#5a3c1e";
            break;
        case 'はがね':
            color = "#919191";
            break;
        case 'フェアリー':
            color = "#e06cbb";
      } 
      return color
})

Vue.filter('serialNumFormatter', function (value) {
    var serialNum = ""
    if (String(value).length<4) {
        serialNum = "No." + ("000" + value ).substr(-3)
    }else{
        serialNum = "No." + value
    }
    return serialNum
})