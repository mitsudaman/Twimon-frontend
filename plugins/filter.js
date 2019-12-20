
import Vue from 'vue'

Vue.filter('getTypeColor', function (value) {
  if (!value) return ''
      var color="#ccc"
      switch(value) {
        case 'でんき':
            color = "#fff100";
            break;
        case 'ほのお':
            color = "#FFA500";
            break;
        case 'みず':
            color = "#00bfff";
            break;
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